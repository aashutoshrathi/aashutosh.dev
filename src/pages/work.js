import React, { useEffect } from "react"
import GitHubCalendar from "github-calendar"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  useEffect(() => {
    GitHubCalendar(".calendar", "aashutoshrathi", { responsive: true })
  }, [])

  return (
    <Layout>
      <SEO title="Work" />
      <h3 className="uk-text-center">
        My GitHub Calendar{" "}
        <span role="img" aria-label="calendar">
          🗓
        </span>{" "}
      </h3>
      <div className="calendar">Loading the data just for you.</div>

      <h3 className="uk-text-center">
        Projects{" "}
        <span role="img" aria-label="project">
          📂
        </span>
      </h3>
    </Layout>
  )
}

export default IndexPage
