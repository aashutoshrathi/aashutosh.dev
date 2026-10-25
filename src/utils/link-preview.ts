import { previewKey, SITE_HOSTS } from "./preview-key.mjs"

/** One hover card, as written by scripts/cache-og.mjs. */
export interface LinkPreviewData {
  title: string
  description?: string
  site?: string
  /** Same-origin path, e.g. /og-cache/3f2a9c1be0d4.webp */
  image?: string
  width?: number
  height?: number
  /** Dominant colour of the image, painted while it decodes */
  color?: string
}

export type LinkPreviews = Record<string, LinkPreviewData>

// External links only (committed, see scripts/cache-og.mjs); links to this
// site's own pages get no card.
const SOURCES = ["/og-cache/manifest.json"]

let loading: Promise<LinkPreviews> | null = null

/**
 * Every cached preview. Fetched once, on the first hover, then shared; a
 * network failure is not remembered so the next hover tries again.
 */
export const loadLinkPreviews = (): Promise<LinkPreviews> => {
  if (!loading) {
    let retry = false
    loading = Promise.all(
      SOURCES.map((url) =>
        fetch(url)
          .then((res) =>
            res.ok ? (res.json() as Promise<{ links?: LinkPreviews }>) : null
          )
          .then((json) => json?.links ?? {})
          .catch(() => {
            retry = true
            return {} as LinkPreviews
          })
      )
    ).then((parts) => {
      if (retry) loading = null
      return Object.assign({}, ...parts) as LinkPreviews
    })
  }
  return loading
}

/** Cache key for a link on the current page (see preview-key.mjs). */
export const linkPreviewKey = (href: string | null): string | null =>
  typeof window === "undefined"
    ? previewKey(href)
    : previewKey(href, window.location.href, [
        window.location.hostname,
        ...SITE_HOSTS,
      ])
