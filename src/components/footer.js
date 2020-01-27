import React from "react"

const Footer = () => {
  return (
    <footer className={"text-center"}>
      © {new Date().getFullYear()}, Built with
      {` ❤️ `}
      by Aashutosh Rathi
    </footer>
  )
}

export default Footer
