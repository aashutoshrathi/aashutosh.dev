import React from "react"
import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test"
import { render, screen, cleanup } from "@testing-library/react"
import ProjectCard from "./project-card"
import { Project } from "../types"

// We no longer mock react-icons since happy-dom allows rendering them natively.
// We only mock Gatsby's OutboundLink
mock.module("gatsby-plugin-google-gtag", () => {
  return {
    OutboundLink: (props: any) => (
      <a {...props} data-testid="outbound-link">
        {props.children}
      </a>
    ),
  }
})

describe("ProjectCard", () => {
  afterEach(() => {
    cleanup()
  })

  it("renders correctly with all project fields", () => {
    const mockProject: Project = {
      id: 1,
      name: "Awesome Project",
      description: "This is a really awesome project",
      language: "C++",
      html_url: "https://github.com/test/awesome",
      homepage: "https://awesome.com",
    }

    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText("Awesome Project")).toBeTruthy()
    expect(screen.getByText("This is a really awesome project")).toBeTruthy()

    // Check links
    const links = screen.getAllByTestId("outbound-link")
    expect(links.length).toBe(2)
    expect(links[0].getAttribute("href")).toBe(
      "https://github.com/test/awesome",
    )
    expect(links[1].getAttribute("href")).toBe("https://awesome.com")

    // SVG is rendered directly
    const svg = document.querySelector("svg")
    expect(svg).not.toBeNull()
  })

  it("omits demo link if project.homepage is not provided", () => {
    const mockProject: Project = {
      id: 2,
      name: "No Homepage Project",
      description: "This project has no homepage",
      language: "Python",
      html_url: "https://github.com/test/no-home",
      homepage: "",
    }

    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText("No Homepage Project")).toBeTruthy()

    // Check links
    const links = screen.getAllByTestId("outbound-link")
    expect(links.length).toBe(1)
    expect(links[0].getAttribute("href")).toBe(
      "https://github.com/test/no-home",
    )

    // Demo text should not exist
    expect(screen.queryByText("Demo")).toBeNull()
  })

  it("handles missing language properly", () => {
    const mockProject: Project = {
      id: 3,
      name: "No Language Project",
      description: "A project with no language specified",
      language: null,
      html_url: "https://github.com/test/no-lang",
      homepage: "",
    }

    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText("No Language Project")).toBeTruthy()

    // Icon shouldn't be rendered because language is null
    const svg = document.querySelector("svg")
    expect(svg).toBeNull()
  })
})
