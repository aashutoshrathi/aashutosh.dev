import React from "react"
import Button from "../components/button"
import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Icon from "../components/icon"

const IndexPage = () => (
  <>
    <Layout verticallyCenter={true}>
      <SEO title="Home" />
      <>
        <p id="name" className="padding-small">
          👋 I'm Aashutosh Rathi
        </p>
        <div id="social" className="text-center">
          <Icon url="https://github.com/aashutoshrathi" label="GitHub" />
          <Icon url="https://twitter.com/AashutoshRathi" label="Twitter" />
          <Icon
            url="https://stackoverflow.com/users/7326407/aashutosh-rathi?tab=profile"
            label="Stackoverflow"
          />
          <Icon
            url="https://dev.to/aashutoshrathi"
            label="Dev"
            viewBox="0 0 448 512"
          />
          <Icon
            url="https://linkedin.com/in/aashutoshrathi/"
            label="LinkedIn"
          />
          <Icon url="https://fb.com/aashutoshrathi" label="Facebook" />
        </div>

        <div className="text-center padding-small">
          <Button url="https://resume.aashutosh.dev" text="Résumé" />
          <Button url="mailto:me@aashutosh.dev" text="Email me" />
        </div>
      </>
    </Layout>
  </>
)

export default IndexPage
