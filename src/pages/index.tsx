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
      <div className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-200px)] px-4 gap-12">
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
            Software Engineer by day, automation connoisseur always. Usually found building tools for people who hate doing things manually—because I'm definitely one of them.
            <br/> Currently{" "}
            <Link url="https://regie.ai" external>
              optimizing sales with AI at Regie.ai
            </Link>
            , while trying to <span className="italic hover:animate-juggle inline-block cursor-pointer">juggle</span> with my inbox zero goals, some tiny side projects and a bit of writing on <Link url="https://nibbles.dev" external>nibbles.dev</Link> and sometimes on <Link url="/blog">this very blog</Link>!
          </p>
          <div
            className="animate-fade-in-up opacity-0 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              url="https://files.aashutosh.dev/resume.pdf#navpanes=0"
              text="View Résumé"
            />
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
            width={200}
            height={200}
            style={{ borderRadius: "1rem" }}
          />
        </div>
      </div>
    </Layout>
  </>
)

export default IndexPage
