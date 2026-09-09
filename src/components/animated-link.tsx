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
    if (url.hostname === "aashutosh.dev" || url.hostname === "www.aashutosh.dev") {
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

  const candidates = React.useMemo(() => getFaviconCandidates(href, isDark), [href, isDark])
  const [idx, setIdx] = React.useState(0)
  React.useEffect(() => setIdx(0), [candidates])
  if (candidates.length === 0 || idx >= candidates.length) return null
  return (
    <img
      src={candidates[idx]}
      alt=""
      width={13}
      height={13}
      loading="lazy"
      onError={() => setIdx((i) => i + 1)}
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
