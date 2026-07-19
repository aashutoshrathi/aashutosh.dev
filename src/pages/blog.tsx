import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { graphql, Link } from "gatsby"
import gsap from "gsap"

import { AnimatedLink, SEO } from "@components"
import { shouldReduceMotion } from "@utils"

export type MDXNode = {
  id: string
  excerpt: string
  fields: {
    timeToRead: number
  }
  frontmatter: {
    date: string
    description: string
    slug: string
    title: string
    ogImage?: string | null
  }
}

interface BlogIndexProps {
  data: {
    allMdx: {
      nodes: MDXNode[]
    }
  }
}

const BlogIndex: React.FC<BlogIndexProps> = ({ data }) => {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const postsRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (shouldReduceMotion()) return
    const tl = gsap.timeline()

    tl.from(headingRef.current, {
      y: -16,
      opacity: 0,
      ease: "power3.out",
      duration: 0.4,
    })

    if (postsRef.current) {
      tl.from(postsRef.current.children, {
        y: -8,
        opacity: 0,
        stagger: 0.02,
        ease: "power2.out",
        duration: 0.4,
      })
    }
  }, [])

  return (
    <>
      <SEO title="Blog" />
      <div className="py-8">
        <h1 ref={headingRef} className="mb-8 text-4xl font-bold">
          Blog
        </h1>
        <aside className="mb-10 flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-800">
          <p className="text-gray-600 dark:text-gray-300">
            📬 Like these? You&apos;ll love{" "}
            <span className="font-semibold">Nibbles</span> — my bite-sized tech
            newsletter.
          </p>
          <AnimatedLink
            href="https://nibbles.dev"
            className="shrink-0 font-semibold"
            aria-label="Subscribe to Nibbles newsletter">
            Subscribe at nibbles.dev →
          </AnimatedLink>
        </aside>
        <div ref={postsRef} className="space-y-8">
          {data.allMdx.nodes.map((post) => (
            <article key={post.id}>
              <header>
                <h2>
                  <Link
                    to={`/blog/${post.frontmatter.slug}`}
                    className="relative mb-1 text-2xl font-bold inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300">
                    {post.frontmatter.title}
                  </Link>
                </h2>
                <small className="opacity-80">
                  {post.frontmatter.date} · {post.fields.timeToRead} min read
                </small>
              </header>
              <section>
                <p className="mt-2">{post.frontmatter.description}</p>
              </section>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export default BlogIndex

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        excerpt
        fields {
          timeToRead
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          slug
        }
      }
    }
  }
`
