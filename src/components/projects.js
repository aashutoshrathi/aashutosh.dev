import React from "react"
import useSWR from "swr"
import Loader from "../components/loader"
import { fetchData } from "../utils/utils"
import Card from "./card.js"
import "./projects.css"

const PROJECT_URL = `${process.env.GATSBY_API_URI}projects`

const Projects = () => {
  const { data: projects } = useSWR(PROJECT_URL, fetchData(PROJECT_URL))

  return (
    <>
      {projects ? (
        <section className="projects">
          {projects?.map(project => (
            <Card key={project.id} project={project} />
          ))}
        </section>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Projects
