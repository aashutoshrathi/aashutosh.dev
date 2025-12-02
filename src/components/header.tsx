import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const Header: React.FC = () => (
  <header className="py-4">
    <nav className="p-[1%] flex flex-wrap flex-row justify-between items-center px-4 sm:px-6 lg:px-8 max-[500px]:flex-col">
      <Link className="text-center text-[1.3rem] font-bold font-mono p-2" to="/" activeClassName="font-bold">
        {"aashutosh.dev"}
      </Link>
      <nav className="flex flex-row justify-between flex-wrap mx-[0.7rem]">
        <Link to="/work/" className="mx-[0.7rem]" activeClassName="font-bold">
          {"Work"}
        </Link>
        <Link to="/timeline/" className="mx-[0.7rem]" activeClassName="font-bold">
          {"Timeline"}
        </Link>
        <Link to="/uses/" className="mx-[0.7rem]" activeClassName="font-bold">
          {"Uses"}
        </Link>
        <Link to="/blog/" className="mx-[0.7rem]" activeClassName="font-bold">
          {"Blog"}
        </Link>
        <Link to="/resume/" className="mx-[0.7rem]" activeClassName="font-bold">
          {"Résumé"}
        </Link>
      </nav>
    </nav>
  </header>
)

export default Header
