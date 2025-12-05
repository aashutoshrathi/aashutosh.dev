import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { MDXProvider } from "@mdx-js/react"
import { graphql, Link } from "gatsby"
import gsap from "gsap"

import { CodeBlock, SEO } from "@components"

import { MDXNode } from "../pages/blog"

const components = {
  pre: (props: any) => <CodeBlock {...props.children.props} />,
}

interface BlogPostTemplateProps {
  data: {
    mdx: MDXNode
  }
  children: React.ReactNode
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  data,
  children,
}) => {
  const post = data.mdx

  const backRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    if (titleRef.current) {
      tl.from(titleRef.current.children, {
        y: -12,
        opacity: 0,
        stagger: 0.04,
        ease: "power3.out",
        duration: 0.4,
      })
    }

    tl.from(backRef.current, {
      y: 8,
      opacity: 0,
      ease: "power3.out",
      duration: 0.2,
    }).from(
      contentRef.current,
      {
        y: -8,
        opacity: 0,
        ease: "power3.out",
        duration: 0.4,
      },
      "<"
    )
  }, [])

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="py-8">
        <div ref={backRef} className="mb-8">
          <Link
            to="/blog"
            className="relative text-sm inline font-sans text-blue-600 no-underline transition-colors duration-200 before:absolute before:bottom-0 before:h-px before:w-0 before:bg-current before:transition-all before:content-[''] hover:text-blue-700 hover:no-underline hover:before:w-full focus:outline-none focus-visible:before:w-full dark:text-blue-400 dark:hover:text-blue-300"
          >
            &larr; Back to Blog
          </Link>
        </div>
        <header ref={titleRef} className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">{post.frontmatter.title}</h1>
          <p className="text-base opacity-80">{post.frontmatter.date}</p>
        </header>
        <MDXProvider components={components}>
          <div
            ref={contentRef}
            className="prose prose-lg max-w-none dark:prose-invert"
          >
            {children}
          </div>
        </MDXProvider>
      </article>
    </>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      excerpt
    }
  }
`

export default BlogPostTemplate
