import React from "react"
import Layout from "@/components/layout/Layout"
import SEO from "@/components/layout/SEO"
import Button from "@/components/Button"
import Icon from "@/components/Icon"

const HomePage = () => (
  <>
    <SEO title="Home" />
    <Layout verticallyCenter={true}>
      <div className="text-center">
        <p className="text-center font-manrope text-3xl p-4">
          👋 I'm Aashutosh Rathi
        </p>
        <div className="text-center text-4xl my-2">
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

        <div className="text-center p-4">
          <Button url="https://resume.aashutosh.dev" text="Résumé" />
          <Button url="mailto:me@aashutosh.dev" text="Email me" />
        </div>
      </div>
    </Layout>
  </>
)

export default HomePage