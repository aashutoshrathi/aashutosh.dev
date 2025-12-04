import React from "react"

import { OutboundLink } from "gatsby-plugin-google-gtag"

import { ProjectCardProps } from "../types"
import Icon from "./icon"

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
    <h3 className="mb-2 text-xl font-semibold text-main-text">
      {" "}
      {project.name.replace(/-/g, " ")}{" "}
    </h3>
    <p className="mb-4 flex-grow text-gray-600 dark:text-gray-300">
      {" "}
      {project.description}{" "}
    </p>
    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center [&_svg]:mr-2">
        {project.language ? (
          <>
            <Icon label={project.language} width="1em" height="1em" />
            <span>{project.language}</span>
          </>
        ) : (
          ""
        )}
      </div>
      <div
        className="[&_a]:ml-4 [&_a]:underline"
        style={{ color: "var(--link-color)" }}
      >
        <OutboundLink
          href={project.html_url}
          aria-label="Source Code"
          title="Source Code"
          rel="noopener noreferrer"
          target="_blank"
        >
          Code
        </OutboundLink>
        {project.homepage ? (
          <OutboundLink
            href={project.homepage}
            aria-label="Demo/Docs"
            title="Demo/Docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Demo
          </OutboundLink>
        ) : (
          ""
        )}
      </div>
    </div>
  </div>
)

export default ProjectCard
