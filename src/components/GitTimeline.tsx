import React, { useState } from "react"

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
    message: "deploy AI engineering architecture at Regie.ai",
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

const getTypeColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    feat: "text-green-400",
    ship: "text-green-400",
    fix: "text-blue-400",
    chore: "text-zinc-400",
    docs: "text-yellow-400",
    init: "text-purple-400"
  }
  return colors[type] || "text-zinc-400"
}

const GitTimeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const formatDetails = (details: string) => {
    return details.split('\n').map((line, i) => {
      const isAddition = line.startsWith('+')
      const isDeletion = line.startsWith('-')
      const color = isAddition ? 'text-green-400' : isDeletion ? 'text-red-400' : 'text-zinc-400'
      return (
        <div key={i} className={`${color} font-mono text-sm`}>
          {line}
        </div>
      )
    })
  }

  return (
    <div className="bg-slate-950 text-zinc-100 font-mono p-4 sm:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">$ git log --oneline --graph</h2>
          <p className="text-zinc-500 text-sm">Interactive timeline of milestones</p>
        </div>

        <div className="space-y-0">
          {commits.map((commit, index) => (
            <div key={index} className="relative">
              {/* Main commit row */}
              <div
                onClick={() => toggleExpand(index)}
                className="flex items-start gap-3 sm:gap-4 cursor-pointer hover:bg-slate-900/50 transition-colors p-2 -mx-2 rounded group"
              >
                {/* Hash */}
                <div className="text-zinc-500 text-sm shrink-0 w-16 sm:w-20">
                  {commit.hash}
                </div>

                {/* Graph Column */}
                <div className="relative flex flex-col items-center shrink-0 w-6">
                  {/* Vertical line from previous commit */}
                  {index > 0 && (
                    <div className="absolute bottom-full w-0.5 bg-zinc-700 h-2" />
                  )}

                  {/* Commit node */}
                  <div className={`${getTypeColor(commit.type)} text-lg z-10 leading-none`}>
                    *
                  </div>

                  {/* Vertical line to next commit - extends based on content height */}
                  {index < commits.length - 1 && (
                    <div className="absolute top-0 w-0.5 bg-zinc-700 h-full mt-4" />
                  )}
                </div>

                {/* Message */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className={`${getTypeColor(commit.type)} font-semibold`}>
                      {commit.type}
                    </span>
                    <span className="text-zinc-500">({commit.scope}):</span>
                    <span className="text-zinc-100 break-words">{commit.message}</span>
                    <span className="text-zinc-600 text-xs ml-auto shrink-0">{commit.date}</span>
                  </div>
                </div>
              </div>

              {/* Expanded diff view */}
              {expandedIndex === index && (
                <div className="ml-[5.5rem] sm:ml-[7.5rem] mt-2 mb-4 border-l-2 border-zinc-700 pl-4 py-2 bg-slate-900/30 rounded-r">
                  <div className="text-zinc-500 text-xs mb-2">Changes:</div>
                  {formatDetails(commit.details)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Terminal prompt at the end */}
        <div className="mt-8 text-zinc-500 flex items-center gap-2">
          <span className="text-green-400">→</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  )
}

export default GitTimeline
