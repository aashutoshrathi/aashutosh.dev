import React from "react"
import "./card.css"
import Icon from "./icon"

const Card = ({ project }) => (
  <div className="card">
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
      <div className="eq-div-flex">
        <a
          href={project.html_url}
          aria-label="Source Code"
          title="Source Code"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="title">{`</>`}</span> Code
        </a>
        {project.homepage ? (
          <a
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
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  </div>
)

export default Card
