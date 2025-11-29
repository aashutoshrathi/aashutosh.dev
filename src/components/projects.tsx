import React from "react"
import useSWR from "swr"
import Loader from "../components/loader"
import { fetchData } from "../utils/utils"
import ProjectCard from "./project-card"
import { Project } from "../types"

const PROJECT_URL = `${process.env.GATSBY_API_URI}projects`

const Projects: React.FC = () => {
  const { data: projects } = useSWR<Project[]>(PROJECT_URL, fetchData)

  return (
    <>
      {projects ? (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 mt-8">
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
