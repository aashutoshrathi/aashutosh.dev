import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { StaticImage } from "gatsby-plugin-image"
import gsap from "gsap"
import { useMediaQuery } from "usehooks-ts"

import { SEO } from "@components"
import { mediumHaptic } from "@utils"

const IndexPage: React.FC = () => {
  const imgWrapperRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const aboutRef = useRef<HTMLElement | null>(null)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(imgWrapperRef.current, {
      scale: 1.1,
      x: isDesktop ? 24 : 0,
      y: isDesktop ? 0 : -24,
      opacity: 0,
      ease: "power2.out",
      duration: 0.7,
    }).from(
      headingRef.current,
      {
        y: 20,
        opacity: 0,
        ease: "power1.out",
        duration: 0.5,
      },
      "<0.1"
    )

    if (aboutRef.current) {
      tl.from(aboutRef.current.children, {
        y: 12,
        opacity: 0,
        ease: "power1.out",
        stagger: 0.3,
      })
    }
  }, [])

  return (
    <>
      <SEO title="Home" />
      <main className="flex min-h-[calc(100vh-258px)] flex-col-reverse items-center justify-center gap-12 px-4 md:min-h-[calc(100vh-216px)] md:flex-row">
        <div className="text-center md:w-2/3 md:text-left">
          <h1 ref={headingRef} className="mb-8 text-3xl font-bold">
            Hey there, I'm Aashutosh! 👋
          </h1>
          <section
            ref={aboutRef}
            className="mb-8 text-balance text-lg tracking-wide"
          >
            <p className="mb-2">
              Software Engineer by day, automation connoisseur always. Usually
              found building tools for people who hate doing things
              manually—because I'm definitely one of them.
            </p>
            <p className="mb-6">
              <span>Currently </span>
              <OutboundLink
                href="https://regie.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
              >
                optimizing sales with AI at Regie.ai
              </OutboundLink>
              <span>
                , while trying to juggle with my inbox zero goals, some tiny
                side projects and a bit of writing on{" "}
              </span>
              <OutboundLink
                href="https://nibbles.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
              >
                nibbles.dev
              </OutboundLink>
              <span> and sometimes on </span>
              <Link
                to="/blog"
                className="relative inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
              >
                this very blog
              </Link>
              <span>!</span>
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <OutboundLink
                href="https://files.aashutosh.dev/resume.pdf#navpanes=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white no-underline transition-colors duration-200 ease-in-out hover:bg-blue-700 hover:no-underline focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-blue-400 dark:text-slate-900 dark:hover:bg-blue-300 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900"
                onClick={mediumHaptic}
              >
                View Résumé
              </OutboundLink>
            </div>
          </section>
        </div>

        <div ref={imgWrapperRef}>
          <StaticImage
            src="../images/square.png"
            alt="Aashutosh Rathi"
            placeholder="blurred"
            layout="constrained"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
      </main>
    </>
  )
}

export default IndexPage
