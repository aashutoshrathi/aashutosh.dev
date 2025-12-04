import React from "react"

import GitTimeline from "@components/GitTimeline"
import SEO from "@components/seo"

const TimelinePage: React.FC = () => {
  return (
    <>
      <SEO title="About" />
      <GitTimeline />
    </>
  )
}

export default TimelinePage
