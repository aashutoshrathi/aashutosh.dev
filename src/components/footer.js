/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

const Footer = () => {
  return (
    <section>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` ❤️ `}
        by Aashutosh Rathi
      </footer>
    </section>
  )
}

export default Footer
