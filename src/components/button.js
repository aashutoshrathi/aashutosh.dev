import React from "react"
import "./button.css"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const Button = ({ url, text }) => {
  return (
    <OutboundLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="button"
    >
      {text}
    </OutboundLink>
  )
}

export default Button
