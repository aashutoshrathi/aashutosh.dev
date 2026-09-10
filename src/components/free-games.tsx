import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { FaExternalLinkAlt, FaGithub, FaPlay } from "react-icons/fa"

import { AnimatedLink } from "@components"
import { cachedFaviconPath, shouldReduceMotion } from "@utils"

interface Game {
  title: string
  tagline: string
  description: string
  href: string
  github?: string
  players: string
  time: string
  badge?: string
}

const GAMES: Game[] = [
  {
    title: "Marker & Mayhem",
    tagline: "one word, both teams, 90 seconds",
    description:
      "A Pictionary host that runs the whole game online - everyone joins from their own phone. Both teams draw the same word at the same time, and it keeps the clock, keeps the tally, and never shows the word to the guessers.",
    href: "https://mnm.aashutosh.dev",
    github: "https://github.com/aashutoshrathi/mnm",
    players: "4+ players",
    time: "∞ rounds",
    badge: "New",
  },
  {
    title: "Chupa Rustam",
    tagline: "one of you gets nothing",
    description:
      "Everyone gets the word. One of you gets nothing. A free online party game - bluff, deduce, and call out the rustam before they blend in.",
    href: "https://cr.aashutosh.dev",
    players: "3-10 players",
    time: "5 min / round",
  },
]

const gameIcon = (href: string): string | null => {
  try {
    return cachedFaviconPath(new URL(href).hostname)
  } catch {
    return null
  }
}

const FreeGames: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGSAP(() => {
    if (shouldReduceMotion() || !sectionRef.current) return
    /* fromTo, not from: `from` infers the end value from whatever opacity the
       card happens to have when its staggered tween initialises, which could
       leave the later cards stuck part-way faded. */
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".game-card"),
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="fun-heading"
      className="mt-12">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2
          id="fun-heading"
          className="text-2xl font-bold tracking-tight">
          Fun
        </h2>
        <span className="hidden text-sm text-gray-500 dark:text-gray-400 sm:inline">
          No installs · no sign-ups · just open and play
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {GAMES.map((game) => (
          <article
            key={game.title}
            className="game-card group flex flex-col overflow-hidden rounded-xl bg-gray-50 transition-all duration-200 hover:shadow-md dark:bg-slate-800">
            <div className="flex flex-grow flex-col p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {gameIcon(game.href) && (
                    <img
                      src={gameIcon(game.href) as string}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      className="size-10 rounded-lg bg-gray-100 object-contain p-1 dark:bg-slate-700"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold leading-tight">
                      {game.title}
                    </h3>
                    <p className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      {game.tagline}
                    </p>
                  </div>
                </div>
                {game.badge && (
                  <span className="shrink-0 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white dark:bg-blue-500">
                    {game.badge}
                  </span>
                )}
              </div>

              <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {game.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-slate-700 dark:text-gray-300">
                  {game.players}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-slate-700 dark:text-gray-300">
                  {game.time}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-slate-700 dark:text-gray-300">
                  Online
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={game.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-800">
                  <FaPlay className="size-3" aria-hidden="true" />
                  Play now
                  <FaExternalLinkAlt
                    className="size-3 opacity-70"
                    aria-hidden="true"
                  />
                </a>
                {game.github ? (
                  <AnimatedLink
                    href={game.github}
                    className="inline-flex items-center gap-1.5 text-sm font-medium"
                    aria-label={`${game.title} source code`}>
                    <FaGithub aria-hidden="true" />
                    Code
                  </AnimatedLink>
                ) : (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    Private source · free to play
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
        Built for house parties, long drives, and “one more round” energy. Works
        offline once loaded.
      </p>
    </section>
  )
}

export default FreeGames
