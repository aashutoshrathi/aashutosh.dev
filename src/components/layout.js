import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <script
          async
          src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"
        ></script>
      </Helmet>
      <div className="alert-primary">
        <p className="text-center">
          This is site is currently in beta, if you have any suggestions ping me
          at <a href="emailto:me@aashutosh.dev">me@aashutosh.dev</a>. Thanks for
          visiting 😬. Simply scroll a bit to ignore this.
        </p>
      </div>
      <div className="site">
        <Header />
        <div className={"site-content"}>{children}</div>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
