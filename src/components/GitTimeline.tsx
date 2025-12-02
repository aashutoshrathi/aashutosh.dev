import React, { useState } from "react"
import { useTheme } from "../context/ThemeContext"

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
    message: "Deploying Sales Agents at Regie",
    details: "+ Added NestJS\n+ Added TypeScript Strict Mode\n+ Optimized Salesforce API",
    date: "Current"
  },
  {
    hash: "7c2b14",
    type: "ship",
    scope: "oss",
    message: "release Testcase Generator v1.0",
    details: "+ Python CLI\n+ Automated Inputs\n- Removed Manual Entry",
    date: "2024"
  },
  {
    hash: "6d1a92",
    type: "chore",
    scope: "stack",
    message: "migrate core dependency to Rust",
    details: "+ Memory Safety\n+ Blazingly Fast\n- Legacy Python Scripts",
    date: "Experiment"
  },
  {
    hash: "5e4c83",
    type: "fix",
    scope: "web",
    message: "patch critical boredom with Git-Stalk-CLI",
    details: "+ Node.js\n+ GitHub API\n+ Terminal UI",
    date: "Side Project"
  },
  {
    hash: "3a8e60",
    type: "init",
    scope: "root",
    message: "initial commit aashutoshrathi",
    details: "+ Location: India\n+ Role: Full Stack Engineer",
    date: "Start"
  }
]

const GitTimeline: React.FC = () => {
  const { theme } = useTheme()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
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
      codeBg: "bg-zinc-100/30"
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
      codeBg: "bg-slate-900/30"
    }
  }

  const c = colors[theme]

  const getTypeColor = (type: string): string => {
    const typeColors: { [key: string]: string } = {
      feat: c.green,
      ship: c.green,
      fix: c.blue,
      chore: c.textLight,
      docs: c.yellow,
      init: c.purple
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
    <div className={`${c.text} font-mono p-4 sm:p-8 min-h-screen`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className={`text-lg font-bold ${c.text} mb-2`}>
            $ git log --oneline --graph
          </h2>
          <p className={`${c.textLight} text-sm`}>
            Timeline of milestones
          </p>
        </div>

        <div className="space-y-0">
          {commits.map((commit, index) => (
            <div key={index} className="relative">
              <div
                onClick={() => toggleExpand(index)}
                className={`flex items-start gap-3 cursor-pointer ${c.highlight} transition-colors p-2 -mx-2 rounded group`}
              >
                {/* Hash */}
                <div className={`${c.textLight} text-xs sm:text-sm shrink-0 w-14 sm:w-20`}>
                  {commit.hash}
                </div>

                {/* Graph Column */}
                <div className="relative flex flex-col items-center shrink-0 w-6">
                  {/* Vertical line from previous commit */}
                  {index > 0 && (
                    <div
                      className={`absolute bottom-full w-0.5 ${c.line} h-2`}
                    />
                  )}

                  <div
                    className={`${getTypeColor(
                      commit.type
                    )} text-lg z-10 leading-none`}
                  >
                    *
                  </div>

                  {/* Vertical line to next commit - extends based on content height */}
                  {index < commits.length - 1 && (
                    <div
                      className={`absolute top-0 w-0.5 ${c.line} h-full mt-4`}
                    />
                  )}
                </div>

                {/* Message */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-1 sm:gap-2">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className={`${getTypeColor(commit.type)} font-semibold text-sm sm:text-base`}>
                        {commit.type}
                      </span>
                      <span className={`${c.textLight} text-sm sm:text-base`}>({commit.scope}):</span>
                      <span className={`${c.text} break-words text-sm sm:text-base`}>
                        {commit.message}
                      </span>
                    </div>
                    <span
                      className={`${c.textLighter} text-xs sm:ml-auto`}
                    >
                      {commit.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded diff view */}
              {expandedIndex === index && (
                <div
                  className={`ml-[4.75rem] sm:ml-[7.5rem] mt-2 mb-4 border-l-2 ${c.border} pl-3 sm:pl-4 py-2 ${c.codeBg} rounded-r`}
                >
                  <div className={`${c.textLight} text-xs mb-2`}>
                    Changes:
                  </div>
                  {formatDetails(commit.details)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Terminal prompt at the end */}
        <div className={`mt-8 ${c.textLight} flex items-center gap-2`}>
          <span className={`${c.green}`}>→</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  )
}

export default GitTimeline
