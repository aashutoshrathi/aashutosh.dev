import React, { useEffect, useRef, useState } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "usehooks-ts"

import { fetchData, shouldReduceMotion } from "@utils"

import { Project } from "../types"
import ProjectCard from "./project-card"

const GITHUB_USERNAME = "aashutoshrathi"
const PROJECTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=pushed&direction=desc`
const MAX_PROJECTS = 10
const CACHE_KEY = "github-projects"

/* Repos that shouldn't show up as projects (e.g. the profile README) */
const EXCLUDED_REPOS = new Set([GITHUB_USERNAME, "homebrew-tap"])

const loadProjectsCache = (): Project[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed as Project[]
    }
  } catch {}
  return null
}

const saveProjectsCache = (data: Project[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {}
}

type ProjectSort = "recent" | "stars"

const SORT_OPTIONS: { value: ProjectSort; label: string }[] = [
  { value: "recent", label: "Recent" },
  { value: "stars", label: "Most starred" },
]

const filterProjects = (repos: Project[]): Project[] =>
  repos.filter(
    (repo) =>
      !repo.fork &&
      !repo.archived &&
      repo.description &&
      !EXCLUDED_REPOS.has(repo.name)
  )

const sortProjects = (repos: Project[], sortBy: ProjectSort): Project[] => {
  if (sortBy === "stars") {
    return [...repos].sort(
      (a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)
    )
  }
  return repos // API already returns most recently pushed first
}

const DUMMY_PROJECTS: Project[] = [
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

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [sortBy, setSortBy] = useState<ProjectSort>("recent")
  const projectsRef = useRef<HTMLElement | null>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const displayedProjects = projects
    ? sortProjects(projects, sortBy).slice(0, MAX_PROJECTS)
    : null

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
    { dependencies: [projects?.length] }
  )

  useEffect(() => {
    const cached = loadProjectsCache()
    if (cached) setProjects(cached)

    fetchData<Project[]>(PROJECTS_URL)
      .then((repos) => {
        const filtered = filterProjects(repos)
        setProjects(filtered)
        saveProjectsCache(filtered)
      })
      .catch(() => {
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to fetch projects, using dummy data.")
        }
        if (!cached) setProjects(DUMMY_PROJECTS)
      })
  }, [])

  return displayedProjects ? (
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
  ) : (
    <div className="mt-24 mx-auto w-20 text-center">
      <div className="size-4 bg-white rounded-full inline-block bounce-1" />
      <div className="size-4 bg-white rounded-full inline-block bounce-2" />
      <div className="size-4 bg-white rounded-full inline-block bounce-3" />
    </div>
  )
}

export default Projects
