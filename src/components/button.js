import React from "react"

const Button = ({ url, text }) => {
  return (
    <>
      <a
        href={url}
        id="sourcerer"
        target=" _blank"
        rel="noopener noreferrer"
        className="uk-button uk-button-secondary uk-border-pill uk-margin-right"
      >
        {text}
      </a>
    </>
  )
}

export default Button
