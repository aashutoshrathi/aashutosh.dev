import React from "react"
import GitHubCalendar from "react-github-calendar"
import ReactTooltip from "react-tooltip"
import Layout from "../components/layout"
import Projects from "../components/projects"
import SEO from "../components/seo"
import "./work.css"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Work" />
      <h3 className={`text-center padding-small heading`}>
        My GitHub Calendar{" "}
        <span role="img" aria-label="calendar">
          🗓
        </span>{" "}
      </h3>
      <div className="cal-container">
        <GitHubCalendar
          username="aashutoshrathi"
          fontSize={16}
          blockSize={14}
          hideColorLegend
          hideTotalCount
        >
          <ReactTooltip delayShow={10} html />
        </GitHubCalendar>
      </div>

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
