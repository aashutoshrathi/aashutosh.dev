import Layout from "../components/layout"
import React from "react"
import GitTimeline from "../components/GitTimeline"
import SEO from "../components/seo"

const TimelinePage: React.FC = () => {
  return (
    <Layout>
      <SEO title="About" />
      <GitTimeline />
    </Layout>
  )
}

export default TimelinePage
