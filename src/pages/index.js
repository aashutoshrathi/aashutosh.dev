import React from "react"
import Button from "../components/button"
import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SocialIcon from "../components/socialIcon"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <>
      <div className="text-center">
        <Image />
      </div>
      <h1 id="name" className="padding-small">
        Aashutosh Rathi
      </h1>
      <div id="social" className="text-center">
        <SocialIcon url="https://github.com/aashutoshrathi" label="GitHub" />
        <SocialIcon url="https://twitter.com/AashutoshRathi" label="Twitter" />
        <SocialIcon
          url="https://stackoverflow.com/users/story/7326407"
          label="Stackoverflow"
        />
        <SocialIcon
          url="https://linkedin.com/in/aashutoshrathi/"
          label="LinkedIn"
        />
        <SocialIcon url="https://fb.com/aashutoshrathi" label="Facebook" />
      </div>

      <div className="text-center padding-small">
        <Button url="https://resume.aashutosh.dev" text="Résumé" />
        <Button
          url="https://sourcerer.io/aashutoshrathi"
          text="Sourcerer Profile"
        />
      </div>
    </>
  </Layout>
)

export default IndexPage
