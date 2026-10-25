// Shared by the browser (components/link-preview.tsx), the build-time cacher
// (scripts/cache-og.mjs) and gatsby-node.ts, so the key a preview is written
// under is exactly the key a hovered link looks up. Plain JS on purpose: the
// scripts run under bare `node` without a TypeScript step.

export const SITE_HOSTS = ["aashutosh.dev", "www.aashutosh.dev"]

const TRACKING_PARAM = /^(utm_[a-z_]+|fbclid|gclid)$/i

/**
 * Cache key for a link, or null when it can't have a preview (mailto:,
 * javascript:, malformed). Pages on this site key on their path
 * ("/blog/nibble-4"); everything else on an https URL with the hash, tracking
 * params and any trailing slash dropped.
 *
 * @param {string | null | undefined} href
 * @param {string} [base]
 * @param {readonly string[]} [ownHosts]
 * @returns {string | null}
 */
export const previewKey = (
  href,
  base = "https://aashutosh.dev/",
  ownHosts = SITE_HOSTS
) => {
  if (!href) return null
  let url
  try {
    url = new URL(href.trim(), base)
  } catch {
    return null
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null

  const path =
    url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") || "/" : "/"
  if (ownHosts.includes(url.hostname)) return path

  url.hash = ""
  url.protocol = "https:"
  if ([...url.searchParams.keys()].some((k) => TRACKING_PARAM.test(k))) {
    for (const k of [...url.searchParams.keys()]) {
      if (TRACKING_PARAM.test(k)) url.searchParams.delete(k)
    }
  }
  url.pathname = path
  return url.href
}
