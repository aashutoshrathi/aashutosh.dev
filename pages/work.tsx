import React from "react"
import GitHubCalendar from "react-github-calendar"
import Layout from "@/components/layout/Layout"
import Projects from "@/components/Projects"
import SEO from "@/components/layout/SEO"

const WorkPage = () => {
  return (
    <Layout>
      <SEO title="Work" />
      <h3 className="text-center p-4 text-2xl font-semibold">
        My GitHub Calendar{" "}
        <span role="img" aria-label="calendar">
          🗓
        </span>{" "}
      </h3>
      <div className="flex justify-center text-center">
        <GitHubCalendar
          username="aashutoshrathi"
          fontSize={16}
          blockSize={14}
          hideColorLegend
          hideTotalCount
        />
      </div>

      <h3 className="text-center p-4 text-2xl font-semibold mt-4">
        Projects{" "}
        <span role="img" aria-label="project">
          📂
        </span>
      </h3>
      <Projects />
    </Layout>
  )
}

export default WorkPage