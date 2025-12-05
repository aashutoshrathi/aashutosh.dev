import React, { useState } from "react"

import { mediumHaptic } from "@utils"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    mediumHaptic()
    // Extract text content from children
    const getTextContent = (node: any): string => {
      if (typeof node === "string") return node
      if (Array.isArray(node)) return node.map(getTextContent).join("")
      if (node?.props?.children) return getTextContent(node.props.children)
      return ""
    }

    const code = getTextContent(children)
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const language = className?.replace(/language-/, "") || "text"

  return (
    <div className="group relative my-4">
      <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
        {language !== "text" && (
          <span className="rounded bg-zinc-800/80 px-2 py-1 font-mono text-xs text-zinc-400 backdrop-blur-sm dark:bg-zinc-900/80 dark:text-zinc-500">
            {language}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="rounded bg-zinc-700 px-3 py-1 font-mono text-xs text-white opacity-0 shadow-lg transition-opacity hover:bg-zinc-600 group-hover:opacity-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="Copy code"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <pre className="!mb-0 !mt-0">
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

export default CodeBlock
