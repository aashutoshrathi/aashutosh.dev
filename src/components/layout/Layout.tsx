import React from "react"
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
  verticallyCenter?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, verticallyCenter = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${verticallyCenter ? 'flex items-center justify-center' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout