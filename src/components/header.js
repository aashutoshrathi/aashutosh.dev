import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const Header = () => (
  <header>
    <nav className="header">
      <Link className="title mono" to="/">
        {"aashutosh.dev"}
      </Link>
      <nav>
        <Link to="/work/" activeClassName="active">
          {"Work"}
        </Link>
        <OutboundLink
          href="https://blog.aashutosh.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"Blog"}
        </OutboundLink>
        <OutboundLink
          href="https://resume.aashutosh.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"Résumé"}
        </OutboundLink>
      </nav>
    </nav>
  </header>
)

export default Header
