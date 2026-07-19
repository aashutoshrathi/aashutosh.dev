import React, { useEffect, useState } from "react"

import { FaMoon, FaSun } from "react-icons/fa"

import { applyTheme, getCurrentTheme, lightHaptic, Theme } from "@utils"

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light")

  /* Read the theme applied by /theme.js once mounted (avoids SSR mismatch) */
  useEffect(() => {
    setTheme(getCurrentTheme())
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark"
    applyTheme(nextTheme)
    setTheme(nextTheme)
    lightHaptic()
  }

  const isDark = theme === "dark"
  const Icon = isDark ? FaSun : FaMoon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center rounded-lg p-1.5 text-lg text-blue-600 transition-colors duration-200 hover:text-blue-700 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-blue-300">
      <Icon />
    </button>
  )
}

export default ThemeToggle
