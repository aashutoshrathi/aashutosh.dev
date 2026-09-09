import React, { useEffect, useRef, useState } from "react"

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

const KonamiMatrix: React.FC = () => {
  const [active, setActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const posRef = useRef(0)

  useEffect(() => {
    let idx = 0
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === KONAMI[idx].toLowerCase() || e.key === KONAMI[idx]) {
        idx += 1
        if (idx === KONAMI.length) {
          idx = 0
          setActive(true)
          setTimeout(() => setActive(false), 6000)
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (!active || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const cols = Math.floor(canvas.width / 14)
    const drops = Array(cols).fill(0)
    const chars = "ｱｱｼｭﾄｼｱｱｼﾄｼ0123456789aashutoshdev".split("")
    let raf = 0
    const draw = () => {
      ctx.fillStyle = "rgba(15,23,42,0.12)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#22c55e"
      ctx.font = "14px monospace"
      drops.forEach((y: number, x: number) => {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(ch, x * 14, y * 14)
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[x] = 0
        drops[x]++
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [active])

  if (!active) return null
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-90"
      aria-hidden="true"
    />
  )
}

export default KonamiMatrix
