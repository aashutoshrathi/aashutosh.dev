import React from "react"
import useSWR from "swr"
import Loader from "./Loader"
import { fetchData } from "@/lib/utils-app"
import Card from "./Card"

const PROJECT_URL = `${process.env.NEXT_PUBLIC_API_URI}projects`

const Projects = () => {
  const { data: projects } = useSWR(PROJECT_URL, fetchData)

  return (
    <>
      {projects ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 justify-items-center">
          {projects?.map((project: any) => (
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