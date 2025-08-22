import React from "react"
import { Card as UICard, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Icon from "./Icon"

interface Project {
  id: number
  name: string
  description: string
  stargazers_count: number
  language?: string
  html_url: string
  homepage?: string
}

interface CardProps {
  project: Project
}

const Card: React.FC<CardProps> = ({ project }) => (
  <UICard className="bg-nav-footer-bg text-main-text border-none shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-xl w-full max-w-sm mx-auto my-4">
    <CardContent className="p-5">
      <div className="flex flex-col h-full justify-between">
        <div>
          <CardTitle className="text-lg mb-2">
            {project.name.replace(/-/g, " ")}
          </CardTitle>
          <div className="text-sm mb-3 flex items-center">
            {project.stargazers_count} ⭐️
          </div>
          <CardDescription className="text-white/85 text-left text-sm mb-4 max-h-28 overflow-hidden">
            {project.description}
          </CardDescription>
          {project.language && (
            <p className="text-sm mb-4 flex items-center">
              Written in
              <Icon label={project.language} width="1em" height="1em" url="#" />
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <a
            href={project.html_url}
            aria-label="Source Code"
            title="Source Code"
            rel="noopener noreferrer"
            target="_blank"
            className="text-main-text hover:text-main-text"
          >
            <span className="font-mono">{`</>`}</span> Code
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              aria-label="Demo/Docs"
              title="Demo/Docs"
              rel="noopener noreferrer"
              target="_blank"
              className="text-main-text hover:text-main-text"
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
          )}
        </div>
      </div>
    </CardContent>
  </UICard>
)

export default Card