import React from "react"
import "./button.css"

const Button = ({ url, text }) => {
  return (
    <>
      <a
        href={url}
        target=" _blank"
        rel="noopener noreferrer"
        className={["pill-button", "padding-small", "margin-right-medium"].join(
          " "
        )}
      >
        {text}
      </a>
    </>
  )
}

export default Button
