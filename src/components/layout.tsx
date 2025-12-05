import React, { useEffect } from "react"

import { Footer, Header, ScrollToTop } from "@components"

export interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light"
      document.documentElement.setAttribute("data-theme", newTheme)
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return (
    <div className="m-0 flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-grow px-3 sm:px-4 lg:px-6">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Layout
