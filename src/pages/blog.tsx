import React from "react"

import { graphql, Link } from "gatsby"

import SEO from "@components/seo"

const BlogIndex: React.FC<any> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <>
      <SEO title="Blog" />
      <div className="py-8">
        <h1 className="mb-8 text-4xl font-bold">Blog</h1>
        <div className="space-y-8">
          {posts.map((post: any) => (
            <article key={post.id}>
              <header>
                <h2 className="mb-1 text-2xl font-bold">
                  <Link to={`/blog/${post.frontmatter.slug}`}>
                    {post.frontmatter.title}
                  </Link>
                </h2>
                <small className="opacity-80">{post.frontmatter.date}</small>
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
