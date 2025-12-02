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
      <div className="flex flex-col md:flex-row justify-center items-center flex-grow px-4 gap-12">
        <div className="md:w-2/3 text-center md:text-left">
          <h1
            className="text-2xl font-bold mb-4 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            hey there, I'm Aashutosh! 👋
          </h1>
          <p
            className="text-[1.15rem] max-w-[550px] leading-relaxed mb-8 opacity-90 animate-fade-in-up"
            style={{ animationDelay: "0.3s", color: "var(--main-text-color)" }}
          >
            Software Engineer by day, automation enthusiast always. I build
            tools for people who hate doing things manually—because I'm
            definitely one of them. Currently{" "}
            <Link url="https://regie.ai" external>
              optimizing sales with AI at Regie.ai
            </Link>
            , while my side quests include rescuing lost souls in Stack
            Overflow's Unanswered section and creating dev-tools for
            competitive programming. When I'm not debugging the internet or
            mastering the art of software engineering with humans, I'm writing
            scripts to turn 'boring' into 'automated'—one Chrome extension at a
            time.
          </p>
          <div
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            <Button url="mailto:me@aashutosh.dev" text="Get in touch" />
          </div>
        </div>

        <div
          className="relative w-[180px] h-[180px] cursor-pointer transition-transform duration-300 hover:scale-[1.02] animate-fade-in opacity-0 order-first md:order-last rounded-xl overflow-hidden"
          style={{ animationDelay: "0.1s" }}
        >
          <StaticImage
            src="../images/pic.webp"
            alt="Aashutosh Rathi"
            placeholder="blurred"
            layout="constrained"
            width={180}
            height={180}
            style={{ borderRadius: "1rem" }}
          />
        </div>
      </div>
    </Layout>
  </>
)

export default IndexPage
