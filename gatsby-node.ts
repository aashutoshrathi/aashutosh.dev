import fs from "fs"
import path from "path"

import { GatsbyNode } from "gatsby"

import { parseOg, stripSiteName } from "./scripts/lib/og.mjs"
import { previewKey } from "./src/utils/preview-key.mjs"

const WORDS_PER_MINUTE = 200

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions }) => {
  if (node.internal.type === "Mdx") {
    // gatsby-plugin-mdx keeps the source in `body`; internal.content is unset
    const content =
      (node.body as string | undefined) ??
      (node.internal.content as string | undefined) ??
      ""
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

/*
 * Hover-card data for links to this site's own pages, read back from the
 * HTML just built (so cards say exactly what the page's SEO tags say) plus
 * date and read time for posts. External links are cached separately by
 * scripts/cache-og.mjs; the browser loads both files on the first hover.
 */
export const onPostBuild: GatsbyNode["onPostBuild"] = async ({
  graphql,
  reporter,
}) => {
  const result = await graphql<any>(`
    query {
      allSitePage {
        nodes {
          path
        }
      }
      allMdx {
        nodes {
          fields {
            timeToRead
          }
          frontmatter {
            slug
            title
            ogImage
            date(formatString: "MMM D, YYYY")
          }
        }
      }
    }
  `)
  if (result.errors || !result.data) {
    reporter.warn("link previews: could not query pages, skipping")
    return
  }

  const posts = new Map<string, any>(
    result.data.allMdx.nodes.map((node: any) => [
      previewKey(`/blog/${node.frontmatter.slug}`),
      node,
    ])
  )
  const links: Record<string, Record<string, unknown>> = {}
  for (const { path: pagePath } of result.data.allSitePage.nodes) {
    if (/^\/(404|dev-404-page|callback)\b/.test(pagePath)) continue
    const key = previewKey(pagePath)
    if (!key) continue
    let html: string
    try {
      html = await fs.promises.readFile(
        path.join("public", pagePath, "index.html"),
        "utf8"
      )
    } catch {
      continue
    }
    const og = parseOg(html, `https://aashutosh.dev${pagePath}`)
    if (!og) continue
    const post = posts.get(key)
    links[key] = {
      title:
        post?.frontmatter.title ?? stripSiteName(og.title, "aashutosh.dev"),
      ...(og.description && { description: og.description }),
      site: "aashutosh.dev",
      ...(post && {
        date: post.frontmatter.date,
        readTime: post.fields.timeToRead,
      }),
      // Pages without their own image share the site cover; skip that one
      ...(post?.frontmatter.ogImage && { image: post.frontmatter.ogImage }),
    }
  }

  await fs.promises.mkdir(path.join("public", "og-cache"), { recursive: true })
  await fs.promises.writeFile(
    path.join("public", "og-cache", "pages.json"),
    JSON.stringify({ links })
  )
  reporter.info(`link previews: wrote ${Object.keys(links).length} page cards`)
}
