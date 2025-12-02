import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const Header: React.FC = () => (
  <header className="py-4">
    <nav className="p-[1%] flex flex-wrap flex-row justify-between items-center px-4 sm:px-6 lg:px-8 max-[500px]:flex-col">
      <Link className="text-center text-[1.3rem] font-bold font-mono p-2" to="/" activeClassName="border-b-2 border-dashed border-link">
        {"aashutosh.dev"}
      </Link>
      <nav className="flex flex-row justify-between flex-wrap mx-[0.7rem]">
        <Link to="/work/" className="mx-[0.7rem]" activeClassName="border-b-2 border-dashed border-link">
          {"Work"}
        </Link>
        <Link to="/timeline/" className="mx-[0.7rem]" activeClassName="border-b-2 border-dashed border-link">
          {"Timeline"}
        </Link>
        <Link to="/uses/" className="mx-[0.7rem]" activeClassName="border-b-2 border-dashed border-link">
          {"Uses"}
        </Link>
        <Link to="/blog/" className="mx-[0.7rem]" activeClassName="border-b-2 border-dashed border-link">
          {"Blog"}
        </Link>
        <Link to="/resume/" className="mx-[0.7rem]" activeClassName="border-b-2 border-dashed border-link">
          {"Résumé"}
        </Link>
      </nav>
    </nav>
  </header>
)

export default Header
