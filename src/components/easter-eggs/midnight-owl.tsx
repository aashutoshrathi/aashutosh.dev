import React, { useEffect, useState } from "react"

const isOwlHour = () => {
  const h = new Date().getHours()
  return h >= 1 && h < 5
}

const MidnightOwl: React.FC = () => {
  const [hoot, setHoot] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(isOwlHour())
    const id = setInterval(() => setEnabled(isOwlHour()), 60000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const id = setInterval(() => {
      setHoot(true)
      setTimeout(() => setHoot(false), 900)
    }, 30000)
    return () => clearInterval(id)
  }, [enabled])

  if (!enabled) return null
  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-40 flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-sm text-white shadow-lg dark:bg-white dark:text-slate-900">
      <span className={`inline-block transition-transform ${hoot ? "scale-125" : "scale-100"}`}>🦉</span>
      <span className="hidden sm:inline">Owl says go to sleep - but hi, night owl.</span>
      <span className="sm:hidden">go to sleep?</span>
    </div>
  )
}

export default MidnightOwl
