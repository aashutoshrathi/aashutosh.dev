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
      <div className="cal-container">
        <GitHubCalendar
          username="aashutoshrathi"
          fontSize={16}
          blockSize={14}
          hideColorLegend
          hideTotalCount
        >
          <ReactTooltip delayShow={10} html className="custom-tooltip" />
        </GitHubCalendar>
      </div>
      <Projects />
    </Layout>
  )
}

export default IndexPage
