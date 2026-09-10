import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const outDir = path.join(root, "static", "favicons")
const manifestPath = path.join(outDir, "manifest.json")

const HOSTS = [
  "mnm.aashutosh.dev",
  "cr.aashutosh.dev",
  "toki.aashutosh.dev",
  "rc.toki.aashutosh.dev",
  "nibbles.dev",
  "dig.nibbles.dev",
  "regie.ai",
  "go.regie.ai",
  "x.com",
  "github.com",
  "code.visualstudio.com",
  "zed.dev",
  "iterm2.com",
  "warp.dev",
  "claude.com",
  "statusline.aashutosh.dev",
  "iterm.aashutosh.dev",
  "isl.aashutosh.dev",
  "store.google.com",
  "raycast.com",
  "obsidian.md",
  "granola.so",
  "docker.com",
  "postman.com",
  "developer.chrome.com",
  "amzn.in",
  "amazon.in",
  "greensoul.online",
  "sony.co.in",
  "apple.com",
  "open.spotify.com",
  "api.chess.com",
  "files.aashutosh.dev",
  "img.shields.io",
  "nownownow.com",
  "twoam.dev",
  "www.amazon.in",
  "www.apple.com",
  "www.docker.com",
  "www.fitbit.com",
  "www.granola.so",
  "www.greensoul.online",
  "www.postman.com",
  "www.raycast.com",
  "www.sony.co.in",
  "www.warp.dev",
]

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

// Sniff the real format from the bytes. The server's content-type lies often
// enough (SPA fallbacks return text/html for /favicon.ico) that the header
// alone is not safe to trust.
const sniff = (buf) => {
  if (buf.length < 8) return null
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47)
    return "png"
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg"
  if (buf.subarray(0, 3).toString("latin1") === "GIF") return "gif"
  if (
    buf.subarray(0, 4).toString("latin1") === "RIFF" &&
    buf.subarray(8, 12).toString("latin1") === "WEBP"
  )
    return "webp"
  // ICO/CUR: reserved(0) + type(1|2) + count
  if (
    buf[0] === 0x00 &&
    buf[1] === 0x00 &&
    (buf[2] === 0x01 || buf[2] === 0x02) &&
    buf[3] === 0x00 &&
    buf.readUInt16LE(4) > 0
  )
    return "ico"
  const head = buf.subarray(0, 1024).toString("utf8").trim()
  if (/^(<\?xml|<!--|<svg)/i.test(head) && /<svg[\s>]/i.test(head)) return "svg"
  return null
}

const absolute = (href, base) => {
  try {
    return new URL(href, base).href
  } catch {
    return null
  }
}

// The <link rel="icon"> tags in the page head are the authoritative answer.
// Guessing /favicon.ico only works for sites that happen to follow convention.
const declaredIcons = async (host) => {
  const base = `https://${host}/`
  try {
    const res = await fetch(base, {
      redirect: "follow",
      headers: { "user-agent": UA },
    })
    if (!res.ok) return []
    const ct = res.headers.get("content-type") || ""
    if (!ct.includes("html")) return []
    const html = (await res.text()).slice(0, 200_000)
    const head = html.split(/<\/head>/i)[0] || html
    const found = []
    for (const tag of head.match(/<link\b[^>]*>/gi) || []) {
      const rel = tag.match(/\brel\s*=\s*["']?([^"'>]+)/i)?.[1] || ""
      if (!/\b(icon|shortcut icon|apple-touch-icon)\b/i.test(rel)) continue
      const href = tag.match(/\bhref\s*=\s*["']([^"']+)/i)?.[1]
      if (!href) continue
      const size =
        parseInt(tag.match(/\bsizes\s*=\s*["']?(\d+)/i)?.[1] || "0", 10) || 0
      const isSvg = /image\/svg/i.test(tag) || /\.svg(\?|$)/i.test(href)
      const url = absolute(href, res.url || base)
      if (url) found.push({ url, size, isSvg })
    }
    // Prefer SVG (scales cleanly), then the largest declared raster.
    found.sort((a, b) => Number(b.isSvg) - Number(a.isSvg) || b.size - a.size)
    return found.map((f) => f.url)
  } catch {
    return []
  }
}

const WELL_KNOWN = (host) => [
  `https://${host}/favicon.svg`,
  `https://${host}/icon.svg`,
  `https://${host}/icons/icon.svg`,
  `https://${host}/favicon.ico`,
  `https://${host}/favicon.png`,
  `https://${host}/apple-touch-icon.png`,
]

const tryFetch = async (url) => {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": UA },
    })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 100) return null
    const ext = sniff(buf)
    if (!ext) return null
    return { buf, ext, url }
  } catch {
    return null
  }
}

const fetchFavicon = async (host) => {
  for (const url of [...(await declaredIcons(host)), ...WELL_KNOWN(host)]) {
    const hit = await tryFetch(url)
    if (hit) return hit
  }
  // Last resort: Google's favicon service always returns a real PNG.
  return tryFetch(`https://www.google.com/s2/favicons?domain=${host}&sz=64`)
}

const cachedFile = (host) => {
  for (const ext of ["svg", "png", "ico", "jpg", "gif", "webp"]) {
    const p = path.join(outDir, `${host}.${ext}`)
    if (!fs.existsSync(p)) continue
    // A file already on disk may be a corrupt HTML/JSON body from an older
    // run, so re-validate the bytes instead of trusting the extension.
    const buf = fs.readFileSync(p)
    if (sniff(buf) === ext) return `${host}.${ext}`
    fs.unlinkSync(p)
    console.log(`- purge ${path.basename(p)} (not a valid ${ext})`)
  }
  return null
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  console.log(`Caching favicons for ${HOSTS.length} hosts to ${outDir}`)
  const manifest = {}
  for (const host of HOSTS) {
    const existing = cachedFile(host)
    if (existing) {
      manifest[host] = existing
      console.log(`- skip ${host} (cached as ${existing})`)
      continue
    }
    const result = await fetchFavicon(host)
    if (!result) {
      console.log(`- failed ${host}`)
      continue
    }
    const name = `${host}.${result.ext}`
    fs.writeFileSync(path.join(outDir, name), result.buf)
    manifest[host] = name
    console.log(`- fetched ${host} from ${result.url} -> ${name}`)
  }
  const sorted = Object.fromEntries(Object.entries(manifest).sort())
  fs.writeFileSync(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`)
  console.log(
    `Wrote manifest with ${Object.keys(sorted).length}/${HOSTS.length} hosts`
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
