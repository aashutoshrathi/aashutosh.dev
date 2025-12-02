import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const Header: React.FC = () =>
  <header className="py-4">
    <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 gap-4">
      <Link className="text-center text-[1.3rem] font-bold font-mono" to="/">
        {"aashutosh.dev"}
      </Link>
      <nav className="flex flex-row flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
        <Link to="/timeline/" activeClassName="border-b-2 border-dashed border-link">
          {"About"}
        </Link>
        <Link to="/blog/" activeClassName="border-b-2 border-dashed border-link">
          {"Blog"}
        </Link>
        <Link to="/work/" activeClassName="border-b-2 border-dashed border-link">
          {"Projects"}
        </Link>
        <Link to="/uses/" activeClassName="border-b-2 border-dashed border-link">
          {"Uses"}
        </Link>
      </nav>
    </nav>
  </header>


export default Header
