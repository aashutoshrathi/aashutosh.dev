import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const Header = () => {
  const router = useRouter()
  
  const isActive = (pathname: string) => {
    if (pathname === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(pathname)
  }

  return (
    <header className="bg-nav-footer-bg">
      <nav className="flex flex-col md:flex-row justify-between flex-wrap p-4">
        <Link 
          href="/" 
          className="text-center font-manrope text-xl p-2 text-main-text hover:text-main-text mb-2 md:mb-0"
        >
          aashutosh.dev
        </Link>
        <nav className="flex flex-row flex-wrap justify-center md:justify-end">
          <Link 
            href="/" 
            className={`mx-2 p-2 text-main-text hover:text-main-text ${
              isActive('/') ? 'border-b border-white inline pb-1' : ''
            }`}
          >
            Home{" "}
            <span role="img" aria-label="home">
              🏠
            </span>
          </Link>
          <Link 
            href="/work" 
            className={`mx-2 p-2 text-main-text hover:text-main-text ${
              isActive('/work') ? 'border-b border-white inline pb-1' : ''
            }`}
          >
            Work{" "}
            <span role="img" aria-label="work">
              💼
            </span>
          </Link>
          <Link 
            href="/til" 
            className={`mx-2 p-2 text-main-text hover:text-main-text ${
              isActive('/til') ? 'border-b border-white inline pb-1' : ''
            }`}
          >
            TIL{" "}
            <span role="img" aria-label="til">
              📚
            </span>
          </Link>
          <a
            href="https://blog.aashutosh.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 p-2 text-main-text hover:text-main-text"
          >
            Blog{" "}
            <span role="img" aria-label="blog">
              📋
            </span>
          </a>
        </nav>
      </nav>
    </header>
  )
}

export default Header