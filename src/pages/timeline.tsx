import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import gsap, { SteppedEase } from "gsap"
import TextPlugin from "gsap/TextPlugin"

import { AnimatedDetails, SEO } from "@components"

import { Commit } from "../types"

gsap.registerPlugin(TextPlugin)

const commits: Commit[] = [
  {
    hash: "8a3f91",
    type: "feat",
    scope: "career",
    message: "deploying sales AI agents at Regie",
    details: [
      "+ Added NestJS",
      "+ Added TypeScript Strict Mode",
      "+ Optimized Salesforce API",
    ],
    date: "Current",
  },
  {
    hash: "7c2b14",
    type: "ship",
    scope: "oss",
    message: "release Testcase Generator v1.0",
    details: ["+ Python CLI", "+ Automated Inputs", "- Removed Manual Entry"],
    date: "2024",
  },
  {
    hash: "6d1a92",
    type: "chore",
    scope: "stack",
    message: "migrate core dependency to Rust",
    details: ["+ Memory Safety", "+ Blazingly Fast", "- Legacy Python Scripts"],
    date: "Experiment",
  },
  {
    hash: "5e4c83",
    type: "fix",
    scope: "web",
    message: "patch critical boredom with Git-Stalk-CLI",
    details: ["+ Node.js", "+ GitHub API", "+ Terminal UI"],
    date: "Side Project",
  },
  {
    hash: "3a8e60",
    type: "init",
    scope: "root",
    message: "initial commit aashutoshrathi",
    details: ["+ Location: India", "+ Role: Full Stack Engineer"],
    date: "Start",
  },
]

const TimelinePage: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null)
  const cursorRef = useRef<HTMLSpanElement | null>(null)
  const subHeaderRef = useRef<HTMLParagraphElement | null>(null)
  const commitsRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(headerRef.current, {
      text: {
        value: "$ git log --oneline --graph",
      },
      duration: 1,
      ease: "none",
    })
      .fromTo(
        cursorRef.current,
        { autoAlpha: 0, x: -20 },
        { autoAlpha: 1, duration: 1, repeat: -1, ease: SteppedEase.config(1) }
      )
      .from(
        subHeaderRef.current,
        {
          y: -10,
          opacity: 0,
          ease: "power1.out",
        },
        "<0.1"
      )

    if (commitsRef.current) {
      tl.from(commitsRef.current.children, {
        y: -12,
        opacity: 0,
        stagger: 0.04,
        ease: "power3.out",
        duration: 0.2,
      })
    }
  }, [])

  return (
    <>
      <SEO title="About" />

      <div className="text-zinc-800 dark:text-zinc-100 min-h-[calc(100vh-216px)] p-4 font-mono sm:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <header>
              <h2
                ref={headerRef}
                className="text-lg h-7 inline-block font-bold  text-zinc-800 dark:text-zinc-100 mb-2"
              />
              <span ref={cursorRef}>█</span>
              <p ref={subHeaderRef} className="text-zinc-500 text-sm">
                Timeline of milestones
              </p>
            </header>
          </div>

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
