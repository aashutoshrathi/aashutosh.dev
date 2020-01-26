import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <header>
    <ul>
      <li>
        <Link to="/">{"aashutosh.dev "}</Link>
      </li>
      <li>
        <Link to="/">
          {"Home "}
          <span role="img" aria-label="home">
            🏠
          </span>
        </Link>
      </li>
      <li>
        <Link to="/work">
          {"Work "}
          <span role="img" aria-label="work">
            🛠
          </span>
        </Link>
      </li>
    </ul>
  </header>
)

export default Header
