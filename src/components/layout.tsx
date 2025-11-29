import React from "react"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import { LayoutProps } from "../types"

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="site">
        <Header />
        <main className="site-content">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
