import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import gsap, { SteppedEase } from "gsap"
import TextPlugin from "gsap/TextPlugin"

import { SEO } from "@components"

gsap.registerPlugin(TextPlugin)

const commits = [
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
] as const

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

interface AnimatedDetailsProps {
  commit: (typeof commits)[number]
}

const AnimatedDetails: React.FC<AnimatedDetailsProps> = ({ commit }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef<boolean>(false)

  const handleToggle = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const details = detailsRef.current
    const content = contentRef.current

    if (!details || !content) return

    e.preventDefault()

    if (isAnimating.current) return
    isAnimating.current = true

    const isOpen = details.open

    if (!isOpen) {
      details.open = true
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        {
          height: "auto",

          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            isAnimating.current = false
          },
        }
      )
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          details.open = false
          isAnimating.current = false
        },
      })
    }
  }

  return (
    <details ref={detailsRef}>
      <summary
        onClick={handleToggle}
        className={clsx(
          "grid focus:outline-none focus-visible:ring-1 md:grid-cols-[80px,10px,1fr,100px] grid-cols-[80px,10px,1fr] rounded cursor-pointer items-center gap-x-2 py-1 px-2",
          {
            "focus-visible:ring-green-600 dark:focus-visible:ring-green-400":
              commit.type === "feat",
            "focus-visible:ring-yellow-600 dark:focus-visible:ring-yellow-400":
              commit.type === "ship",
            "focus-visible:ring-orange-600 dark:focus-visible:ring-orange-400":
              commit.type === "chore",
            "focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400":
              commit.type === "fix",
            "focus-visible:ring-purple-600 dark:focus-visible:ring-purple-400":
              commit.type === "init",
          }
        )}
      >
        <span className="text-zinc-500 w-14 shrink-0 text-xs sm:w-20 self-start md:self-auto md:mt-0 mt-1 sm:text-sm">
          {commit.hash}
        </span>
        <span
          className={clsx("relative text-lg shrink-0 leading-none self-start", {
            "text-green-600 dark:text-green-400": commit.type === "feat",
            "text-yellow-600 dark:text-yellow-400": commit.type === "ship",
            "text-orange-600 dark:text-orange-400": commit.type === "chore",
            "text-blue-600 dark:text-blue-400": commit.type === "fix",
            "text-purple-600 dark:text-purple-400": commit.type === "init",
          })}
        >
          ∗
        </span>
        <span className="flex items-start md:flex-row flex-col md:gap-2">
          <span
            className={clsx("shrink-0", {
              "text-green-600 dark:text-green-400": commit.type === "feat",
              "text-yellow-600 dark:text-yellow-400": commit.type === "ship",
              "text-orange-600 dark:text-orange-400": commit.type === "chore",
              "text-blue-600 dark:text-blue-400": commit.type === "fix",
              "text-purple-600 dark:text-purple-400": commit.type === "init",
            })}
          >
            {commit.type} ({commit.scope}):
          </span>
          <span>{commit.message}</span>
        </span>
        <span className="text-zinc-400 shrink-0 dark:text-zinc-600 text-xs col-start-3 md:mt-0 mt-1 md:col-start-4 md:text-right">
          {commit.date}
        </span>
      </summary>

      <div
        ref={contentRef}
        className="grid gap-2 pt-1 grid-cols-[80px,10px,1fr] md:grid-cols-[80px,10px,1fr,100px] overflow-hidden"
      >
        <div className="col-start-3 relative">
          {commit.details.map((detail) => (
            <p
              key={detail}
              className={clsx("text-sm", {
                "text-green-600 dark:text-green-400": detail.startsWith("+"),
                "text-red-600 dark:text-red-400": detail.startsWith("-"),
              })}
            >
              {detail}
            </p>
          ))}
        </div>
      </div>
    </details>
  )
}

export default TimelinePage
