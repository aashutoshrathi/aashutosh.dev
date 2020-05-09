import React from "react"
import "./card.css"
import Icon from "./icon"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const Card = ({ project }) => (
  <div className="card">
    <div>
      <h3 className="card-title"> {project.name.replace(/-/g, " ")} </h3>
      <h4 className="card-star"> {project.stargazers_count} ⭐️ </h4>
      <p className="card-description"> {project.description} </p>
      <p className={("card-lang", "svg-icon")}>
        {" "}
        Written in
        <Icon label={project.language} width="1em" height="1em" />{" "}
      </p>
      <div className="eq-div-flex">
        <OutboundLink
          href={project.html_url}
          aria-label="Source Code"
          title="Source Code"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="title">{`</>`}</span> Code
        </OutboundLink>
        {project.homepage ? (
          <OutboundLink
            href={project.homepage}
            aria-label="Demo/Docs"
            title="Demo/Docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span role="img" aria-label="demo">
              💻
            </span>
            /
            <span role="img" aria-label="docs">
              📑
            </span>{" "}
            (Demo/Docs)
          </OutboundLink>
        ) : (
          ""
        )}
      </div>
    </div>
  </div>
)

export default Card
