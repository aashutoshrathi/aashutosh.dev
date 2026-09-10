import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const outDir = path.join(root, "static", "favicons")

const STATIC_HOSTS = [
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
]

const scanHosts = () => {
  const hosts = new Set(STATIC_HOSTS)
  const srcDir = path.join(root, "src")
  const scanFile = (file) => {
    try {
      const content = fs.readFileSync(file, "utf8")
      const regex = /https?:\/\/([a-zA-Z0-9.-]+\.[a-z]{2,})/g
      let m
      while ((m = regex.exec(content)) !== null) {
        try {
          const url = new URL(m[0])
          const host = url.hostname
          if (host && !host.includes("localhost") && !host.includes("aashutosh.dev") && host !== "aashutosh.dev") {
            // keep all external hosts, including subdomains of aashutosh.dev except root
            // we already handle aashutosh.dev subdomains via explicit list, but allow any
          }
          if (host) hosts.add(host)
        } catch {}
      }
    } catch {}
  }
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (["node_modules", ".cache", "public", ".git"].includes(entry.name)) continue
        walk(full)
      } else if (/\.(ts|tsx|js|jsx|mdx|md|json)$/.test(entry.name)) {
        scanFile(full)
      }
    }
  }
  if (fs.existsSync(srcDir)) walk(srcDir)
  // also scan content/blog
  const contentDir = path.join(root, "content")
  if (fs.existsSync(contentDir)) walk(contentDir)
  return Array.from(hosts)
}

const HOSTS = scanHosts()

const CANDIDATES = (host) => [
  `https://${host}/favicon.ico`,
  `https://${host}/favicon.svg`,
  `https://${host}/icon.svg`,
  `https://${host}/favicon.png`,
  `https://${host}/apple-touch-icon.png`,
]

async function fetchFavicon(host) {
  for (const url of CANDIDATES(host)) {
    try {
      const res = await fetch(url, { redirect: "follow" })
      if (res.ok) {
        const ct = res.headers.get("content-type") || ""
        if (ct.includes("image") || ct.includes("octet-stream") || url.endsWith(".ico") || url.endsWith(".svg") || url.endsWith(".png")) {
          const buf = Buffer.from(await res.arrayBuffer())
          if (buf.length > 200) {
            const ext = url.endsWith(".svg") ? "svg" : url.endsWith(".png") || ct.includes("png") ? "png" : "ico"
            return { buf, ext, url }
          }
        }
      }
    } catch {}
  }
  // fallback to google
  try {
    const url = `https://www.google.com/s2/favicons?domain=${host}&sz=64`
    const res = await fetch(url)
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length > 200) return { buf, ext: "png", url }
    }
  } catch {}
  return null
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  console.log(`Caching favicons for ${HOSTS.length} hosts to ${outDir}`)
  for (const host of HOSTS) {
    const outPath = path.join(outDir, `${host}.png`)
    if (fs.existsSync(outPath)) {
      console.log(`- skip ${host} (cached)`)
      continue
    }
    const result = await fetchFavicon(host)
    if (result) {
      const out = path.join(outDir, `${host}.png`)
      // if svg, save as svg, but we save as png name for simplicity - keep ext
      const finalPath = result.ext === "svg" ? path.join(outDir, `${host}.svg`) : out
      fs.writeFileSync(finalPath, result.buf)
      console.log(`- fetched ${host} from ${result.url} -> ${path.basename(finalPath)}`)
    } else {
      console.log(`- failed ${host}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
