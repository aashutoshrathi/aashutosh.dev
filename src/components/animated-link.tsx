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
}

const getFaviconCandidates = (href: string): string[] => {
  try {
    const url = new URL(href, "https://aashutosh.dev")
    if (url.hostname === "aashutosh.dev" || url.hostname === "www.aashutosh.dev") {
      return []
    }
    const host = url.hostname
    return [
      `https://${host}/favicon.ico`,
      `https://${host}/favicon.svg`,
      `https://${host}/favicon.png`,
      `https://www.google.com/s2/favicons?domain=${host}&sz=16`,
    ]
  } catch {
    return []
  }
}

const Favicon: React.FC<{ href: string }> = ({ href }) => {
  const candidates = React.useMemo(() => getFaviconCandidates(href), [href])
  const [idx, setIdx] = React.useState(0)
  if (candidates.length === 0 || idx >= candidates.length) return null
  return (
    <img
      src={candidates[idx]}
      alt=""
      width={12}
      height={12}
      loading="lazy"
      onError={() => setIdx((i) => i + 1)}
      className="mr-1 inline-block size-3 align-middle opacity-80"
    />
  )
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  to,
  href,
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
        {href && <Favicon href={href} />}
        {children}
      </OutboundLink>
    )
  }

  // Fallback if neither to nor href is provided
  return (
    <a className={classes} {...(props as any)}>
      {href && <Favicon href={href} />}
      {children}
    </a>
  )
}

export default AnimatedLink
