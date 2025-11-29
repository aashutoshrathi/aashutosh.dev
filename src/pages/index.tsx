import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import Button from "../components/button"
import Link from "../components/link"

const IndexPage: React.FC = () => (
  <>
    <Layout>
      <SEO title="Home" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          flexGrow: 1,
          padding: "0 1rem",
        }}
      >
        <StaticImage
          src="../images/pic.webp"
          alt="Aashutosh Rathi"
          placeholder="blurred"
          layout="fixed"
          width={120}
          height={120}
          style={{
            borderRadius: "50%",
            marginBottom: "1.5rem",
          }}
        />
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Aashutosh Rathi
        </h1>
        <p
          style={{
            fontSize: "1.15rem",
            maxWidth: "550px",
            lineHeight: "1.6",
            color: "#ced8feff",
            marginBottom: "2rem",
          }}
        >
          Software Engineer by day, automation enthusiast always. I build tools
          for people who hate doing things manually—because I'm definitely one
          of them. Currently{" "}
          <Link url="https://regie.ai" external>
            optimizing sales with AI at Regie.ai
          </Link>
          , while my side quests include rescuing lost souls in StackOverflow's
          Unanswered section and creating dev-tools for competitive programming.
          When I'm not debugging the internet or mastering the art of software
          engineering with humans, I'm writing scripts to turn 'boring' into
          'automated'—one Chrome extension at a time.
        </p>
        <Button url="mailto:me@aashutosh.dev" text="Get in touch" />
      </div>
    </Layout>
  </>
)

export default IndexPage
