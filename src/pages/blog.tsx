import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex: React.FC<any> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="Writings" />
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-8">Writings</h1>
        <div className="space-y-8">
          {posts.map((post: any) => (
            <article key={post.id}>
              <header>
                <h2 className="text-2xl font-bold mb-1">
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
    </Layout>
  )
}

export default BlogIndex

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
