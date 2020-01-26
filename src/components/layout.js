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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.2/css/uikit.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
        />
        <script src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"></script>
      </Helmet>
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
