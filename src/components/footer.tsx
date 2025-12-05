import React, { useRef, useState } from "react"

import { useGSAP } from "@gsap/react"
import { useLocation } from "@reach/router"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import gsap from "gsap"
import { IconType } from "react-icons"
import {
  FaDev,
  FaGithub,
  FaLinkedin,
  FaStackOverflow,
  FaTwitter,
} from "react-icons/fa"

const Footer: React.FC = () => {
  const location = useLocation()

  const emotions = ["love", "sweat", "tears"]
  const agents = ["code", "gemini", "claude"]
  const drinks = ["coffee", "chhaas"]

  const socialsRef = useRef<HTMLDivElement | null>(null)
  const builtWithRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    const delay = location.pathname === "/" ? 2 : 0.25

    if (socialsRef.current) {
      tl.from(socialsRef.current.children, {
        y: 12,
        opacity: 0,
        stagger: 0.07,
        ease: "power3.out",
        delay,
      })
    }

    tl.from(builtWithRef.current, {
      y: 12,
      opacity: 0,
      ease: "power3.out",
    })
  }, [])

  return (
    <footer className="p-8 text-center font-mono">
      <div
        ref={socialsRef}
        className="text-center flex items-center justify-center gap-2"
      >
        <SocialIcon
          link="https://github.com/aashutoshrathi"
          title="GitHub"
          icon={FaGithub}
        />
        <SocialIcon
          link="https://x.com/AashutoshRathi"
          title="X"
          icon={FaTwitter}
        />
        <SocialIcon
          link="https://stackoverflow.com/users/7326407/aashutosh-rathi?tab=profile"
          title="Stack Overflow"
          icon={FaStackOverflow}
        />
        <SocialIcon
          link="https://dev.to/aashutoshrathi"
          title="Dev"
          icon={FaDev}
        />
        <SocialIcon
          link="https://linkedin.com/in/aashutoshrathi"
          title="LinkedIn"
          icon={FaLinkedin}
        />
      </div>
      <p
        ref={builtWithRef}
        className="mt-2 flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400"
      >
        <span className="mr-1 inline-block">{">"} built with </span>
        <span className="inline-block h-5 min-w-11 text-right">
          <LoopingText texts={emotions} duration={2.75} />
        </span>
        <span className="mr-0.5 inline-block">,</span>
        <span className="mr-1 inline-block h-5 min-w-14">
          <LoopingText texts={drinks} duration={2} />
        </span>
        <span className="mr-1 inline-block">and </span>
        <span className="inline-block h-5 min-w-14 text-left">
          <LoopingText texts={agents} duration={3.5} />
        </span>
      </p>
    </footer>
  )
}

interface SocialIconProps {
  link: string
  title: string
  icon: IconType
}

const SocialIcon = ({ link, title, icon }: SocialIconProps) => {
  const Icon = icon

  const iconRef = useRef<HTMLSpanElement | null>(null)

  return (
    <span ref={iconRef} className="inline-block">
      <OutboundLink
        href={link}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block p-1 text-3xl rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-900 dark:focus-visible:ring-white"
      >
        <Icon />
      </OutboundLink>
    </span>
  )
}

interface LoopingTextProps {
  texts: string[]
  duration: number
}

const LoopingText = ({ texts, duration }: LoopingTextProps) => {
  const [activeTextIndex, setActiveTextIndex] = useState(-1)

  const textsRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (!textsRef.current) return

      const tl = gsap.timeline()

      tl.set(".char", { y: activeTextIndex === -1 ? 0 : "100%" })
        .fromTo(
          ".char",
          {
            y: activeTextIndex === -1 ? 0 : "100%",
          },
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
              setActiveTextIndex((currentIndex) => {
                if (currentIndex === -1) {
                  return 1
                }
                return (currentIndex + 1) % texts.length
              })
            },
          },
          `+=${duration}`
        )
    },
    { scope: textsRef, dependencies: [activeTextIndex] }
  )

  const currentActiveIndex = activeTextIndex === -1 ? 0 : activeTextIndex

  return (
    <div ref={textsRef} className="inline-block overflow-hidden">
      {texts[currentActiveIndex].split("").map((char, idx) => (
        <span key={idx} className="char inline-block">
          {char}
        </span>
      ))}
    </div>
  )
}

export default Footer
