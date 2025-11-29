import React from "react"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import { LayoutProps } from "../types"
import { ThemeProvider } from "../context/ThemeContext"

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="site">
        <Header />
        <main className="site-content">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
