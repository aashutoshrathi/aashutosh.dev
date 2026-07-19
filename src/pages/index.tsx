import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { StaticImage } from "gatsby-plugin-image"
import gsap from "gsap"
import { Tooltip as ReactTooltip } from "react-tooltip"
import { useMediaQuery } from "usehooks-ts"

import { AnimatedLink, SEO } from "@components"
import { mediumHaptic, shouldReduceMotion } from "@utils"

const IndexPage: React.FC = () => {
  const imgWrapperRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const aboutRef = useRef<HTMLElement | null>(null)
  const juggleRef = useRef<HTMLSpanElement | null>(null)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  useGSAP(() => {
    if (shouldReduceMotion()) return
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

    // Juggle animation on hover
    if (juggleRef.current) {
      const juggleElement = juggleRef.current
      const juggleTimeline = gsap.timeline({ paused: true, repeat: -1 })

      juggleTimeline
        .to(juggleElement, {
          y: -8,
          rotation: -5,
          duration: 0.15,
          ease: "power1.inOut",
        })
        .to(juggleElement, {
          y: -12,
          rotation: 0,
          duration: 0.15,
          ease: "power1.inOut",
        })
        .to(juggleElement, {
          y: -8,
          rotation: 5,
          duration: 0.15,
          ease: "power1.inOut",
        })
        .to(juggleElement, {
          y: 0,
          rotation: 0,
          duration: 0.15,
          ease: "power1.inOut",
        })

      const handleMouseEnter = () => juggleTimeline.play()
      const handleMouseLeave = () => {
        juggleTimeline.pause()
        gsap.to(juggleElement, {
          y: 0,
          rotation: 0,
          duration: 0.2,
          ease: "power1.out",
        })
      }

      juggleElement.addEventListener("mouseenter", handleMouseEnter)
      juggleElement.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        juggleElement.removeEventListener("mouseenter", handleMouseEnter)
        juggleElement.removeEventListener("mouseleave", handleMouseLeave)
        juggleTimeline.kill()
      }
    }
  }, [])

  return (
    <>
      <SEO title="Home" />
      <ReactTooltip
        id="em-dash-tooltip"
        place="top"
        className="!rounded-lg !bg-slate-800 !text-slate-50 dark:!bg-slate-200 dark:!text-slate-900"
      />
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
              found building tools for people who hate doing things manually
              <span
                data-tooltip-id="em-dash-tooltip"
                data-tooltip-content="not AI generated"
                aria-label="not AI generated"
                className="cursor-help"
              >
                —
              </span>
              because I'm definitely one of them.
            </p>
            <p className="mb-6">
              <span>Currently </span>
              <AnimatedLink href="https://regie.ai">
                optimizing sales with AI at Regie.ai
              </AnimatedLink>
              <span>
                , while trying to{" "}
                <span ref={juggleRef} className="inline-block cursor-default">
                  juggle
                </span>{" "}
                with my inbox zero goals, some tiny side projects and a bit of
                writing on{" "}
              </span>
              <AnimatedLink href="https://nibbles.dev">
                nibbles.dev
              </AnimatedLink>
              <span> and sometimes on </span>
              <AnimatedLink to="/blog">this very blog</AnimatedLink>
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
