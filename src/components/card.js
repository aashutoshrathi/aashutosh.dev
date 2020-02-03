import React from "react"
import "./card.css"

const Card = ({ project }) => (
  <div className="card">
    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
      <div>
        <h3> {project.name.replace(/-/g, " ")} </h3>
        <h4> {project.stargazers_count} ⭐️ </h4>
        <br />
        <p className="card-description"> {project.description} </p>
        <br />
        <p> Made with {project.language} </p>
      </div>
    </a>
  </div>
)

export default Card
