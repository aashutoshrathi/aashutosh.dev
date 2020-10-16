import React from "react"
import useSWR from "swr"
import Card from "./card.js"
import "./projects.css"

import { fetchData } from "../utils/utils"

const PROJECT_URL = `${process.env.GATSBY_API_URI}projects`

const Projects = () => {
  const { data: projects } = useSWR(PROJECT_URL, fetchData(PROJECT_URL))

  return (
    <section className="projects">
      {projects?.map(project => (
        <Card key={project.id} project={project} />
      ))}
    </section>
  )
}

export default Projects
