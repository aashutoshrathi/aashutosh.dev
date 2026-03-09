import React, { useEffect, useRef, useState } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useMediaQuery } from "usehooks-ts"

import { fetchData } from "@utils"

import ProjectCard from "./project-card"
import { Project } from "../types"

const PROJECT_URL = `${process.env.GATSBY_API_URI}projects`

const DUMMY_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Awesome GitHub Profile",
    description:
      "A curated list of awesome GitHub Profile READMEs with creative ideas and implementations",
    language: "JavaScript",
    html_url: "https://github.com/aashutoshrathi/awesome-github-profile",
    homepage: "https://awesomegithubprofile.tech",
  },
  {
    id: 2,
    name: "Word Counter",
    description:
      "A blazingly fast CLI tool to count words, characters, and lines in text files",
    language: "Rust",
    html_url: "https://github.com/aashutoshrathi/word-counter",
    homepage: "",
  },
  {
    id: 3,
    name: "Pokemon Card Generator",
    description:
      "Generate custom Pokemon trading cards with your own stats and images",
    language: "TypeScript",
    html_url: "https://github.com/aashutoshrathi/pokemon-generator",
    homepage: "https://pokemon.aashutosh.dev",
  },
  {
    id: 4,
    name: "Git Stalk CLI",
    description:
      "Stalk GitHub users via command line with beautiful charts and stats",
    language: "Python",
    html_url: "https://github.com/aashutoshrathi/git-stalk-cli",
    homepage: "",
  },
  {
    id: 5,
    name: "Nibbles.dev",
    description:
      "Weekly tech newsletter covering latest in web development, AI, and developer tools",
    language: "MDX",
    html_url: "https://github.com/aashutoshrathi/nibbles",
    homepage: "https://nibbles.dev",
  },
  {
    id: 6,
    name: "Testcase Generator",
    description:
      "Automatically generate test cases for competitive programming problems",
    language: "Go",
    html_url: "https://github.com/aashutoshrathi/testcase-generator",
    homepage: "",
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
    /* Use dummy data in development if API is not available */
    if (process.env.NODE_ENV === "development" && !process.env.GATSBY_API_URI) {
      setProjects(DUMMY_PROJECTS)
      return
    }

    fetchData<Project[]>(PROJECT_URL)
      .then(setProjects)
      .catch(() => {
        console.error("Failed to fetch projects, using dummy data.")
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
