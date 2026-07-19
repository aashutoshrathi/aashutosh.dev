import React from "react"

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
  FaStar,
  FaTwitter,
} from "react-icons/fa"
import {
  SiCplusplus,
  SiCss3,
  SiFlutter,
  SiGo,
  SiHtml5,
  SiJupyter,
  SiMdx,
  SiRuby,
  SiSwift,
  SiTypescript,
} from "react-icons/si"

import { AnimatedLink } from "@components"
import { titleCase } from "@utils"

import { Project } from "../types"

interface ProjectCardProps {
  project: Project
}

const iconMap: { [key: string]: React.ComponentType } = {
  C: FaCode,
  Cpp: SiCplusplus,
  Css: SiCss3,
  Dev: FaDev,
  Facebook: FaFacebook,
  Flutter: SiFlutter,
  Github: FaGithub,
  Html: SiHtml5,
  Javascript: FaJsSquare,
  Jupyter: SiJupyter,
  Linkedin: FaLinkedin,
  Python: FaPython,
  Ruby: SiRuby,
  Stackoverflow: FaStackOverflow,
  Swift: SiSwift,
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
        <span className="flex items-center gap-3">
          {project.language && Icon && (
            <span className="flex items-center [&_svg]:mr-2">
              <Icon />
              <span>{project.language}</span>
            </span>
          )}
          {!!project.stargazers_count && (
            <span
              className="flex items-center [&_svg]:mr-1 [&_svg]:text-amber-500"
              title={`${project.stargazers_count} stars`}
              aria-label={`${project.stargazers_count} stars`}>
              <FaStar />
              <span>{project.stargazers_count}</span>
            </span>
          )}
        </span>
        <div>
          <AnimatedLink
            href={project.html_url}
            aria-label="Source Code"
            title="Source Code">
            Code
          </AnimatedLink>
          {project.homepage && (
            <AnimatedLink
              href={project.homepage}
              className="ml-4"
              aria-label="Demo/Docs"
              title="Demo/Docs">
              Demo
            </AnimatedLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
