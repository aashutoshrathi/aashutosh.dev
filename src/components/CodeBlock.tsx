import React, { useState } from "react"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    // Extract text content from children
    const getTextContent = (node: any): string => {
      if (typeof node === 'string') return node
      if (Array.isArray(node)) return node.map(getTextContent).join('')
      if (node?.props?.children) return getTextContent(node.props.children)
      return ''
    }

    const code = getTextContent(children)
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const language = className?.replace(/language-/, "") || "text"

  return (
    <div className="relative group my-4">
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        {language !== "text" && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono px-2 py-1 bg-zinc-800/80 dark:bg-zinc-900/80 rounded backdrop-blur-sm">
            {language}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-zinc-700 hover:bg-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs rounded font-mono shadow-lg"
          aria-label="Copy code"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <pre className="!mt-0 !mb-0">
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

export default CodeBlock
