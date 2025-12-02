import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { ButtonProps } from "../types"
import { mediumHaptic } from "../utils/haptic"

const Button: React.FC<ButtonProps> = ({ url, text }) => {
  return (
    <OutboundLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ease-in-out no-underline hover:no-underline"
      style={{
        backgroundColor: 'var(--link-color)',
        color: 'var(--main-bg-color)',
      }}
      onClick={() => mediumHaptic()}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--link-hover-color)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--link-color)'
      }}
    >
      {text}
    </OutboundLink>
  )
}

export default Button
