// Pure helpers for scripts/cache-og.mjs: pulling link targets out of the
// site's source and Open Graph data out of a fetched page. No I/O here, so
// all of it is covered by scripts/lib/og.test.ts.

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  middot: "·",
  bull: "•",
  copy: "©",
  reg: "®",
  trade: "™",
}

/** Decode the HTML entities that realistically show up in meta content. */
export const decodeEntities = (text) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (match, body) => {
    if (body[0] === "#") {
      const hex = body[1] === "x" || body[1] === "X"
      const code = parseInt(body.slice(hex ? 2 : 1), hex ? 16 : 10)
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? match
  })

/** Decode, collapse whitespace and cut at a word boundary with an ellipsis. */
export const cleanText = (text, max) => {
  if (!text) return ""
  const flat = decodeEntities(text).replace(/\s+/g, " ").trim()
  if (!max || flat.length <= max) return flat
  const cut = flat.slice(0, max - 1)
  const space = cut.lastIndexOf(" ")
  const head = space > max * 0.6 ? cut.slice(0, space) : cut
  return `${head.replace(/[\s,.;:!?–—-]+$/, "")}…`
}

const ATTR = /([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g

/** Attributes of a single start tag, lower-cased names, first one wins. */
export const parseAttrs = (tag) => {
  const inner = tag.replace(/^<\s*[a-z0-9-]+/i, "").replace(/\/?\s*>$/, "")
  const attrs = {}
  for (const m of inner.matchAll(ATTR)) {
    const name = m[1].toLowerCase()
    if (!(name in attrs)) attrs[name] = m[2] ?? m[3] ?? m[4] ?? ""
  }
  return attrs
}

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/**
 * "GitHub - owner/repo: blurb" -> "owner/repo: blurb", "Post | Site" -> "Post".
 * The site name is already on the card, so repeating it in the title is noise.
 */
export const stripSiteName = (title, site) => {
  if (!title || !site) return title
  const name = escapeRegExp(site.trim())
  const sep = "\\s+[-–—|·•:]\\s+"
  for (const re of [
    new RegExp(`^${name}${sep}(.+)$`, "i"),
    new RegExp(`^(.+?)${sep}${name}$`, "i"),
  ]) {
    const rest = title.match(re)?.[1]?.trim()
    if (rest && rest.length >= 3) return rest
  }
  return title
}

/**
 * "owner/repo: blurb" -> "owner/repo" when the description is that blurb, as
 * on every GitHub repo, so the card doesn't say the same thing twice.
 */
export const dropRepeatedTagline = (title, description) => {
  const at = title.indexOf(": ")
  if (at < 3 || !description) return title
  const tagline = title
    .slice(at + 2)
    .replace(/…$/, "")
    .trim()
  return tagline.length >= 12 && description.startsWith(tagline)
    ? title.slice(0, at)
    : title
}

/** GitHub appends this sign-up line to every repo's description. */
export const stripGithubBoilerplate = (description) =>
  description
    .replace(
      /\s*Contribute to \S+ development by creating an account on GitHub\.?$/,
      ""
    )
    .trim()

// Interstitials and login walls that answer 200 with a real <title> but are
// not the page the link points at.
const BLOCKED_TITLE =
  /^(just a moment|attention required|access denied|403 forbidden|404 not found|page not found|robot check|are you a robot|security check|verify you are human)\b|^(log ?in|sign ?in)(\s+to\b.*)?$/i

export const TITLE_MAX = 120
export const DESCRIPTION_MAX = 220

/**
 * Open Graph (falling back to Twitter cards, then plain <title>/description)
 * from a page's HTML. Only the <head> is read; scripts and comments are
 * dropped first so their contents can't masquerade as tags.
 *
 * @returns {{ title: string, description: string, site: string, image: string | null } | null}
 */
export const parseOg = (html, pageUrl) => {
  const head = (html.split(/<\/head\s*>/i)[0] || html)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1\s*>/gi, "")

  const meta = {}
  for (const tag of head.match(/<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi) || []) {
    const a = parseAttrs(tag)
    const key = (a.property || a.name || a.itemprop || "").trim().toLowerCase()
    if (key && a.content != null && !(key in meta)) meta[key] = a.content
  }
  const pick = (...keys) => {
    for (const k of keys) {
      const v = meta[k] && cleanText(meta[k])
      if (v) return v
    }
    return ""
  }

  let imageLink = ""
  for (const tag of head.match(/<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi) || []) {
    const a = parseAttrs(tag)
    if (/(^|\s)image_src(\s|$)/i.test(a.rel || "") && a.href) {
      imageLink = a.href
      break
    }
  }

  const site = pick("og:site_name", "application-name")
  const rawTitle =
    pick("og:title", "twitter:title") ||
    cleanText(head.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1] || "")
  const title = cleanText(stripSiteName(rawTitle, site), TITLE_MAX)
  if (!title || BLOCKED_TITLE.test(title)) return null

  const description = cleanText(
    stripGithubBoilerplate(
      pick("og:description", "twitter:description", "description")
    ),
    DESCRIPTION_MAX
  )

  let image = null
  const rawImage =
    pick(
      "og:image:secure_url",
      "og:image:url",
      "og:image",
      "twitter:image",
      "twitter:image:src"
    ) || cleanText(imageLink)
  if (rawImage) {
    try {
      const url = new URL(rawImage, pageUrl)
      if (url.protocol === "https:" || url.protocol === "http:")
        image = url.href
    } catch {}
  }

  return {
    title: dropRepeatedTagline(title, description),
    description,
    site,
    image,
  }
}

// URL characters, minus template-literal interpolation: links built from
// `${...}` at runtime can't be resolved here, so they are skipped.
const URL_CHARS = "[^\"'`\\s${}<>]+"

const TSX_PATTERNS = [
  // <a href="…"> / <AnimatedLink href={"…"}>
  new RegExp(`\\bhref\\s*=\\s*\\{?\\s*(["'\`])(https?://${URL_CHARS})\\1`, "g"),
  // { href: "…" }, { link: "…" }, { homepage: "…" }, { github: "…" }, …
  new RegExp(
    `\\b(?:href|link|homepage|html_url|github)\\s*:\\s*(["'\`])(https?://${URL_CHARS})\\1`,
    "g"
  ),
]

/** Read a markdown link destination, balancing parentheses like CommonMark. */
const readDestination = (text, start) => {
  let depth = 0
  let i = start
  for (; i < text.length; i++) {
    const ch = text[i]
    if (/\s/.test(ch) || ch === ">") break
    if (ch === "\\") {
      i++
      continue
    }
    if (ch === "(") depth++
    else if (ch === ")") {
      if (depth === 0) break
      depth--
    }
  }
  return text.slice(start, i)
}

/** Whether the `](` at `close` belongs to an image (`![alt](src)`). */
const isImageLink = (text, close) => {
  let depth = 0
  for (let i = close - 1; i >= 0; i--) {
    const ch = text[i]
    if (ch === "]" && text[i - 1] !== "\\") depth++
    else if (ch === "[" && text[i - 1] !== "\\") {
      if (depth === 0) return text[i - 1] === "!"
      depth--
    }
  }
  return false
}

// Files rather than pages: nothing to preview, so don't try.
const NOT_A_PAGE = /\.(pdf|png|jpe?g|gif|webp|avif|svg|ico|zip|dmg|mp4|mov)$/i

/**
 * External link targets in a source file. `kind` is "tsx" for components and
 * pages (JSX attributes and link-ish object fields) or "mdx" for posts
 * (markdown links, autolinks, reference definitions and inline JSX hrefs).
 *
 * @param {string} text
 * @param {"tsx" | "mdx"} kind
 * @returns {string[]}
 */
export const extractLinks = (text, kind) => {
  const found = new Set()
  if (kind === "tsx") {
    for (const re of TSX_PATTERNS) {
      for (const m of text.matchAll(re)) found.add(m[2])
    }
  } else {
    // Code is not prose: URLs inside fences or backticks are not links.
    const prose = text
      .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, "")
      .replace(/`[^`\n]*`/g, "")

    for (const m of prose.matchAll(/\]\(\s*<?(?=https?:\/\/)/g)) {
      if (isImageLink(prose, m.index)) continue
      found.add(readDestination(prose, m.index + m[0].length))
    }
    for (const m of prose.matchAll(/<(https?:\/\/[^\s<>]+)>/g)) found.add(m[1])
    for (const m of prose.matchAll(
      /^\s{0,3}\[[^\]]+\]:\s*<?(https?:\/\/[^\s>]+)/gm
    )) {
      found.add(m[1])
    }
    for (const m of prose.matchAll(new RegExp(TSX_PATTERNS[0].source, "g"))) {
      found.add(m[2])
    }
  }
  return [...found].filter((u) => {
    try {
      const { hostname, pathname } = new URL(u)
      return hostname.includes(".") && !NOT_A_PAGE.test(pathname)
    } catch {
      return false
    }
  })
}

/** Sniff an image format from its first bytes; null for anything else. */
export const sniffImage = (buf) => {
  if (!buf || buf.length < 12) return null
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47)
    return "png"
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg"
  const ascii = (a, b) => String.fromCharCode(...buf.subarray(a, b))
  if (ascii(0, 3) === "GIF") return "gif"
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "webp"
  if (ascii(4, 8) === "ftyp" && /^(avif|avis)$/.test(ascii(8, 12)))
    return "avif"
  return null
}

/** Charset from a content-type header or the first bytes of the document. */
export const detectCharset = (contentType, headBytes) => {
  const fromHeader = /charset=["']?([\w-]+)/i.exec(contentType || "")?.[1]
  if (fromHeader) return fromHeader.toLowerCase()
  const ascii = String.fromCharCode(...headBytes.subarray(0, 4096))
  const fromMeta =
    /<meta[^>]+charset\s*=\s*["']?([\w-]+)/i.exec(ascii)?.[1] || null
  return (fromMeta || "utf-8").toLowerCase()
}
