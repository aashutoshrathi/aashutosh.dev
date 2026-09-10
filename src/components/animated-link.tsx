import React from "react"

import clsx from "clsx"
import { GatsbyLinkProps, Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"

type AnimatedLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  to?: string
  href?: string
  hideFavicon?: boolean
}

const getFaviconCandidates = (href: string, isDark: boolean): string[] => {
  try {
    const url = new URL(href, "https://aashutosh.dev")
    if (
      url.hostname === "aashutosh.dev" ||
      url.hostname === "www.aashutosh.dev" ||
      url.hostname === "github.com" ||
      url.hostname === "www.github.com"
    ) {
      return []
    }
    const host = url.hostname
    const light = [
      `https://${host}/favicon.ico`,
      `https://${host}/favicon.svg`,
      `https://${host}/icon.svg`,
      `https://${host}/icons/icon.svg`,
      `https://${host}/favicon.png`,
      `https://${host}/icons/icon.png`,
      `https://${host}/apple-touch-icon.png`,
    ]
    const dark = [
      `https://${host}/favicon-dark.ico`,
      `https://${host}/icon-dark.svg`,
      `https://${host}/favicon-dark.svg`,
      `https://${host}/favicon-dark.png`,
    ]
    return isDark ? [...dark, ...light] : [...light, ...dark]
  } catch {
    return []
  }
}

const FAVICON_CACHE_KEY = "favicon-cache-v1"
const FAVICON_TTL = 7 * 24 * 60 * 60 * 1000 // 1 week

const getCachedFavicon = (host: string, isDark: boolean): string | null => {
  try {
    const raw = localStorage.getItem(FAVICON_CACHE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as Record<string, { url: string; ts: number }>
    const key = `${host}:${isDark ? "dark" : "light"}`
    const entry = data[key]
    if (!entry) return null
    if (Date.now() - entry.ts > FAVICON_TTL) {
      delete data[key]
      localStorage.setItem(FAVICON_CACHE_KEY, JSON.stringify(data))
      return null
    }
    return entry.url
  } catch {
    return null
  }
}

const setCachedFavicon = (host: string, isDark: boolean, url: string) => {
  try {
    const raw = localStorage.getItem(FAVICON_CACHE_KEY)
    const data = raw ? (JSON.parse(raw) as Record<string, { url: string; ts: number }>) : {}
    const key = `${host}:${isDark ? "dark" : "light"}`
    data[key] = { url, ts: Date.now() }
    const now = Date.now()
    for (const k of Object.keys(data)) {
      if (now - data[k].ts > FAVICON_TTL) delete data[k]
    }
    localStorage.setItem(FAVICON_CACHE_KEY, JSON.stringify(data))
  } catch {}
}

const EMOJI_FALLBACK: Record<string, string> = {
  "toki.aashutosh.dev": "🖥️",
  "api.chess.com": "♟️",
  "chess.com": "♟️",
}

const Favicon: React.FC<{ href: string }> = ({ href }) => {
  const [isDark, setIsDark] = React.useState(false)
  React.useEffect(() => {
    const update = () => {
      const attr = typeof document !== "undefined" ? document.documentElement.getAttribute("data-theme") : null
      if (attr === "dark" || attr === "light") {
        setIsDark(attr === "dark")
      } else if (typeof window !== "undefined" && window.matchMedia) {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
      }
    }
    update()
    const mq = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null
    const observer = typeof MutationObserver !== "undefined" ? new MutationObserver(update) : null
    if (typeof document !== "undefined" && observer) {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] })
    }
    mq?.addEventListener?.("change", update)
    return () => {
      observer?.disconnect()
      mq?.removeEventListener?.("change", update)
    }
  }, [])

  const candidates = React.useMemo(() => {
    const base = getFaviconCandidates(href, isDark)
    if (base.length === 0) return base
    try {
      const url = new URL(href, "https://aashutosh.dev")
      const cached = getCachedFavicon(url.hostname, isDark)
      if (cached && base.includes(cached)) {
        return [cached, ...base.filter((c) => c !== cached)]
      }
      if (cached) return [cached, ...base]
    } catch {}
    return base
  }, [href, isDark])

  const [idx, setIdx] = React.useState(0)
  const [failed, setFailed] = React.useState(false)
  React.useEffect(() => {
    setIdx(0)
    setFailed(false)
  }, [candidates])

  if (candidates.length === 0 || failed) {
    try {
      const url = new URL(href, "https://aashutosh.dev")
      const emoji = EMOJI_FALLBACK[url.hostname]
      if (emoji) {
        return <span className="mr-1 inline-block align-middle text-xs">{emoji}</span>
      }
    } catch {}
    return null
  }
  if (idx >= candidates.length) {
    try {
      const url = new URL(href, "https://aashutosh.dev")
      const emoji = EMOJI_FALLBACK[url.hostname]
      if (emoji) return <span className="mr-1 inline-block align-middle text-xs">{emoji}</span>
    } catch {}
    return null
  }
  return (
    <img
      src={candidates[idx]}
      alt=""
      width={12}
      height={12}
      loading="lazy"
      onLoad={() => {
        try {
          const url = new URL(href, "https://aashutosh.dev")
          setCachedFavicon(url.hostname, isDark, candidates[idx])
        } catch {}
      }}
      onError={() => {
        if (idx + 1 >= candidates.length) {
          try {
            const url = new URL(href, "https://aashutosh.dev")
            if (EMOJI_FALLBACK[url.hostname]) {
              setFailed(true)
              return
            }
          } catch {}
        }
        setIdx((i) => i + 1)
      }}
      className="mr-1 inline-block size-3 align-middle opacity-80"
    />
  )
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  to,
  href,
  hideFavicon,
  className,
  children,
  ...props
}) => {
  const baseClasses =
    "relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
  const classes = clsx(baseClasses, className)

  if (to) {
    return (
      <Link to={to} className={classes} {...(props as any)}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <OutboundLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...(props as any)}>
        {href && !hideFavicon && <Favicon href={href} />}
        {children}
      </OutboundLink>
    )
  }

  // Fallback if neither to nor href is provided
  return (
    <a className={classes} {...(props as any)}>
      {href && !hideFavicon && <Favicon href={href} />}
      {children}
    </a>
  )
}

export default AnimatedLink
