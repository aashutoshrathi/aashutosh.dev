import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import gsap from "gsap"

import { lightHaptic } from "@utils"

const Header: React.FC = () => {
  const location = useLocation()

  const navRef = useRef<HTMLElement | null>(null)
  const navLinksRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    const delay = location.pathname === "/" ? 1.75 : 0.25

    tl.from(navRef.current, {
      opacity: 0,
      translateY: "-50%",
      animationDuration: 750,
      ease: "power2.out",
      delay,
    })

    if (navLinksRef.current) {
      tl.from(navLinksRef.current.children, {
        opacity: 0,
        translateY: "-50%",
        animationDuration: 500,
        ease: "power3.out",
        stagger: 0.04,
      })
    }
  }, [])

  return (
    <header className="py-4">
      <nav
        ref={navRef}
        className="flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8"
      >
        <Link
          className="relative inline text-center font-mono text-2xl font-bold text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
          to="/"
          onClick={lightHaptic}
        >
          aashutosh.dev
        </Link>

        <div
          ref={navLinksRef}
          className="flex flex-row flex-wrap items-center justify-center gap-4 px-2 sm:justify-end sm:gap-6"
        >
          <Link
            to="/timeline"
            className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
            onClick={lightHaptic}
          >
            About
          </Link>
          <Link
            to="/blog"
            className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
            onClick={lightHaptic}
          >
            Blog
          </Link>
          <Link
            to="/work"
            className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
            onClick={lightHaptic}
          >
            Projects
          </Link>
          <Link
            to="/uses"
            className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
            onClick={lightHaptic}
          >
            Uses
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
