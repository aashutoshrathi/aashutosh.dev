import React, { useEffect, useState } from "react"

import { FaArrowUp } from "react-icons/fa"

import { shouldReduceMotion } from "@utils"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion() ? "auto" : "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="rounded-full bg-gray-800 p-4 text-white shadow-lg hover:bg-gray-700 focus:outline-none sm:p-3">
          <FaArrowUp />
        </button>
      )}
    </div>
  )
}

export default ScrollToTop
