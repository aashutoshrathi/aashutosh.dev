import { describe, expect, it } from "bun:test"

import { previewKey } from "../../src/utils/preview-key.mjs"
import {
  cleanText,
  decodeEntities,
  detectCharset,
  dropRepeatedTagline,
  extractLinks,
  parseOg,
  sniffImage,
  stripGithubBoilerplate,
  stripSiteName,
} from "./og.mjs"

const page = (head: string, body = "") =>
  `<!doctype html><html><head>${head}</head><body>${body}</body></html>`

describe("parseOg", () => {
  it("reads Open Graph tags and resolves a relative image", () => {
    const og = parseOg(
      page(`
        <meta property="og:title" content="Toki">
        <meta property="og:description" content="Menu bar app &amp; friends">
        <meta property="og:site_name" content="toki">
        <meta property="og:image" content="/og.png">`),
      "https://toki.aashutosh.dev/docs/"
    )
    expect(og).toEqual({
      title: "Toki",
      description: "Menu bar app & friends",
      site: "toki",
      image: "https://toki.aashutosh.dev/og.png",
    })
  })

  it("falls back to twitter tags, then <title> and meta description", () => {
    const twitter = parseOg(
      page(`<meta name="twitter:title" content="From Twitter">
            <meta name="twitter:image:src" content="https://cdn.example.com/a.jpg">`),
      "https://example.com"
    )
    expect(twitter?.title).toBe("From Twitter")
    expect(twitter?.image).toBe("https://cdn.example.com/a.jpg")

    const plain = parseOg(
      page(`<title>
              Plain   Title
            </title><meta name="description" content="Plain description">`),
      "https://example.com"
    )
    expect(plain).toEqual({
      title: "Plain Title",
      description: "Plain description",
      site: "",
      image: null,
    })
  })

  it("handles attribute order, single quotes, unquoted values and > in content", () => {
    const og = parseOg(
      page(`<meta content='a > b' property=og:title />
            <META CONTENT="desc" NAME="Description">`),
      "https://example.com"
    )
    expect(og?.title).toBe("a > b")
    expect(og?.description).toBe("desc")
  })

  it("prefers secure_url, and the first of repeated tags", () => {
    const og = parseOg(
      page(`<meta property="og:title" content="First">
            <meta property="og:title" content="Second">
            <meta property="og:image" content="http://example.com/plain.png">
            <meta property="og:image:secure_url" content="https://example.com/secure.png">`),
      "https://example.com"
    )
    expect(og?.title).toBe("First")
    expect(og?.image).toBe("https://example.com/secure.png")
  })

  it("ignores tags in scripts, comments and the body", () => {
    const og = parseOg(
      page(
        `<!-- <meta property="og:title" content="Commented"> -->
         <script>document.write('<meta property="og:title" content="Scripted">')</script>
         <title>Real</title>`,
        `<meta property="og:title" content="Body">`
      ),
      "https://example.com"
    )
    expect(og?.title).toBe("Real")
  })

  it("drops the site name from the title", () => {
    const og = parseOg(
      page(`<meta property="og:site_name" content="GitHub">
            <meta property="og:title" content="GitHub - aashutoshrathi/toki: menu bar app">`),
      "https://github.com/aashutoshrathi/toki"
    )
    expect(og?.title).toBe("aashutoshrathi/toki: menu bar app")
  })

  it("rejects bot walls and pages without a title", () => {
    expect(
      parseOg(page("<title>Just a moment...</title>"), "https://a.co")
    ).toBeNull()
    expect(
      parseOg(
        page(
          "<title>Login • Instagram</title><meta property='og:site_name' content='Instagram'>"
        ),
        "https://a.co"
      )
    ).toBeNull()
    expect(
      parseOg(page(`<meta name="description" content="x">`), "https://a.co")
    ).toBeNull()
  })

  it("ignores non-http images and truncates long text on a word", () => {
    const long = "word ".repeat(80)
    const og = parseOg(
      page(`<title>T</title><meta name="description" content="${long}">
            <meta property="og:image" content="javascript:alert(1)">`),
      "https://example.com"
    )
    expect(og?.image).toBeNull()
    expect(og!.description.length).toBeLessThanOrEqual(220)
    expect(og!.description.endsWith("word…")).toBe(true)
  })
})

describe("text helpers", () => {
  it("decodes named and numeric entities", () => {
    expect(
      decodeEntities("Tom &amp; Jerry &#8217;s &#x2014; &quot;hi&quot; &bogus;")
    ).toBe('Tom & Jerry ’s — "hi" &bogus;')
  })

  it("collapses whitespace and only cuts when needed", () => {
    expect(cleanText("  a \n\t b  ")).toBe("a b")
    expect(cleanText("short", 20)).toBe("short")
    expect(cleanText("one two three four five", 16)).toBe("one two three…")
    // A word boundary that would throw away most of the budget is ignored.
    expect(cleanText("tiny supercalifragilistic", 16)).toBe("tiny supercalif…")
  })

  it("strips a site name prefix or suffix but never the whole title", () => {
    expect(stripSiteName("Post title | The Verge", "The Verge")).toBe(
      "Post title"
    )
    expect(
      stripSiteName("Raycast - Your shortcut to everything", "Raycast")
    ).toBe("Your shortcut to everything")
    expect(stripSiteName("Raycast", "Raycast")).toBe("Raycast")
    expect(stripSiteName("Zed-editor", "Zed")).toBe("Zed-editor")
  })

  it("drops a title's tagline only when the description repeats it", () => {
    const blurb = "Native macOS menu bar app for managing usage and sessions"
    expect(dropRepeatedTagline(`aashutoshrathi/toki: ${blurb}`, blurb)).toBe(
      "aashutoshrathi/toki"
    )
    // A title already cut short on a word still matches
    expect(
      dropRepeatedTagline("owner/repo: Native macOS menu bar…", blurb)
    ).toBe("owner/repo")
    expect(dropRepeatedTagline("Rust: a language guide", blurb)).toBe(
      "Rust: a language guide"
    )
    expect(dropRepeatedTagline("Note: hi", "hi there")).toBe("Note: hi")
    expect(dropRepeatedTagline(`owner/repo: ${blurb}`, "")).toBe(
      `owner/repo: ${blurb}`
    )
  })

  it("drops GitHub's sign-up line from repo descriptions", () => {
    const tail =
      "Contribute to aashutoshrathi/mnm development by creating an account on GitHub."
    expect(
      stripGithubBoilerplate(
        `Marker & Mayhem - Pictionary for the masses. ${tail}`
      )
    ).toBe("Marker & Mayhem - Pictionary for the masses.")
    expect(stripGithubBoilerplate(tail)).toBe("")
    expect(stripGithubBoilerplate("Contribute to open source.")).toBe(
      "Contribute to open source."
    )
  })
})

describe("extractLinks", () => {
  it("finds JSX hrefs and link-ish object fields in components", () => {
    const tsx = `
      <AnimatedLink href="https://regie.ai">Regie</AnimatedLink>
      <AnimatedLink href={"https://nibbles.dev"}>nibbles</AnimatedLink>
      const items = [{ name: "Zed", link: "https://zed.dev/" }, { homepage: 'https://toki.aashutosh.dev/' }]
      <SocialIcon link="https://x.com/AashutoshRathi" />
      <a href={\`https://www.chess.com/member/\${USERNAME}\`}>chess</a>
      const API = "https://api.github.com/users/x/repos"
    `
    expect(extractLinks(tsx, "tsx").sort()).toEqual([
      "https://nibbles.dev",
      "https://regie.ai",
      "https://toki.aashutosh.dev/",
      "https://zed.dev/",
    ])
  })

  it("finds markdown links but not images, code or files", () => {
    const mdx = [
      'See [Wallace](https://en.wikipedia.org/wiki/Wallace_(naturalist)) and [*Zed*](https://zed.dev "title").',
      "![shot](https://cdn.example.com/shot.png)",
      "[![badge](https://img.shields.io/x.svg)](https://github.com/a/b)",
      "Autolink <https://jvns.ca/> and `[not](https://code.example.com)`.",
      "```sh\ncurl [x](https://fenced.example.com)\n```",
      "[resume](https://files.aashutosh.dev/resume.pdf)",
      "[ref]: https://ref.example.com/page",
      '<a href="https://jsx.example.com">jsx</a>',
    ].join("\n")
    expect(extractLinks(mdx, "mdx").sort()).toEqual([
      "https://en.wikipedia.org/wiki/Wallace_(naturalist)",
      "https://github.com/a/b",
      "https://jsx.example.com",
      "https://jvns.ca/",
      "https://ref.example.com/page",
      "https://zed.dev",
    ])
  })
})

describe("previewKey", () => {
  it("keys pages on this site by path", () => {
    expect(previewKey("/blog/")).toBe("/blog")
    expect(previewKey("https://aashutosh.dev/blog/nibble-4/")).toBe(
      "/blog/nibble-4"
    )
    expect(previewKey("https://www.aashutosh.dev")).toBe("/")
    expect(previewKey("#section", "https://aashutosh.dev/now")).toBe("/now")
    expect(
      previewKey("/uses", "http://localhost:9000/", [
        "localhost",
        "aashutosh.dev",
      ])
    ).toBe("/uses")
  })

  it("normalises external links the same way however they were written", () => {
    expect(previewKey("https://regie.ai")).toBe("https://regie.ai/")
    expect(previewKey("http://statusline.aashutosh.dev")).toBe(
      "https://statusline.aashutosh.dev/"
    )
    expect(previewKey("https://www.raycast.com/ai/#top")).toBe(
      "https://www.raycast.com/ai"
    )
    expect(
      previewKey("https://www.youtube.com/watch?v=abc&utm_source=x&t=6s")
    ).toBe("https://www.youtube.com/watch?v=abc&t=6s")
    expect(previewKey("https://Example.COM/A")).toBe("https://example.com/A")
  })

  it("has no key for non-web links", () => {
    expect(previewKey("mailto:me@aashutosh.dev")).toBeNull()
    expect(previewKey("javascript:void(0)")).toBeNull()
    expect(previewKey("")).toBeNull()
    expect(previewKey(null)).toBeNull()
  })
})

describe("byte sniffing", () => {
  it("recognises raster images and nothing else", () => {
    const png = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0,
    ])
    const webp = new TextEncoder().encode("RIFF\0\0\0\0WEBPVP8 ")
    const avif = new TextEncoder().encode("\0\0\0\x1cftypavif")
    const svg = new TextEncoder().encode(
      "<svg xmlns='http://www.w3.org/2000/svg'>"
    )
    expect(sniffImage(png)).toBe("png")
    expect(sniffImage(webp)).toBe("webp")
    expect(sniffImage(avif)).toBe("avif")
    expect(sniffImage(svg)).toBeNull()
  })

  it("reads the charset from the header, then the document", () => {
    const doc = new TextEncoder().encode('<meta charset="Shift_JIS">')
    expect(detectCharset("text/html; charset=ISO-8859-1", doc)).toBe(
      "iso-8859-1"
    )
    expect(detectCharset("text/html", doc)).toBe("shift_jis")
    expect(detectCharset("", new Uint8Array(4))).toBe("utf-8")
  })
})
