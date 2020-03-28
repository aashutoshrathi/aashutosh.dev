import React from "react"
import { Link } from "gatsby"

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
        <Link to="/blog/" activeClassName="active">
          {"Blog "}
          <span role="img" aria-label="work">
            📋
          </span>
        </Link>
      </nav>
    </nav>
  </header>
)

export default Header
