import React, { useRef, useState } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "usehooks-ts"

import { shouldReduceMotion } from "@utils"

import { Project } from "../types"
import ProjectCard from "./project-card"

const FEATURED_PROJECTS: Project[] = [
  {
    id: 1277131490,
    name: "toki",
    description:
      "Native macOS menu bar app for tracking Claude Code and Codex account usage.",
    language: "Swift",
    html_url: "https://github.com/aashutoshrathi/toki",
    homepage: "http://toki.aashutosh.dev/",
    stargazers_count: 5,
  },
  {
    id: 105375545,
    name: "Testcase-Generator",
    description:
      "⚡️ Handy script for HackerRank, HackerEarth and CodeChef TCs Generation.",
    language: "Python",
    html_url: "https://github.com/aashutoshrathi/Testcase-Generator",
    homepage: "https://tcgen.aashutosh.dev/",
    stargazers_count: 109,
  },
  {
    id: 236274583,
    name: "aashutosh.dev",
    description: "~/aashutosh",
    language: "MDX",
    html_url: "https://github.com/aashutoshrathi/aashutosh.dev",
    homepage: "https://aashutosh.dev",
    stargazers_count: 5,
  },
  {
    id: 115751881,
    name: "Insta-Downloader-Extension",
    description:
      "A browser extension that injects download buttons ⬇️ for media on Instagram Web",
    language: "JavaScript",
    html_url: "https://github.com/aashutoshrathi/Insta-Downloader-Extension",
    homepage:
      "https://addons.mozilla.org/en-US/firefox/addon/instagram-media-downloader/",
    stargazers_count: 82,
  },
  {
    id: 150223916,
    name: "git-profiler-bot",
    description: "Telegram bot which fetches GitHub Profiles.",
    language: "Python",
    html_url: "https://github.com/aashutoshrathi/git-profiler-bot",
    homepage: "http://t.me/git_profile_bot",
    stargazers_count: 26,
  },
]

type ProjectSort = "recent" | "stars"

const SORT_OPTIONS: { value: ProjectSort; label: string }[] = [
  { value: "recent", label: "Recent" },
  { value: "stars", label: "Most starred" },
]

const sortProjects = (repos: Project[], sortBy: ProjectSort): Project[] => {
  if (sortBy === "stars") {
    return [...repos].sort(
      (a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)
    )
  }
  return repos
}

const Projects: React.FC = () => {
  const [sortBy, setSortBy] = useState<ProjectSort>("recent")
  const projectsRef = useRef<HTMLElement | null>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const displayedProjects = sortProjects(FEATURED_PROJECTS, sortBy)

  useGSAP(
    () => {
      if (shouldReduceMotion()) return
      const tl = gsap.timeline()

      if (projectsRef.current) {
        tl.fromTo(
          projectsRef.current.children,
          {
            x: (index) => (isDesktop ? (index % 2 === 0 ? -24 : 24) : 0),
            y: isDesktop ? 0 : -12,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            stagger: 0.04,
            ease: "expo.in",
            duration: 0.4,
          }
        )
      }
    },
    { dependencies: [sortBy] }
  )

  return (
    <>
      <div
        className="mt-8 flex justify-end gap-1 rounded-lg"
        role="group"
        aria-label="Sort projects">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setSortBy(option.value)}
            aria-pressed={sortBy === option.value}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 dark:focus-visible:ring-blue-300 ${
              sortBy === option.value
                ? "bg-blue-600 font-semibold text-white dark:bg-blue-400 dark:text-slate-900"
                : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
            }`}>
            {option.label}
          </button>
        ))}
      </div>
      <section ref={projectsRef} className="mt-4 grid md:grid-cols-2 gap-6">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  )
}

export default Projects
