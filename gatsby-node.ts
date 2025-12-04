import path from "path"

import { GatsbyNode } from "gatsby"

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
