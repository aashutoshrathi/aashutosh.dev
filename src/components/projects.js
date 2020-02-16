import React, { useEffect, useState } from "react"
import Card from "./card.js"

const CACHE = {}
const PROJECT_URL = process.env.GATSBY_API_URI

const Projects = () => {
  const [projects, setProjects] = useState([])

  const getProjects = () => {
    fetch(PROJECT_URL)
      .then(res => res.json())
      .then(data => {
        data = data.filter(repo => !repo.fork && repo.stargazers_count > 1)
        data.sort((a, b) => {
          return a.stargazers_count > b.stargazers_count ? -1 : 1
        })
        CACHE[PROJECT_URL] = data
        setProjects(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (CACHE[PROJECT_URL] !== undefined) {
      setProjects(CACHE[PROJECT_URL])
    }
    getProjects()
  }, [])

  return (
    <div className="projects">
      {projects.map((project, idx) => (
        <Card key={idx} project={project} />
      ))}
    </div>
  )
}

export default Projects
