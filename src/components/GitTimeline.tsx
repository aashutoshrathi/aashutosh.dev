import React, { useState } from "react"

import { useTheme } from "../context/ThemeContext"
import { lightHaptic } from "../utils/haptic"

interface Commit {
  hash: string
  type: string
  scope: string
  message: string
  details: string
  date: string
}

const commits: Commit[] = [
  {
    hash: "8a3f91",
    type: "feat",
    scope: "career",
    message: "deploying sales AI agents at Regie",
    details:
      "+ Added NestJS\n+ Added TypeScript Strict Mode\n+ Optimized Salesforce API",
    date: "Current",
  },
  {
    hash: "7c2b14",
    type: "ship",
    scope: "oss",
    message: "release Testcase Generator v1.0",
    details: "+ Python CLI\n+ Automated Inputs\n- Removed Manual Entry",
    date: "2024",
  },
  {
    hash: "6d1a92",
    type: "chore",
    scope: "stack",
    message: "migrate core dependency to Rust",
    details: "+ Memory Safety\n+ Blazingly Fast\n- Legacy Python Scripts",
    date: "Experiment",
  },
  {
    hash: "5e4c83",
    type: "fix",
    scope: "web",
    message: "patch critical boredom with Git-Stalk-CLI",
    details: "+ Node.js\n+ GitHub API\n+ Terminal UI",
    date: "Side Project",
  },
  {
    hash: "3a8e60",
    type: "init",
    scope: "root",
    message: "initial commit aashutoshrathi",
    details: "+ Location: India\n+ Role: Full Stack Engineer",
    date: "Start",
  },
]

const GitTimeline: React.FC = () => {
  const { theme } = useTheme()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    lightHaptic()
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const colors = {
    light: {
      bg: "bg-white",
      text: "text-zinc-800",
      textLight: "text-zinc-500",
      textLighter: "text-zinc-400",
      border: "border-zinc-200",
      highlight: "hover:bg-zinc-100/50",
      green: "text-green-600",
      blue: "text-blue-600",
      yellow: "text-yellow-600",
      purple: "text-purple-600",
      red: "text-red-600",
      line: "bg-zinc-300",
      codeBg: "bg-zinc-100/30",
    },
    dark: {
      bg: "bg-slate-950",
      text: "text-zinc-100",
      textLight: "text-zinc-500",
      textLighter: "text-zinc-600",
      border: "border-zinc-700",
      highlight: "hover:bg-slate-900/50",
      green: "text-green-400",
      blue: "text-blue-400",
      yellow: "text-yellow-400",
      purple: "text-purple-400",
      red: "text-red-400",
      line: "bg-zinc-700",
      codeBg: "bg-slate-900/30",
    },
  }

  const c = colors[theme]

  const getTypeColor = (type: string): string => {
    const typeColors: { [key: string]: string } = {
      feat: c.green,
      ship: c.green,
      fix: c.blue,
      chore: c.textLight,
      docs: c.yellow,
      init: c.purple,
    }
    return typeColors[type] || c.textLight
  }

  const formatDetails = (details: string) => {
    return details.split("\n").map((line, i) => {
      const isAddition = line.startsWith("+")
      const isDeletion = line.startsWith("-")
      const color = isAddition ? c.green : isDeletion ? c.red : c.textLight
      return (
        <div key={i} className={`${color} font-mono text-sm`}>
          {line}
        </div>
      )
    })
  }

  return (
    <div className={`${c.text} min-h-screen p-4 font-mono sm:p-8`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className={`text-lg font-bold ${c.text} mb-2`}>
            $ git log --oneline --graph
          </h2>
          <p className={`${c.textLight} text-sm`}>Timeline of milestones</p>
        </div>

        <div className="space-y-0">
          {commits.map((commit, index) => (
            <div key={index} className="relative">
              <div
                onClick={() => toggleExpand(index)}
                className={`flex cursor-pointer items-start gap-3 ${c.highlight} group -mx-2 rounded p-2 transition-colors`}
              >
                {/* Hash */}
                <div
                  className={`${c.textLight} w-14 shrink-0 text-xs sm:w-20 sm:text-sm`}
                >
                  {commit.hash}
                </div>

                {/* Graph Column */}
                <div className="relative flex w-6 shrink-0 flex-col items-center">
                  {/* Vertical line from previous commit */}
                  {index > 0 && (
                    <div
                      className={`absolute bottom-full w-0.5 ${c.line} h-2`}
                    />
                  )}

                  <div
                    className={`${getTypeColor(
                      commit.type
                    )} z-10 text-lg leading-none`}
                  >
                    *
                  </div>

                  {/* Vertical line to next commit - extends based on content height */}
                  {index < commits.length - 1 && (
                    <div
                      className={`absolute top-0 w-0.5 ${c.line} mt-4 h-full`}
                    />
                  )}
                </div>

                {/* Message */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-2">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span
                        className={`${getTypeColor(
                          commit.type
                        )} text-sm font-semibold sm:text-base`}
                      >
                        {commit.type}
                      </span>
                      <span className={`${c.textLight} text-sm sm:text-base`}>
                        ({commit.scope}):
                      </span>
                      <span
                        className={`${c.text} break-words text-sm sm:text-base`}
                      >
                        {commit.message}
                      </span>
                    </div>
                    <span className={`${c.textLighter} text-xs sm:ml-auto`}>
                      {commit.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded diff view */}
              {expandedIndex === index && (
                <div
                  className={`mb-4 ml-[4.75rem] mt-2 border-l-2 sm:ml-[7.5rem] ${c.border} py-2 pl-3 sm:pl-4 ${c.codeBg} rounded-r`}
                >
                  <div className={`${c.textLight} mb-2 text-xs`}>Changes:</div>
                  {formatDetails(commit.details)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`mt-8 ${c.textLight} flex items-center gap-2`}>
          <span className={`${c.green}`}>→</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  )
}

export default GitTimeline
