import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import Button from "../components/button"

const IndexPage = () => (
  <>
    <Layout>
      <SEO title="Home" />
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        flexGrow: 1,
        padding: "0 1rem"
      }}>
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
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem"
        }}>
          Aashutosh Rathi
        </h1>
        <p style={{
          fontSize: "1.15rem",
          maxWidth: "550px",
          lineHeight: "1.6",
          color: "#4a5568",
          marginBottom: "2rem"
        }}>
          I'm a software engineer who loves building products and tinkering with new technologies. I'm passionate about open source and building communities.
        </p>
        <Button url="mailto:me@aashutosh.dev" text="Get in touch" />
      </div>
    </Layout>
  </>
)

export default IndexPage
