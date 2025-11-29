import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { Link as GatsbyLink } from "gatsby"
import { LinkProps } from "../types"

const Link: React.FC<LinkProps> = ({ url, children, external = true, className = "" }) => {
  const linkClasses = `relative inline font-medium leading-[1.2] transition-all duration-[250ms] ease-in-out no-underline border-b-0 pb-[1px] hover:no-underline hover:border-b-2 hover:border-dashed ${className}`

  const linkStyle = {
    color: 'var(--link-color)',
  }

  const hoverStyle = {
    color: 'var(--link-hover-color)',
    borderBottomColor: 'var(--link-hover-color)',
  }

  // If it's an external link, use OutboundLink for analytics
  if (external) {
    return (
      <OutboundLink
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        style={linkStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--link-hover-color)'
          e.currentTarget.style.borderBottomColor = 'var(--link-hover-color)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--link-color)'
          e.currentTarget.style.borderBottomColor = 'transparent'
        }}
      >
        {children}
      </OutboundLink>
    )
  }

  // For internal links, use Gatsby Link
  return (
    <GatsbyLink
      to={url}
      className={linkClasses}
      style={linkStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--link-hover-color)'
        e.currentTarget.style.borderBottomColor = 'var(--link-hover-color)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--link-color)'
        e.currentTarget.style.borderBottomColor = 'transparent'
      }}
    >
      {children}
    </GatsbyLink>
  )
}

export default Link
