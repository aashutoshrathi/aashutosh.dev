import React, { useRef } from "react"

import clsx from "clsx"
import gsap from "gsap"

import { Commit } from "../types"

interface AnimatedDetailsProps {
  commit: Commit
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

export default AnimatedDetails
