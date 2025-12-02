import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CodeBlock from "../components/CodeBlock"

const components = {
  pre: (props: any) => <CodeBlock {...props.children.props} />,
}

const BlogPostTemplate: React.FC<any> = ({ data, children }) => {
  const post = data.mdx

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="py-8">
        <div className="mb-8">
          <Link to="/blog/" className="text-link hover:text-link-hover">
            &larr; Back to Blog
          </Link>
        </div>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.frontmatter.title}</h1>
          <p className="text-base opacity-80">{post.frontmatter.date}</p>
        </header>
        <MDXProvider components={components}>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {children}
          </div>
        </MDXProvider>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
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
