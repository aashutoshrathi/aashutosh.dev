import GitHubCalendar from "github-calendar"
import React, { useEffect } from "react"
import Layout from "../components/layout"
import Projects from "../components/projects"
import SEO from "../components/seo"
import "./work.css"

const IndexPage = () => {
  useEffect(() => {
    GitHubCalendar(".calendar", "aashutoshrathi", { responsive: true })
  }, [])

  return (
    <Layout>
      <SEO title="Work" />
      <h3 className={["text-center", "padding-small", "heading"].join(" ")}>
        My GitHub Calendar{" "}
        <span role="img" aria-label="calendar">
          🗓
        </span>{" "}
      </h3>
      <div className="calendar">Loading the data just for you.</div>

      <h3
        className={[
          "text-center",
          "padding-small",
          "heading",
          "margin-top-small",
        ].join(" ")}
      >
        Projects{" "}
        <span role="img" aria-label="project">
          📂
        </span>
      </h3>
      <Projects />
    </Layout>
  )
}

export default IndexPage
