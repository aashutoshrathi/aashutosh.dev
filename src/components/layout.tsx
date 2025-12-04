import React from "react"

import { ThemeProvider } from "../context/ThemeContext"
import { LayoutProps } from "../types"
import Footer from "./footer"
import Header from "./header"
import ScrollToTop from "./ScrollToTop"

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="m-0 flex min-h-screen w-full flex-col overflow-x-hidden">
        <Header />
        <main className="mx-auto w-full max-w-4xl flex-grow px-3 sm:px-4 lg:px-6">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}

export default Layout
