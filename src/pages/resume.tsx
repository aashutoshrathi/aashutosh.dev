import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ResumePage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Résumé" />
      <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
        <iframe
          src="https://files.aashutosh.dev/resume.pdf#view=FitH&navpanes=0"
          className="w-full h-full border-0 bg-white"
          title="Résumé of Aashutosh Rathi"
          style={{ minHeight: '600px' }}
        />
      </div>
    </Layout>
  )
}

export default ResumePage
