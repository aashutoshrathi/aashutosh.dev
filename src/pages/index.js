import React from "react"
import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <>
      <Image path="pic.jpeg" alt="GitHub Avatar" className="lazyload" />
      <h1 id="name">Aashutosh Rathi</h1>
      <div id="social">
        <a
          href="http://www.github.com/aashutoshrathi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i className="ico icon-github"></i>
        </a>
        <a
          href="http://www.twitter.com/AashutoshRathi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <i className="ico icon-twitter"></i>
        </a>
        <a
          href="https://stackoverflow.com/users/story/7326407"
          target=" _blank"
          rel="noopener noreferrer"
          aria-label="Stackoverflow"
        >
          <i className="ico icon-stackoverflow"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/aashutoshrathi/"
          target=" _blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="ico icon-linkedin"></i>
        </a>
        <a
          href="http://www.fb.com/aashutoshrathi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="ico icon-facebook2"></i>
        </a>
      </div>

      <div className="top-buttons uk-margin-top uk-text-center">
        <a
          href="https://files.aashutosh.dev/Resume.pdf"
          id="resume"
          target=" _blank"
          rel="noopener noreferrer"
          className="uk-button uk-button-secondary uk-border-pill uk-margin-right uk-text-emphasis"
        >
          Résumé
        </a>
        <a
          href="https://sourcerer.io/aashutoshrathi"
          id="sourcerer"
          target=" _blank"
          rel="noopener noreferrer"
          className="uk-button uk-button-secondary uk-border-pill
                            uk-text-emphasis"
        >
          Sourcerer Profile
        </a>
      </div>
    </>
  </Layout>
)

export default IndexPage
