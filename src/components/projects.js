import React from "react"
import useSWR from "swr"
import Loader from "../components/loader"
import { fetchData } from "../utils/utils"
import ProjectCard from "./project-card.js"
import "./projects.css"

const PROJECT_URL = `${process.env.GATSBY_API_URI}projects`

const Projects = () => {
  const { data: projects } = useSWR(PROJECT_URL, fetchData)

  return (
    <>
      {projects ? (
        <section className="projects">
          {projects?.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Projects
