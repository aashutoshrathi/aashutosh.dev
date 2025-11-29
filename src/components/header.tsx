import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const Header: React.FC = () => (
  <header className="py-4">
    <nav className="p-[1%] flex flex-wrap flex-row justify-between max-w-3xl mx-auto max-[500px]:flex-col">
      <Link className="text-center text-[1.3rem] font-bold font-mono p-2" to="/">
        {"aashutosh.dev"}
      </Link>
      <nav className="flex flex-row justify-between flex-wrap mx-[0.7rem]">
        <Link to="/work/" className="mx-[0.7rem]" activeClassName="font-bold">
          {"Work"}
        </Link>
        <OutboundLink
          href="https://blog.aashutosh.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-[0.7rem]"
        >
          {"Blog"}
        </OutboundLink>
        <Link to="/resume/" className="mx-[0.7rem]" activeClassName="font-bold">
          {"Résumé"}
        </Link>
      </nav>
    </nav>
  </header>
)

export default Header
