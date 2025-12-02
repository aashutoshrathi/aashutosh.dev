import React, { useState, useEffect } from "react"
import Icon from "./icon"

const Footer: React.FC = () => {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentDrink, setCurrentDrink] = useState(0)
  const words = ["code", "gemini", "claude"]
  const drinks = ["coffee", "chaas"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDrink((prev) => (prev + 1) % drinks.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="p-8 text-center font-mono">
      <div id="social" className="text-center [&_a]:m-1 [&_a]:text-[xx-large] [&_a]:inline-block [&_a]:relative [&_a_svg]:transition-all [&_a_svg]:duration-300 [&_a_svg]:ease-[cubic-bezier(0.4,0,0.2,1)] [&_a_svg]:drop-shadow-[0_0_0px_transparent] hover:[&_a_svg]:[fill:var(--link-hover-color)] hover:[&_a_svg]:drop-shadow-[0_0_8px_var(--link-hover-color)] hover:[&_a_svg]:rotate-[-5deg] hover:[&_a_svg]:scale-105">
        <Icon url="https://github.com/aashutoshrathi" label="GitHub" />
        <Icon url="https://x.com/AashutoshRathi" label="Twitter" />
        <Icon
          url="https://stackoverflow.com/users/7326407/aashutosh-rathi?tab=profile"
          label="StackOverflow"
        />
        <Icon
          url="https://dev.to/aashutoshrathi"
          label="Dev"
          viewBox="0 0 448 512"
        />
        <Icon url="https://linkedin.com/in/aashutoshrathi/" label="LinkedIn" />
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {">"} built with{" "}
        <span className="inline-block min-w-[3rem] text-left animate-pulse">
          {drinks[currentDrink]}
        </span> and{" "}
        <span className="inline-block min-w-[4rem] text-left animate-pulse">
          {words[currentWord]}
        </span>
      </p>
    </footer>
  )
}

export default Footer
