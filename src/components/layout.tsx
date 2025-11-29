import React from "react"
import Helmet from "react-helmet"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import { LayoutProps } from "../types"
import { ThemeProvider } from "../context/ThemeContext"

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <Helmet>
        <script type="module" src="https://unpkg.com/pixel-canvas@latest/dist/pixel-canvas.js"></script>
      </Helmet>
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
