import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import gsap from "gsap"

import { SEO } from "@components"

interface Item {
  name: string
  description: string | React.ReactNode
  link?: string
}

const sections: Array<{ title: string; items: Item[] }> = [
  {
    title: "💻 Editor & Terminal",
    items: [
      {
        name: "VS Code Insiders",
        description: "Primary code editor with the latest features",
        link: "https://code.visualstudio.com/insiders/",
      },
      {
        name: "iTerm2",
        link: "https://iterm2.com/",
        description: (
          <>
            Terminal emulator for macOS with tmux integration ➜{" "}
            <OutboundLink
              href="https://iterm.aashutosh.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
            >
              my config
            </OutboundLink>
          </>
        ),
      },
      {
        name: "Warp",
        description:
          "Modern terminal for macOS, slowly moving all my workflows here",
        link: "https://www.warp.dev/",
      },
    ],
  },
  {
    title: "🖥️ Hardware",
    items: [
      {
        name: "MacBook Pro M3 Pro",
        description: "Personal machine - blazingly fast for development",
      },
      {
        name: "MacBook Pro (Space Black)",
        description: "Work machine - similar specs, sleek finish",
      },
    ],
  },
  {
    title: "📱 Devices",
    items: [
      {
        name: "Pixel 9 Pro",
        description: "Primary phone - clean Android experience",
        link: "https://store.google.com/product/pixel_9_pro",
      },
      {
        name: "Pixel Buds Pro 2",
        description: "Wireless earbuds with active noise cancellation",
        link: "https://store.google.com/product/pixel_buds_pro_2",
      },
      {
        name: "Fitbit Inspire 2",
        description: "Fitness tracker for health monitoring",
        link: "https://www.fitbit.com/global/us/products/trackers/inspire2",
      },
    ],
  },
  {
    title: "🛠️ Development Tools",
    items: [
      {
        name: "Docker",
        description: "Containerization for consistent dev environments",
        link: "https://www.docker.com/",
      },
      {
        name: "Postman",
        description: "API development and testing",
        link: "https://www.postman.com/",
      },
      {
        name: "Chrome DevTools",
        description: "Browser debugging and performance analysis",
        link: "https://developer.chrome.com/docs/devtools/",
      },
    ],
  },
  {
    title: "⚡ Productivity",
    items: [
      {
        name: "Raycast",
        description: "Blazingly fast launcher and productivity tool",
        link: "https://www.raycast.com/",
      },
      {
        name: "Obsidian",
        description: "Knowledge base and note-taking with markdown",
        link: "https://obsidian.md/",
      },
      {
        name: "Granola",
        description: "AI-powered note-taking for meetings",
        link: "https://www.granola.so/",
      },
    ],
  },
  {
    title: "🪑 Desk Setup",
    items: [
      {
        name: "Minimal Setup",
        description: "Just the laptop - portable and distraction-free workflow",
      },
      {
        name: "Portronics My Buddy K11",
        description: "Desk pad for comfortable workspace",
        link: "https://www.amazon.in/dp/B0CWS3V8QN",
      },
    ],
  },
]

const UsesPage: React.FC = () => {
  const usesRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const subHeadingRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(headingRef.current, {
      y: -12,
      opacity: 0,
      ease: "power3.out",
      duration: 0.25,
    })
      .from(subHeadingRef.current, {
        y: -12,
        opacity: 0,
        ease: "power2.out",
        duration: 0.2,
      })
      .from(usesRef.current?.querySelectorAll(".section")!, {
        y: -8,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.02,
        duration: 0.2,
      })
      .from(
        usesRef.current?.querySelectorAll(".section-item")!,
        {
          y: -8,
          opacity: 0,
          ease: "power2.out",
          stagger: 0.02,
          duration: 0.2,
        },
        "<0.1"
      )
  }, [])

  return (
    <>
      <SEO title="Uses" />
      <div ref={usesRef} className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-12">
          <h1 ref={headingRef} className="mb-4 text-4xl font-bold">
            Uses
          </h1>
          <p ref={subHeadingRef} className="text-lg leading-relaxed opacity-90">
            A living document of the tools, apps, and hardware I use daily to
            build software and stay productive.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="section mb-6 text-2xl font-bold">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.items.map((item, itemIdx) => (
                  <div className="section-item">
                    <div
                      key={itemIdx}
                      className="border-l-2 py-2 pl-4 transition-all duration-100 hover:border-l-4 border-blue-600 dark:border-blue-400"
                    >
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-1 relative font-semibold text-xl inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <h3 className="mb-1 text-xl font-semibold">
                          {item.name}
                        </h3>
                      )}
                      <p className="opacity-80">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="text-center pt-8 border-t mt-8 text-sm opacity-20">
          This page is updated periodically as my setup evolves.
        </p>
      </div>
    </>
  )
}

export default UsesPage
