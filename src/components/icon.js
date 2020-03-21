import React from "react"

const Icon = ({ url, label }) => {
  label = label.replace(/\+/g, "p") // for c++
  return (
    <>
      <a
        {...(url && { href: url })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
      >
        <i className={("ico", `icon-${label.toLowerCase()}`)}></i>
      </a>
    </>
  )
}

export default Icon
