import React, { useEffect, useRef, useState } from "react"

import { useGSAP } from "@gsap/react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import gsap from "gsap"
import {
  FaCode,
  FaDev,
  FaFacebook,
  FaGithub,
  FaJava,
  FaJsSquare,
  FaLinkedin,
  FaPython,
  FaRust,
  FaStackOverflow,
  FaTwitter,
} from "react-icons/fa"
import {
  SiCplusplus,
  SiFlutter,
  SiGo,
  SiJupyter,
  SiMdx,
  SiTypescript,
} from "react-icons/si"
import { useMediaQuery } from "usehooks-ts"

import { fetchData, titleCase } from "@utils"

export interface Project {
  id: number
  name: string
  description: string | null
  language: string | null
  html_url: string
  homepage: string
  stargazers_count?: number
}

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
      .catch((err) => {
        console.error("Failed to fetch projects, using dummy data:", err)
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

interface ProjectCardProps {
  project: Project
}

const iconMap: { [key: string]: React.ComponentType } = {
  C: FaCode,
  Cpp: SiCplusplus,
  Dev: FaDev,
  Facebook: FaFacebook,
  Flutter: SiFlutter,
  Github: FaGithub,
  Javascript: FaJsSquare,
  Jupyter: SiJupyter,
  Linkedin: FaLinkedin,
  Python: FaPython,
  Stackoverflow: FaStackOverflow,
  Twitter: FaTwitter,
  Typescript: SiTypescript,
  Rust: FaRust,
  Go: SiGo,
  Mdx: SiMdx,
  Java: FaJava,
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const updatedLabel = titleCase(project.language?.replace(/\+/g, "p") || "")
  const Icon = iconMap[updatedLabel]

  return (
    <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-5 transition-all duration-200 ease-in-out dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-2 text-xl font-semibold">{project.name}</h3>
      <p className="mb-4 flex-grow text-gray-600 dark:text-gray-300">
        {project.description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        {project.language && Icon && (
          <span className="flex items-center [&_svg]:mr-2">
            <Icon />
            <span>{project.language}</span>
          </span>
        )}
        <div>
          <OutboundLink
            href={project.html_url}
            aria-label="Source Code"
            className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
            title="Source Code"
            rel="noopener noreferrer"
            target="_blank"
          >
            Code
          </OutboundLink>
          {project.homepage && (
            <OutboundLink
              href={project.homepage}
              className="relative ml-4 inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
              aria-label="Demo/Docs"
              title="Demo/Docs"
              rel="noopener noreferrer"
              target="_blank"
            >
              Demo
            </OutboundLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects
