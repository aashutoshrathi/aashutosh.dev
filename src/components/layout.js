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
        {/* <script
          src="https://cdn.lr-ingest.io/LogRocket.min.js"
          crossorigin="anonymous"
        ></script>
        <script>
          window.LogRocket && window.LogRocket.init('egtlbt/aashutosh-rathi');
        </script> */}
      </Helmet>
      <div className="site">
        <Header />
        <main className={"site-content"}>{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
