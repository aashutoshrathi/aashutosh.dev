import React from "react"
import "./link.css"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { Link as GatsbyLink } from "gatsby"
import { LinkProps } from "../types"

const Link: React.FC<LinkProps> = ({ url, children, external = true, className = "" }) => {
  // If it's an external link, use OutboundLink for analytics
  if (external) {
    return (
      <OutboundLink
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`custom-link ${className}`}
      >
        {children}
      </OutboundLink>
    )
  }

  // For internal links, use Gatsby Link
  return (
    <GatsbyLink to={url} className={`custom-link ${className}`}>
      {children}
    </GatsbyLink>
  )
}

export default Link
