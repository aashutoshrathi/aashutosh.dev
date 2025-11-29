import React from "react"
import "./project-card.css"
import Icon from "./icon"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { ProjectCardProps } from "../types"

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="project-card">
    <h3 className="project-card-title"> {project.name.replace(/-/g, " ")} </h3>
    <p className="project-card-description"> {project.description} </p>
    <div className="project-card-footer">
      <div className="project-card-language">
        {project.language ? (
          <>
            <Icon label={project.language} width="1em" height="1em" />
            <span>{project.language}</span>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="project-card-links">
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