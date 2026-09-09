import React, { useEffect } from "react"

import { Footer, Header, ScrollToTop } from "@components"
import ChessWidget from "./easter-eggs/chess-widget"
import ConsoleArt from "./easter-eggs/console-art"
import KonamiMatrix from "./easter-eggs/konami-matrix"
import MidnightOwl from "./easter-eggs/midnight-owl"
import SpotifyNow from "./easter-eggs/spotify-now"
import VimNavigator from "./easter-eggs/vim-navigator"
import { applyTheme, getStoredTheme } from "@utils"

export interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    /* Follow system theme only while the user hasn't picked one manually */
    const handleChange = (e: MediaQueryListEvent) => {
      if (getStoredTheme()) return
      applyTheme(e.matches ? "dark" : "light", false)
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return (
    <div className="m-0 flex min-h-screen w-full flex-col overflow-x-hidden">
      <ConsoleArt />
      <KonamiMatrix />
      <MidnightOwl />
      <VimNavigator />
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-grow px-3 sm:px-4 lg:px-6">
        {children}
        <div className="mt-12 grid gap-4 border-t border-dashed border-gray-200 pt-8 dark:border-slate-700">
          <p className="text-center font-mono text-xs uppercase tracking-widest text-gray-400">
            Local easter egg playground - kept: matrix, console, owl, spotify, chess, vim
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <SpotifyNow />
            <ChessWidget />
          </div>
          <p className="text-center text-xs text-gray-400">
            Try: Konami ↑↑↓↓←→←→BA, type :work, open console, wait for owl after 1am
          </p>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Layout
