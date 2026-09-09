import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"

const COMMANDS: Record<string, string> = {
  work: "/work",
  timeline: "/timeline",
  uses: "/uses",
  blog: "/blog",
  now: "/now",
  home: "/",
  matrix: "__matrix__",
}

const VimNavigator: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [cmd, setCmd] = useState("")

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ":" && !open && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape" && open) {
        setOpen(false)
        setCmd("")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const target = COMMANDS[cmd.trim()]
    if (target === "__matrix__") {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
      // trigger konami hint
    } else if (target) {
      navigate(target)
    }
    setOpen(false)
    setCmd("")
  }

  if (!open) return null
  return (
    <form onSubmit={submit} className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 border-t border-gray-200 bg-white px-4 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900">
      <span className="text-gray-500">:</span>
      <input
        autoFocus
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        placeholder="work | timeline | uses | blog | now | home"
        className="flex-1 bg-transparent outline-none"
      />
      <span className="text-xs text-gray-400">Enter to go, Esc to close</span>
    </form>
  )
}

export default VimNavigator
