import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const Header = () => (
  <header>
    <nav className="header">
      <Link className="title" to="/">
        {"aashutosh.dev "}
      </Link>
      <nav>
        <Link to="/" activeClassName="active">
          {"Home "}
          <span role="img" aria-label="home">
            🏠
          </span>
        </Link>
        <Link to="/work/" activeClassName="active">
          {"Work "}
          <span role="img" aria-label="work">
            💼
          </span>
        </Link>
        <OutboundLink
          href="https://blog.aashutosh.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"Blog "}
          <span role="img" aria-label="blog">
            📋
          </span>
        </OutboundLink>
      </nav>
    </nav>
  </header>
)

export default Header
