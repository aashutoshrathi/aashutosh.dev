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
      <div className="flex justify-center items-center flex-col text-center flex-grow px-4">
        <div
          className="relative w-[120px] h-[120px] mb-6 rounded-full overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] animate-fade-in opacity-0"
          style={{ animationDelay: "0.1s" }}
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
          className="text-5xl font-bold mb-4 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          Aashutosh Rathi
        </h1>
        <p
          className="text-[1.15rem] max-w-[550px] leading-relaxed mb-8 opacity-90 animate-fade-in-up"
          style={{ animationDelay: "0.3s", color: 'var(--main-text-color)' }}
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
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          <Button url="mailto:me@aashutosh.dev" text="Get in touch" />
        </div>
      </div>
    </Layout>
  </>
)

export default IndexPage
