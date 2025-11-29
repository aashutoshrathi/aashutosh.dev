import React from "react"
import { ThemeProvider } from "../context/ThemeContext"
import { LayoutProps } from "../types"
import Footer from "./footer"
import Header from "./header"

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="m-0 flex min-h-screen flex-col overflow-x-hidden w-full">
        <Header />
        <main className="flex-grow max-w-3xl mx-auto w-full">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
