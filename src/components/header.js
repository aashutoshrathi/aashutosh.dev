import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <header>
    <ul>
      <li>
        <Link className="title" to="/">
          {"aashutosh.dev "}
        </Link>
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

      <li>
        <a
          href="https://blog.aashutosh.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"Blog "}
          <span role="img" aria-label="blog">
            📋
          </span>
        </a>
      </li>
    </ul>
  </header>
)

export default Header
