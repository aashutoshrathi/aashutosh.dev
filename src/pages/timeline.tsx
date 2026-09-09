import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import gsap, { SteppedEase } from "gsap"
import TextPlugin from "gsap/TextPlugin"

import { AnimatedDetails, SEO } from "@components"
import { shouldReduceMotion } from "@utils"

import { Commit } from "../types"

gsap.registerPlugin(TextPlugin)

const commits: Commit[] = [
  {
    hash: "a1b2c3",
    type: "feat",
    scope: "career",
    message: "Technical Lead at Regie.ai - AI-first SEP",
    details: [
      "+ Feb 2025 - Present, Bengaluru",
      "+ TypeScript / Next / AWS / MCP / Salesforce",
      "+ Lead Integration & Dialer teams",
    ],
    date: "2025 - Present",
  },
  {
    hash: "b2c3d4",
    type: "ship",
    scope: "stackr",
    message: "Lead SE at Stackr Labs - rollup SDK",
    details: [
      "+ Feb 2024 - Dec 2024",
      "+ TypeScript / Go / Rust / AWS / Wasm",
      "+ SDK for rollups + zkVM benchmarking",
    ],
    date: "2024",
  },
  {
    hash: "c3d4e5",
    type: "feat",
    scope: "regie",
    message: "Senior SE at Regie.ai - Autopilot & AI Toolkit",
    details: [
      "+ Dec 2021 - Feb 2024",
      "+ Autopilot flagship, CMS, live collaboration",
      "+ Browser extension for inboxes & sales platforms",
    ],
    date: "2021 - 2024",
  },
  {
    hash: "d4e5f6",
    type: "feat",
    scope: "jio",
    message: "SDE at Jio - SMS & t.jio",
    details: [
      "+ Aug 2020 - Dec 2021, Mumbai",
      "+ NodeJS / Go / React / SMPP / Azure",
      "+ Scalable SMS API + URL shortener dashboard",
    ],
    date: "2020 - 2021",
  },
  {
    hash: "e5f6a7",
    type: "init",
    scope: "edu",
    message: "B.Tech CS at IIIT Vadodara",
    details: [
      "+ 2016 - 2020, CPI 8.92/10",
      "+ DSA, OS, Networks, Distributed Systems, AI",
      "+ OpenClassrooms Frontend Path 2019",
    ],
    date: "2016 - 2020",
  },
  {
    hash: "f6a7b8",
    type: "ship",
    scope: "games",
    message: "launch Marker & Mayhem and Chupa Rustam",
    details: [
      "+ Online multiplayer, no login party games",
      "+ mnm.aashutosh.dev - one word, both teams, 90s",
      "+ cr.aashutosh.dev - everyone gets it, one gets nothing",
    ],
    date: "2025 - 2026",
  },
  {
    hash: "a7b8c9",
    type: "feat",
    scope: "toki",
    message: "build toki - menu bar for Codex & Claude usage",
    details: [
      "+ Swift + Homebrew tap (toki.aashutosh.dev)",
      "+ Session tracking, budgets, remote control",
    ],
    date: "2025",
  },
  {
    hash: "b8c9d0",
    type: "fix",
    scope: "oss",
    message: "patch critical boredom with Git-Stalk-CLI",
    details: ["+ Node.js", "+ GitHub API", "+ Terminal UI"],
    date: "Side Project",
  },
]

const TimelinePage: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null)
  const cursorRef = useRef<HTMLSpanElement | null>(null)
  const subHeaderRef = useRef<HTMLParagraphElement | null>(null)
  const commitsRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (shouldReduceMotion()) return
    const tl = gsap.timeline()

    tl.to(headerRef.current, {
      text: {
        value: "$ git log --oneline --graph",
      },
      duration: 0.6,
      ease: "none",
    })
      .fromTo(
        cursorRef.current,
        { autoAlpha: 0, x: -20 },
        { autoAlpha: 1, duration: 1, repeat: -1, ease: SteppedEase.config(1) }
      )
      .to(
        subHeaderRef.current,
        {
          y: 0,
          opacity: 1,
          ease: "power1.out",
        },
        "<0.1"
      )

    if (commitsRef.current) {
      tl.from(commitsRef.current.children, {
        y: -10,
        opacity: 0,
        stagger: 0.03,
        ease: "power3.out",
        duration: 0.25,
      })
    }
  }, [])

  return (
    <>
      <div className="min-h-[calc(100vh-216px)] p-4 font-mono text-zinc-800 dark:text-zinc-100 sm:p-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8">
            <div className="flex flex-wrap items-baseline gap-2">
              <h2
                ref={headerRef}
                className="min-h-7 text-lg font-bold leading-8 text-zinc-800 dark:text-zinc-100"
              />
              <span
                ref={cursorRef}
                aria-hidden="true"
                className="text-lg font-bold leading-8">
                █
              </span>
            </div>
            <p
              ref={subHeaderRef}
              className="animate-init mt-2 -translate-y-2 text-sm leading-relaxed text-zinc-500 opacity-0">
              Timeline of milestones - expand any line for details.
            </p>
          </header>

          <div ref={commitsRef} className="grid gap-2">
            {commits.map((commit) => (
              <AnimatedDetails key={commit.hash} commit={commit} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TimelinePage

export const Head = () => (
  <SEO
    title="Timeline"
    description="Timeline of Aashutosh Rathi - Technical Lead at Regie.ai, ex Stackr, Jio, IIIT Vadodara. Maker of toki, Marker & Mayhem and Chupa Rustam."
  />
)
