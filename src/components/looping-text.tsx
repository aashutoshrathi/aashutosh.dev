import React, { useRef, useState } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { shouldReduceMotion } from "@utils"

interface LoopingTextProps {
  texts: string[]
  duration: number
}

const LoopingText = ({ texts, duration }: LoopingTextProps) => {
  const [activeTextIndex, setActiveTextIndex] = useState(0)

  const textsRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (shouldReduceMotion()) return
      if (!textsRef.current) return

      const tl = gsap.timeline()

      tl.fromTo(
        ".char",
        { y: "100%" },
        {
          y: 0,
          ease: "circ.out",
          duration: 0.7,
          stagger: 0.05,
        }
      )
        .to(
          ".char",
          {
            y: "-100%",
            ease: "circ.in",
            duration: 0.35,
            stagger: 0.05,
            onComplete: () => {
              setActiveTextIndex(
                (currentIndex) => (currentIndex + 1) % texts.length
              )
            },
          },
          `+=${duration}`
        )
    },
    { scope: textsRef, dependencies: [activeTextIndex] }
  )

  return (
    <div ref={textsRef} className="inline-block overflow-hidden">
      {texts[activeTextIndex].split("").map((char, idx) => (
        <span key={idx} className="char inline-block">
          {char}
        </span>
      ))}
    </div>
  )
}

export default LoopingText
