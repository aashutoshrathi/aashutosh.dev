import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { AnimatedLink, SEO } from "@components"
import { shouldReduceMotion } from "@utils"

const LAST_UPDATED = "July 2026"

interface NowSection {
  title: string
  items: React.ReactNode[]
}

const NowPage: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (shouldReduceMotion()) return

    const tl = gsap.timeline()

    tl.to(headingRef.current, {
      y: 0,
      opacity: 1,
      ease: "power3.out",
      duration: 0.25,
    })

    if (contentRef.current) {
      tl.from(contentRef.current.children, {
        y: -8,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.05,
        duration: 0.25,
      })
    }
  }, [])

  const sections: NowSection[] = [
    {
      title: "Working",
      items: [
        <>
          Making experience, APIs and dials better at{" "}
          <AnimatedLink href="https://go.regie.ai">Regie.ai</AnimatedLink>.
        </>,
      ],
    },
    {
      title: "Building",
      items: [
        <>
          <AnimatedLink href="https://github.com/aashutoshrathi/toki">
            toki
          </AnimatedLink>{" "}
          - a native macOS menu bar app to keep an eye on Claude Code and Codex
          usage (yes, there's a{" "}
          <AnimatedLink href="https://github.com/aashutoshrathi/homebrew-tap">
            Homebrew tap
          </AnimatedLink>
          ).
        </>,
        <>
          Tiny edge experiments like{" "}
          <AnimatedLink href="https://github.com/aashutoshrathi/pratinidhi">
            pratinidhi
          </AnimatedLink>{" "}
          - because proxies are fun.
        </>,
      ],
    },
    {
      title: "Writing",
      items: [
        <>
          Nibbles on{" "}
          <AnimatedLink href="https://nibbles.dev">nibbles.dev</AnimatedLink>{" "}
          and the occasional longer post on{" "}
          <AnimatedLink to="/blog">this blog</AnimatedLink>.
        </>,
      ],
    },
    {
      title: "Chasing",
      items: [
        "Inbox zero (perpetually), fewer manual chores, more automation.",
      ],
    },
  ]

  return (
    <>
      <SEO
        title="Now"
        description="What Aashutosh is up to right now - work, side projects and writing."
      />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-12">
          <h1 ref={headingRef} className="animate-init mb-4 text-4xl font-bold opacity-0 -translate-y-3">
            Now
          </h1>
          <p className="text-lg leading-relaxed opacity-90">
            What I&apos;m up to these days. Inspired by{" "}
            <AnimatedLink href="https://nownownow.com/about">
              nownownow.com
            </AnimatedLink>
            .
          </p>
        </div>

        <div ref={contentRef} className="space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
              <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          Last updated: {LAST_UPDATED}
        </p>
      </div>
    </>
  )
}

export default NowPage
