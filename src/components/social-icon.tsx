import React, { useRef } from "react"

import { OutboundLink } from "gatsby-plugin-google-gtag"
import { IconType } from "react-icons"

interface SocialIconProps {
  link: string
  title: string
  icon: IconType
}

const SocialIcon = ({ link, title, icon }: SocialIconProps) => {
  const Icon = icon

  const iconRef = useRef<HTMLSpanElement | null>(null)

  return (
    <span ref={iconRef} className="inline-block">
      <OutboundLink
        href={link}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block p-1 text-3xl rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-900 dark:focus-visible:ring-white"
      >
        <Icon />
      </OutboundLink>
    </span>
  )
}

export default SocialIcon
