import type { Context } from "https://edge.netlify.com/"

const CLI_AGENTS = /curl|httpie|wget|fetch\//i

const PLAIN_TEXT = `$ curl aashutosh.dev

Aashutosh Rathi
software engineer by profession, in it for the plot.

  work       optimizing sales with AI @ regie.ai
  building   toki, pratinidhi & other tiny tools for people
             who hate doing things manually
  writing    nibbles.dev + aashutosh.dev/blog

  web        https://aashutosh.dev
  github     https://github.com/aashutoshrathi
  x          https://x.com/AashutoshRathi
  rss        https://aashutosh.dev/rss.xml

tip: open https://aashutosh.dev in a browser for the animated version.
`

export default async (request: Request, context: Context) => {
  const userAgent = request.headers.get("user-agent") ?? ""

  if (!CLI_AGENTS.test(userAgent)) {
    return context.next()
  }

  return new Response(PLAIN_TEXT, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  })
}

export const config = { path: "/" }
