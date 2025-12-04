import React from "react"

import { OutboundLink } from "gatsby-plugin-google-gtag"

import SEO from "@components/seo"

interface Item {
  name: string
  description: string | React.ReactNode
  link?: string
}

const UsesPage: React.FC = () => {
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
              Terminal emulator for macOS with tmux integration -{"> "}
              <OutboundLink
                href="https://iterm.aashutosh.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
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
          description:
            "Just the laptop - portable and distraction-free workflow",
        },
        {
          name: "Portronics My Buddy K11",
          description: "Desk pad for comfortable workspace",
          link: "https://www.amazon.in/dp/B0CWS3V8QN",
        },
      ],
    },
  ]

  return (
    <>
      <SEO title="Uses" />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-12">
          <h1
            className="mb-4 text-4xl font-bold"
            style={{ color: "var(--main-text-color)" }}
          >
            Uses
          </h1>
          <p
            className="text-lg leading-relaxed opacity-90"
            style={{ color: "var(--main-text-color)" }}
          >
            A living document of the tools, apps, and hardware I use daily to
            build software and stay productive.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2
                className="mb-6 text-2xl font-bold"
                style={{ color: "var(--main-text-color)" }}
              >
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="border-l-2 py-2 pl-4 transition-all duration-200 hover:border-l-4"
                    style={{ borderColor: "var(--link-color)" }}
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-1 inline-block text-xl font-semibold hover:underline"
                        style={{ color: "var(--link-color)" }}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <h3
                        className="mb-1 text-xl font-semibold"
                        style={{ color: "var(--main-text-color)" }}
                      >
                        {item.name}
                      </h3>
                    )}
                    <p
                      className="opacity-80"
                      style={{ color: "var(--main-text-color)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div
          className="mt-16 border-t pt-8"
          style={{ borderColor: "var(--main-text-color)", opacity: 0.2 }}
        >
          <p
            className="text-center text-sm opacity-80"
            style={{ color: "var(--main-text-color)" }}
          >
            This page is updated periodically as my setup evolves.
          </p>
        </div>
      </div>
    </>
  )
}

export default UsesPage
