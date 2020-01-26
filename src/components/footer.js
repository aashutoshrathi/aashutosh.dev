import React from "react"
import "./footer.module.css"

const Footer = () => {
  return (
    <footer className={"uk-text-center uk-padding-small"}>
      © {new Date().getFullYear()}, Built with
      {` ❤️ `}
      by Aashutosh Rathi
    </footer>
  )
}

export default Footer
