import React from "react"

import { OutboundLink } from "gatsby-plugin-google-gtag"
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

import { titleCase } from "@utils"

import { Project } from "../types"

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

export default ProjectCard
