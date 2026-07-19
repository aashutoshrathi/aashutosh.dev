import path from "path"

import { GatsbyNode } from "gatsby"

const WORDS_PER_MINUTE = 200

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions }) => {
  if (node.internal.type === "Mdx") {
    const content = (node.internal.content as string | undefined) ?? ""
    const words = content.split(/\s+/).filter(Boolean).length
    actions.createNodeField({
      node,
      name: "timeToRead",
      value: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    })
  }
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
      type Mdx implements Node {
        frontmatter: MdxFrontmatter
        fields: MdxFields
      }
      type MdxFrontmatter {
        ogImage: String
      }
      type MdxFields {
        timeToRead: Int
      }
    `)
  }

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const result = await graphql<any>(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const postTemplate = path.resolve(`./src/templates/blog-post.tsx`)

  result.data.allMdx.nodes.forEach((node: any) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    })
  })
}
