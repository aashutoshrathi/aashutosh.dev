import React from "react"

const Footer = () => {
  return (
    <footer className="bg-nav-footer-bg text-center p-4">
      © {new Date().getFullYear()}, Built with
      {` ❤️ `}
      by Aashutosh Rathi
    </footer>
  )
}

export default Footer