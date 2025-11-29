import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ResumePage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Résumé" />
      <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
        <iframe
          src="https://resume.aashutosh.dev#view=FitH&navpanes=0"
          className="w-full h-full border-0 bg-white"
          title="Aashutosh Rathi Resume"
          style={{ minHeight: '600px' }}
        />
      </div>
    </Layout>
  )
}

export default ResumePage
