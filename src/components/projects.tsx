import React, { useEffect, useRef, useState } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "usehooks-ts"

import { fetchData } from "@utils"

import { Project } from "../types"
import ProjectCard from "./project-card"

const GITHUB_USERNAME = "aashutoshrathi"
const PROJECTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=pushed&direction=desc`
const MAX_PROJECTS = 10

/* Repos that shouldn't show up as projects (e.g. the profile README) */
const EXCLUDED_REPOS = new Set([GITHUB_USERNAME, "homebrew-tap"])

const selectRecentProjects = (repos: Project[]): Project[] =>
  repos
    .filter(
      (repo) =>
        !repo.fork &&
        !repo.archived &&
        repo.description &&
        !EXCLUDED_REPOS.has(repo.name)
    )
    .slice(0, MAX_PROJECTS)

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
  const projectsRef = useRef<HTMLElement | null>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useGSAP(
    () => {
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
    fetchData<Project[]>(PROJECTS_URL)
      .then((repos) => setProjects(selectRecentProjects(repos)))
      .catch(() => {
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to fetch projects, using dummy data.")
        }
        setProjects(DUMMY_PROJECTS)
      })
  }, [])

  return projects ? (
    <section ref={projectsRef} className="mt-8 grid md:grid-cols-2 gap-6">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  ) : (
    <div className="mt-24 mx-auto w-20 text-center">
      <div className="size-4 bg-white rounded-full inline-block bounce-1" />
      <div className="size-4 bg-white rounded-full inline-block bounce-2" />
      <div className="size-4 bg-white rounded-full inline-block bounce-3" />
    </div>
  )
}

export default Projects
