import React from "react"
import "./button.css"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { ButtonProps } from "../types"

const Button: React.FC<ButtonProps> = ({ url, text }) => {
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
