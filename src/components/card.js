import React from "react"
import "./card.css"
import Icon from "./icon"

const Card = ({ project }) => (
  <div className="card">
    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
      <div>
        <h3> {project.name.replace(/-/g, " ")} </h3>
        <h4> {project.stargazers_count} ⭐️ </h4>
        <br />
        <p className="card-description"> {project.description} </p>
        <br />
        <p>
          {" "}
          Written in <Icon url="" label={project.language} />{" "}
        </p>
        <br />
        <a href={project.homepage} rel="noopener noreferrer" target="_blank">
          Demo/Docs
        </a>
      </div>
    </a>
  </div>
)

export default Card
