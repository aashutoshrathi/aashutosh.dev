import React from "react"

const SocialIcon = ({ url, label }) => {
  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <i className={("ico", `icon-${label.toLowerCase()}`)}></i>
      </a>
    </>
  )
}

export default SocialIcon
