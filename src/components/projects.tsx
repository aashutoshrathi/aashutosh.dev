import React, { useEffect, useState } from "react"

import Loader from "../components/loader"
import { Project } from "../types"
import { fetchData } from "../utils/utils"
import ProjectCard from "./project-card"

const PROJECT_URL = `${process.env.GATSBY_API_URI}projects`

const DUMMY_PROJECTS: Project[] = [
  {
    id: 1,
    name: "awesome-github-profile",
    description:
      "A curated list of awesome GitHub Profile READMEs with creative ideas and implementations",
    language: "JavaScript",
    html_url: "https://github.com/aashutoshrathi/awesome-github-profile",
    homepage: "https://awesomegithubprofile.tech",
  },
  {
    id: 2,
    name: "word-counter",
    description:
      "A blazingly fast CLI tool to count words, characters, and lines in text files",
    language: "Rust",
    html_url: "https://github.com/aashutoshrathi/word-counter",
    homepage: "",
  },
  {
    id: 3,
    name: "pokemon-card-generator",
    description:
      "Generate custom Pokemon trading cards with your own stats and images",
    language: "TypeScript",
    html_url: "https://github.com/aashutoshrathi/pokemon-generator",
    homepage: "https://pokemon.aashutosh.dev",
  },
  {
    id: 4,
    name: "git-stalk-cli",
    description:
      "Stalk GitHub users via command line with beautiful charts and stats",
    language: "Python",
    html_url: "https://github.com/aashutoshrathi/git-stalk-cli",
    homepage: "",
  },
  {
    id: 5,
    name: "nibbles-dev",
    description:
      "Weekly tech newsletter covering latest in web development, AI, and developer tools",
    language: "MDX",
    html_url: "https://github.com/aashutoshrathi/nibbles",
    homepage: "https://nibbles.dev",
  },
  {
    id: 6,
    name: "testcase-generator",
    description:
      "Automatically generate test cases for competitive programming problems",
    language: "Go",
    html_url: "https://github.com/aashutoshrathi/testcase-generator",
    homepage: "",
  },
]

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | null>(null)

  useEffect(() => {
    // Use dummy data in development if API is not available
    if (process.env.NODE_ENV === "development" && !process.env.GATSBY_API_URI) {
      setProjects(DUMMY_PROJECTS)
      return
    }

    fetchData<Project[]>(PROJECT_URL)
      .then(setProjects)
      .catch((err) => {
        console.error("Failed to fetch projects, using dummy data:", err)
        setProjects(DUMMY_PROJECTS)
      })
  }, [])

  return (
    <>
      {projects ? (
        <section className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {projects?.map((project) => (
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
