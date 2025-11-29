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
        <div
          className="profile-image-container fade-in"
          style={{
            position: "relative",
            width: "120px",
            height: "120px",
            marginBottom: "1.5rem",
            borderRadius: "50%",
            overflow: "hidden",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          {/* @ts-expect-error - pixel-canvas is a web component */}
          <pixel-canvas data-gap="8" data-speed="50"></pixel-canvas>
          <StaticImage
            src="../images/pic.webp"
            alt="Aashutosh Rathi"
            placeholder="blurred"
            layout="fixed"
            width={120}
            height={120}
            style={{
              borderRadius: "50%",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>
        <h1
          className="fade-in-up"
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          Aashutosh Rathi
        </h1>
        <p
          className="about-me fade-in-up"
          style={{
            animationDelay: "0.3s",
            opacity: 0,
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
        <div
          className="fade-in-up"
          style={{
            animationDelay: "0.4s",
            opacity: 0,
          }}
        >
          <Button url="mailto:me@aashutosh.dev" text="Get in touch" />
        </div>
      </div>
    </Layout>
  </>
)

export default IndexPage
