import React from "react"
import GitHubCalendar from "react-github-calendar"
import ReactTooltip from "react-tooltip"
import Layout from "../components/layout"
import Projects from "../components/projects"
import SEO from "../components/seo"

const WorkPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Work" />
      <style>{`
        text { fill: var(--main-text-color) !important; }
        .custom-tooltip { background-color: #ffffff !important; color: #1a202c !important; border: 1px solid #e2e8f0 !important; }
        .custom-tooltip.place-top::after { border-top-color: #ffffff !important; border-top-style: solid !important; border-top-width: 6px !important; }
      `}</style>
      <div className="flex justify-center text-center my-8">
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

export default WorkPage
