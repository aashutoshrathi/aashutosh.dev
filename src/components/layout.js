import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children, verticallyCenter }) => {
  return (
    <>
      <div className="site">
        <Header />
        <main className={`${verticallyCenter ? "main" : "site-content"}`}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
