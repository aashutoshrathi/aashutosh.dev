import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { lightHaptic } from "../utils/haptic"

const Header: React.FC = () =>
  <header className="py-4">
    <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 gap-4">
      <Link className="text-center text-[1.3rem] font-bold font-mono" to="/" onClick={lightHaptic}>
        {"aashutosh.dev"}
      </Link>
      <nav className="flex flex-row flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 px-2">
        <Link to="/timeline/" className="border-b-2 border-dashed border-transparent" activeClassName="!border-link" onClick={lightHaptic}>
          {"About"}
        </Link>
        <Link to="/blog/" className="border-b-2 border-dashed border-transparent" activeClassName="!border-link" onClick={lightHaptic}>
          {"Blog"}
        </Link>
        <Link to="/work/" className="border-b-2 border-dashed border-transparent" activeClassName="!border-link" onClick={lightHaptic}>
          {"Projects"}
        </Link>
        <Link to="/uses/" className="border-b-2 border-dashed border-transparent" activeClassName="!border-link" onClick={lightHaptic}>
          {"Uses"}
        </Link>
      </nav>
    </nav>
  </header>


export default Header
