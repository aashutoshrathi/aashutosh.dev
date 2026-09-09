import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { StaticImage } from "gatsby-plugin-image"
import gsap, { SteppedEase } from "gsap"
import TextPlugin from "gsap/TextPlugin"

import { AnimatedDetails, AnimatedLink, SEO } from "@components"
import { shouldReduceMotion } from "@utils"

import { Commit } from "../types"

gsap.registerPlugin(TextPlugin)

const commits: Commit[] = [
  {
    hash: "9f3a12",
    type: "feat",
    scope: "career",
    message: "ship sales AI at Regie.ai — experience, APIs & dialers",
    details: [
      "+ NestJS + TypeScript Strict Mode across services",
      "+ Salesforce & Outreach API performance wins",
      "+ AI dialer experiences for GTM teams",
    ],
    date: "2024 — Now",
  },
  {
    hash: "8e1b44",
    type: "ship",
    scope: "games",
    message: "launch Marker & Mayhem and Chupa Rustam",
    details: [
      "+ Pass-the-phone, offline-first, no login party games",
      "+ mnm.aashutosh.dev — one word, both teams, 90s",
      "+ cr.aashutosh.dev — everyone gets it, one gets nothing",
    ],
    date: "2025 — 2026",
  },
  {
    hash: "8a3f91",
    type: "feat",
    scope: "toki",
    message: "build toki — macOS menu bar for Codex & Claude usage",
    details: [
      "+ Swift + Homebrew tap (toki.aashutosh.dev)",
      "+ Session tracking, budgets, remote control",
      "+ 21 stars, built for agentic workflows",
    ],
    date: "2025",
  },
  {
    hash: "7c2b14",
    type: "ship",
    scope: "oss",
    message: "maintain Testcase Generator, Insta Downloader, etc.",
    details: [
      "+ Testcase Generator — 110 stars, Python CLI for TCs",
      "+ Insta Downloader — 82 stars, 80k+ users",
      "+ git-profiler-bot, PruneR, Pick-a-Cherry",
    ],
    date: "2018 — Now",
  },
  {
    hash: "6d1a92",
    type: "chore",
    scope: "edge",
    message: "explore the edge — pratinidhi, gantavya, status-on-the-edge",
    details: [
      "+ Tiny edge proxies and status utilities",
      "+ TypeScript + Cloudflare Workers",
      "+ Fun because proxies are fun",
    ],
    date: "2023 — 2024",
  },
  {
    hash: "6a0c33",
    type: "feat",
    scope: "writing",
    message: "write nibbles.dev & blog — bite-sized tech notes",
    details: [
      "+ Weekly nibbles on tech, tooling, and shipping",
      "+ Long-form on aashutosh.dev/blog",
      "+ Release notes at Regie, naturally",
    ],
    date: "2022 — Now",
  },
  {
    hash: "5e4c83",
    type: "fix",
    scope: "web",
    message: "patch boredom — Git-Stalk-CLI, dcart, labper",
    details: [
      "+ Git-Stalk-CLI — 44 stars, stalk peers' contributions",
      "+ dcart — decentralized market prototype",
      "+ labper — Django lab management (24 stars)",
    ],
    date: "2019 — 2021",
  },
  {
    hash: "4b9d20",
    type: "feat",
    scope: "career",
    message: "early career — full-stack, automation, tooling",
    details: [
      "+ Focus: APIs, dev tooling, DX",
      "+ Bias to automate anything done twice",
      "+ Learning in public, shipping in small PRs",
    ],
    date: "2017 — 2021",
  },
  {
    hash: "3a8e60",
    type: "init",
    scope: "root",
    message: "initial commit — aashutosh.rathi in India",
    details: [
      "+ Location: Bengaluru, India",
      "+ Role: Software Engineer — automation connoisseur",
      "+ Interests: devtools, edge, tiny games, cafe hopping",
    ],
    date: "init",
  },
]

const TimelinePage: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null)
  const cursorRef = useRef<HTMLSpanElement | null>(null)
  const subHeaderRef = useRef<HTMLParagraphElement | null>(null)
  const commitsRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (shouldReduceMotion()) return
    const tl = gsap.timeline()

    if (heroRef.current) {
      tl.from(heroRef.current.children, {
        y: 12,
        opacity: 0,
        stagger: 0.06,
        ease: "power2.out",
        duration: 0.35,
      })
    }

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
      {/* About hero — human readable */}
      <div ref={heroRef} className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
          <div className="shrink-0">
            <StaticImage
              src="../images/square.png"
              alt="Aashutosh Rathi"
              placeholder="blurred"
              layout="constrained"
              width={160}
              height={160}
              className="rounded-xl"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Aashutosh Rathi
            </h1>
            <p className="mt-1 text-lg font-medium text-blue-600 dark:text-blue-400">
              Software Engineer · Automation connoisseur
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Bengaluru, India · building at{" "}
              <AnimatedLink href="https://regie.ai">Regie.ai</AnimatedLink> ·{" "}
              <AnimatedLink href="https://x.com/AashutoshRathi">
                @AashutoshRathi
              </AnimatedLink>
            </p>

            <div className="prose prose-slate mt-6 max-w-none text-[15px] leading-relaxed dark:prose-invert prose-a:font-semibold">
              <p>
                Hey — I&apos;m Aashutosh. I build tools for people who hate
                doing things manually (because I&apos;m definitely one of them).
                By day I&apos;m at <strong>Regie.ai</strong> making sales
                experiences, APIs, and dialers more human. By night I&apos;m
                usually automating something nobody asked to automate.
              </p>
              <p>
                I like tiny, well-crafted things: a useful CLI, a one-file
                edge proxy, a party game that works with one phone and no
                internet. Most of my side projects start as “what if I never
                had to do this again?” and end up as open source.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me cafe-hopping in
                Indiranagar with my better half, collecting cat memes, or
                writing <AnimatedLink href="https://nibbles.dev">nibbles</AnimatedLink> — bite-sized notes on
                shipping software.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Now
                </p>
                <p className="mt-1 text-sm leading-snug">
                  Sales AI at Regie.ai ·{" "}
                  <AnimatedLink href="https://toki.aashutosh.dev">toki</AnimatedLink> · two
                  party games at{" "}
                  <AnimatedLink href="https://mnm.aashutosh.dev">mnm</AnimatedLink> &amp;{" "}
                  <AnimatedLink href="https://cr.aashutosh.dev">cr</AnimatedLink>
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Open Source
                </p>
                <p className="mt-1 text-sm leading-snug">
                  400+ stars across tools people actually use — testcase-gen,
                  insta-downloader, toki, and more.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Principles
                </p>
                <p className="mt-1 text-sm leading-snug">
                  Automate twice, ship small PRs, keep the graph green, keep
                  the inbox (almost) zero.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://files.aashutosh.dev/resume.pdf#navpanes=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400">
                View Résumé
              </a>
              <AnimatedLink
                to="/work"
                className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold no-underline transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800">
                See projects →
              </AnimatedLink>
              <AnimatedLink
                to="/uses"
                className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold no-underline transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800">
                My setup
              </AnimatedLink>
            </div>
          </div>
        </div>
      </div>

      {/* Git log timeline — the fun, nerdy part */}
      <div className="min-h-[320px] p-4 font-mono text-zinc-800 dark:text-zinc-100 sm:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <header>
              <h2
                ref={headerRef}
                className="inline-block h-7 text-lg font-bold text-zinc-800 dark:text-zinc-100"
              />
              <span ref={cursorRef}>█</span>
              <p
                ref={subHeaderRef}
                className="animate-init -translate-y-[10px] text-sm text-zinc-500 opacity-0">
                A not-quite-serious commit history — expand any line for
                details. The real story is above.
              </p>
            </header>
          </div>

          <div ref={commitsRef} className="grid gap-2">
            {commits.map((commit) => (
              <AnimatedDetails key={commit.hash} commit={commit} />
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 font-sans text-sm leading-relaxed text-gray-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-gray-300">
            <p className="font-semibold">Want the short version?</p>
            <p className="mt-1">
              Full-stack engineer who loves DX, APIs, and tiny tools that save
              a minute every day. Comfortable across TypeScript, Python, Swift,
              and the edge. Open to quibbles on tech, life, and everything in
              between — say hi at{" "}
              <AnimatedLink href="https://x.com/AashutoshRathi">x.com/AashutoshRathi</AnimatedLink>{" "}
              or <AnimatedLink href="https://github.com/aashutoshrathi">GitHub</AnimatedLink>.
            </p>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              This page lives at <code className="rounded bg-white px-1 py-0.5 dark:bg-slate-900">/timeline</code>{" "}
              and is linked as “About” in the nav — because a timeline is the
              most honest about page for an engineer.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TimelinePage

export const Head = () => (
  <SEO
    title="About"
    description="About Aashutosh Rathi — software engineer at Regie.ai, maker of toki, Marker & Mayhem and Chupa Rustam. Automation, open source, and tiny delightful tools."
  />
)
