// Build-time cache of link previews (the hover cards on external links).
//
// Finds every external link in the site's source, fetches each page once,
// keeps its Open Graph title/description/site name and a small local WebP of
// its og:image, and writes static/og-cache/manifest.json. The browser only
// ever reads that same-origin JSON and those same-origin images: no runtime
// proxy, nothing third-party loaded on hover, no hotlinked images that rot.
//
//   node scripts/cache-og.mjs                  fetch links not cached yet
//   node scripts/cache-og.mjs --retry-failed   ...and retry ones that failed
//   node scripts/cache-og.mjs --refresh        re-fetch everything
//   node scripts/cache-og.mjs <url> [<url>…]   (re-)fetch just these links
//
// Network trouble never fails the build: a link that can't be fetched keeps
// its previous entry (or simply gets no card) and is noted in failed.json.
// Site builds skip those; CI passes --retry-failed so dead links get another
// chance on every PR that touches links. Pages on this site are not fetched
// here; gatsby-node.ts writes their cards from the build itself.

import crypto from "crypto"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

import { previewKey } from "../src/utils/preview-key.mjs"
import { detectCharset, extractLinks, parseOg, sniffImage } from "./lib/og.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const outDir = process.env.OG_CACHE_DIR
  ? path.resolve(process.env.OG_CACHE_DIR)
  : path.join(root, "static", "og-cache")
const manifestPath = path.join(outDir, "manifest.json")
const failedPath = path.join(outDir, "failed.json")
const PUBLIC_PATH = "/og-cache/"

// Where links live: pages, components and templates, plus the blog posts.
const SOURCES = [
  { dir: "src", match: /\.tsx?$/, skip: /\.test\.tsx?$/, kind: "tsx" },
  { dir: "content/blog", match: /\.mdx?$/, kind: "mdx" },
]

const UA_BROWSER =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
const UA_BOT =
  "Mozilla/5.0 (compatible; aashutosh.dev-link-preview/1.0; +https://aashutosh.dev)"

const TIMEOUT_MS = 12_000
const HTML_LIMIT = 1_500_000
const IMAGE_LIMIT = 12_000_000
const CONCURRENCY = 6
// Netlify runs this before every build, so cap how long it may hold one up.
// CI sets a longer budget; whatever is left over is fetched on the next run.
const BUDGET_MS = Number(process.env.OG_CACHE_BUDGET_MS) || 120_000

// Cards are 21rem wide, so 600px covers 2x screens. Art that is not clearly
// landscape (logos, avatars) is shown as a small square thumbnail instead.
const BANNER_WIDTH = 600
const BANNER_MIN_RATIO = 1.3
const THUMB_SIZE = 160

const args = process.argv.slice(2)
const flags = new Set(args.filter((a) => a.startsWith("--")))
const onlyUrls = args.filter((a) => !a.startsWith("--"))
const REFRESH = flags.has("--refresh")
const RETRY_FAILED = flags.has("--retry-failed")

let sharp

const walk = (dir) => {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name)
    return d.isDirectory() ? walk(p) : [p]
  })
}

/** key -> URL to fetch, for every external link in the source. */
const discoverLinks = () => {
  const links = new Map()
  for (const source of SOURCES) {
    for (const file of walk(path.join(root, source.dir)).sort()) {
      if (!source.match.test(file) || source.skip?.test(file)) continue
      const text = fs.readFileSync(file, "utf8")
      for (const url of extractLinks(text, source.kind)) {
        const key = previewKey(url)
        // Own pages come from gatsby-node.ts, not from fetching the live site.
        if (key && !key.startsWith("/") && !links.has(key)) links.set(key, url)
      }
    }
  }
  return links
}

const readJson = (file, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"))
  } catch {
    return fallback
  }
}

const writeJson = (file, data) =>
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)

const sortKeys = (obj) =>
  Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)))

const describeError = (e) =>
  String(e?.cause?.code || e?.cause?.message || e?.message || e).slice(0, 120)

// Retrying won't help (not a page, image 404s or is unusable), as opposed to
// timeouts, resets and 5xx, which might be gone on the next run.
class PermanentError extends Error {}

const httpError = (status) =>
  status >= 400 && status < 500 && status !== 408 && status !== 429
    ? new PermanentError(`HTTP ${status}`)
    : new Error(`HTTP ${status}`)

/** Read at most `limit` bytes, optionally stopping early once `done(chunk)`. */
const readBody = async (res, limit, done) => {
  const reader = res.body.getReader()
  const chunks = []
  let size = 0
  try {
    for (;;) {
      const { done: end, value } = await reader.read()
      if (end) break
      const chunk = Buffer.from(value.buffer, value.byteOffset, value.length)
      chunks.push(chunk)
      size += chunk.length
      if (size > limit || done?.(chunk)) break
    }
  } finally {
    reader.cancel().catch(() => {})
  }
  return Buffer.concat(chunks)
}

const fetchPage = async (url, ua) => {
  const res = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      "user-agent": ua,
      accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5",
      "accept-language": "en-US,en;q=0.9",
    },
  })
  if (!res.ok) {
    res.body?.cancel().catch(() => {})
    throw httpError(res.status)
  }
  const type = res.headers.get("content-type") || ""
  if (!/html/i.test(type)) {
    res.body?.cancel().catch(() => {})
    throw new PermanentError(`not a page (${type.split(";")[0] || "no type"})`)
  }
  const buf = await readBody(
    res,
    HTML_LIMIT,
    (chunk) => chunk.includes("</head") || chunk.includes("</HEAD")
  )
  let html
  try {
    html = new TextDecoder(detectCharset(type, buf)).decode(buf)
  } catch {
    html = new TextDecoder().decode(buf)
  }
  return { html, finalUrl: res.url || url }
}

/** Try as a browser first; some sites only render their tags for bots. */
const fetchOg = async (url) => {
  let lastError
  for (const ua of [UA_BROWSER, UA_BOT]) {
    try {
      const { html, finalUrl } = await fetchPage(url, ua)
      const og = parseOg(html, finalUrl)
      if (og) return { og, finalUrl, ua }
      lastError = new Error("no usable title")
    } catch (e) {
      lastError = e
      // A 403 may be about the user agent, so only skip the retry for these
      if (e instanceof PermanentError && !/^HTTP/.test(e.message)) break
    }
  }
  throw lastError
}

const toHex = ({ r, g, b }) =>
  `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`

const cacheImage = async (imageUrl, referer, ua) => {
  const res = await fetch(imageUrl, {
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      "user-agent": ua,
      accept: "image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8",
      referer,
    },
  })
  if (!res.ok) {
    res.body?.cancel().catch(() => {})
    throw httpError(res.status)
  }
  const buf = await readBody(res, IMAGE_LIMIT)
  if (buf.length > IMAGE_LIMIT) throw new PermanentError("too large")
  // Raster formats only: no SVG (scriptable) and no ICO.
  if (!sniffImage(buf)) throw new PermanentError("unsupported format")

  const input = { limitInputPixels: 50_000_000, failOn: "error" }
  let resized
  let dominant
  try {
    const meta = await sharp(buf, input).metadata()
    const rotated = (meta.orientation ?? 1) >= 5
    const width = rotated ? meta.height : meta.width
    const height = rotated ? meta.width : meta.height
    if (!width || !height) throw new Error("no dimensions")
    const banner = width / height >= BANNER_MIN_RATIO
    if (banner ? width < 200 : width < 48) throw new Error("too small")

    resized = await sharp(buf, input)
      .rotate()
      .resize(
        banner
          ? { width: BANNER_WIDTH, withoutEnlargement: true }
          : {
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              fit: "cover",
              withoutEnlargement: true,
            }
      )
      .webp({ quality: 72, effort: 6, smartSubsample: true })
      .toBuffer({ resolveWithObject: true })
    // The card paints this colour while the image decodes, so it never flashes.
    dominant = (await sharp(resized.data).stats()).dominant
  } catch (e) {
    throw new PermanentError(e.message)
  }
  const { data, info } = resized
  const name = `${crypto.createHash("sha1").update(data).digest("hex").slice(0, 12)}.webp`
  fs.writeFileSync(path.join(outDir, name), data)
  return {
    image: `${PUBLIC_PATH}${name}`,
    width: info.width,
    height: info.height,
    color: toHex(dominant),
  }
}

const buildEntry = async (url) => {
  const { og, finalUrl, ua } = await fetchOg(url)
  const entry = { title: og.title }
  if (og.description) entry.description = og.description
  if (og.site) entry.site = og.site
  if (og.image) {
    try {
      Object.assign(entry, await cacheImage(og.image, finalUrl, ua))
    } catch (e) {
      // An unusable image still leaves a good text card; a flaky one is worth
      // another try rather than caching the link without it for good.
      if (!(e instanceof PermanentError)) {
        throw new Error(`image: ${describeError(e)}`)
      }
      entry.note = `image skipped: ${describeError(e)}`
    }
  }
  return entry
}

const runPool = async (items, size, worker) => {
  let next = 0
  const lanes = Array.from(
    { length: Math.min(size, items.length) },
    async () => {
      while (next < items.length) await worker(items[next++])
    }
  )
  await Promise.all(lanes)
}

async function main() {
  try {
    sharp = (await import("sharp")).default
  } catch {
    console.warn(
      "Link previews: sharp is not installed (pnpm install); skipping"
    )
    return
  }

  const started = Date.now()
  fs.mkdirSync(outDir, { recursive: true })
  const links = discoverLinks()
  const entries = readJson(manifestPath, {}).links || {}
  const failed = readJson(failedPath, {})
  const today = new Date().toISOString().slice(0, 10)

  const targets = onlyUrls.length
    ? onlyUrls
        .map((url) => [previewKey(url), url])
        .filter(([key]) => key && !key.startsWith("/"))
    : [...links].filter(
        ([key]) => REFRESH || (!entries[key] && (RETRY_FAILED || !failed[key]))
      )

  console.log(
    `Link previews: ${links.size} external links, ${targets.length} to fetch -> ${outDir}`
  )

  let fetched = 0
  let deferred = 0
  await runPool(targets, CONCURRENCY, async ([key, url]) => {
    if (Date.now() - started > BUDGET_MS) {
      deferred++
      return
    }
    try {
      const { note, ...entry } = await buildEntry(url)
      entries[key] = entry
      delete failed[key]
      fetched++
      console.log(`- cached ${key}${note ? ` (${note})` : ""}`)
    } catch (e) {
      const reason = describeError(e)
      // First failure only, so a link that keeps failing (for whatever reason
      // this time) doesn't rewrite the file and trigger a commit on every run
      failed[key] ??= { reason, since: today }
      const stale = entries[key] ? ", keeping previous entry" : ""
      console.log(`- failed ${key}: ${reason}${stale}`)
    }
  })

  // Only a full run knows which links are gone, so only it prunes.
  if (!onlyUrls.length) {
    for (const key of Object.keys(entries)) {
      if (links.has(key)) continue
      delete entries[key]
      console.log(`- prune ${key} (no longer linked)`)
    }
    for (const key of Object.keys(failed)) {
      if (!links.has(key)) delete failed[key]
    }
    const used = new Set(
      Object.values(entries)
        .map((e) => e.image && path.basename(e.image))
        .filter(Boolean)
    )
    for (const file of fs.readdirSync(outDir)) {
      if (!file.endsWith(".webp") || used.has(file)) continue
      fs.unlinkSync(path.join(outDir, file))
      console.log(`- purge ${file}`)
    }
  }

  writeJson(manifestPath, { links: sortKeys(entries) })
  writeJson(failedPath, sortKeys(failed))
  const cached = Object.keys(entries).length
  console.log(
    `Link previews: fetched ${fetched}, ${cached}/${links.size} cached, ` +
      `${Object.keys(failed).length} failed` +
      (deferred ? `, ${deferred} deferred (time budget)` : "")
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
