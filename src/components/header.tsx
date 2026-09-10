import React from "react"

import { useLocation } from "@gatsbyjs/reach-router"
import { Link } from "gatsby"

import { AnimatedLink, ThemeToggle } from "@components"
import { lightHaptic } from "@utils"

const Header: React.FC = () => {
  const location = useLocation()

  return (
    <header className="py-4">
      <nav className="flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <Link
          className="relative inline text-center font-mono text-2xl font-bold text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
          to="/"
          onClick={lightHaptic}>
          aashutosh.dev
        </Link>

        <div className="flex flex-row flex-wrap items-center justify-center gap-4 px-2 sm:justify-end sm:gap-6">
          <AnimatedLink
            to="/timeline"
            onClick={lightHaptic}
            aria-current={location.pathname === "/timeline" ? "page" : undefined}
            className={
              location.pathname === "/timeline"
                ? "font-semibold text-blue-700 dark:text-blue-300"
                : undefined
            }>
            About
          </AnimatedLink>
          <AnimatedLink
            to="/work"
            onClick={lightHaptic}
            aria-current={location.pathname === "/work" ? "page" : undefined}
            className={
              location.pathname === "/work"
                ? "font-semibold text-blue-700 dark:text-blue-300"
                : undefined
            }>
            Work
          </AnimatedLink>
          <AnimatedLink
            to="/blog"
            onClick={lightHaptic}
            aria-current={
              location.pathname.startsWith("/blog") ? "page" : undefined
            }
            className={
              location.pathname.startsWith("/blog")
                ? "font-semibold text-blue-700 dark:text-blue-300"
                : undefined
            }>
            Blog
          </AnimatedLink>
          <AnimatedLink
            to="/now"
            onClick={lightHaptic}
            aria-current={location.pathname === "/now" ? "page" : undefined}
            className={
              location.pathname === "/now"
                ? "font-semibold text-blue-700 dark:text-blue-300"
                : undefined
            }>
            Now
          </AnimatedLink>
          <AnimatedLink
            to="/uses"
            onClick={lightHaptic}
            aria-current={location.pathname === "/uses" ? "page" : undefined}
            className={
              location.pathname === "/uses"
                ? "font-semibold text-blue-700 dark:text-blue-300"
                : undefined
            }>
            Uses
          </AnimatedLink>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Header
