import React from "react"
import Icon from "./icon"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { ProjectCardProps } from "../types"

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all duration-200 ease-in-out flex flex-col justify-between hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-xl font-semibold mb-2"> {project.name.replace(/-/g, " ")} </h3>
    <p className="text-gray-600 mb-4 flex-grow"> {project.description} </p>
    <div className="flex justify-between items-center text-sm text-gray-500">
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
      <div className="[&_a]:ml-4 [&_a]:underline" style={{ color: 'var(--link-color)' }}>
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