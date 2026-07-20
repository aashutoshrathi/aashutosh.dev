import React from "react"

import { render } from "@testing-library/react"
import { beforeEach, describe, expect, it, mock } from "bun:test"
import Helmet from "react-helmet"

import SEO from "./seo"

// Mock Gatsby's useStaticQuery
const mockUseStaticQuery = mock().mockReturnValue({
  site: {
    siteMetadata: {
      title: "Site Title",
      description: "Site Description",
      author: "Site Author",
      navigationString: "Site Navigation | ",
      coverImage: "site-cover.jpg",
    },
  },
})

mock.module("gatsby", () => ({
  useStaticQuery: mockUseStaticQuery,
  graphql: (strings: TemplateStringsArray) => strings[0],
}))

describe("SEO component", () => {
  beforeEach(() => {
    mockUseStaticQuery.mockClear()
  })

  it("renders with default props and fallback to siteMetadata", () => {
    render(<SEO title="Page Title" />)

    const helmet = Helmet.peek()
    expect(helmet.title).toBe("Site Navigation | Page Title")

    // Check default description fallback
    const metaTags = helmet.metaTags
    const descriptionTag = metaTags.find(
      (tag: any) => tag.name === "description"
    )
    expect(descriptionTag?.content).toBe("Site Description")

    // Check specific custom tags
    const twitterCreatorTag = metaTags.find(
      (tag: any) => tag.name === "twitter:creator"
    )
    expect(twitterCreatorTag?.content).toBe("Site Author")
  })

  it("merges custom meta tags and overrides defaults where specified", () => {
    const customMeta = [
      { name: "description", content: "Custom Description" },
      { property: "og:type", content: "article" },
      { name: "custom", content: "custom-value" },
    ]
    render(<SEO title="Another Title" meta={customMeta} />)

    const helmet = Helmet.peek()
    const metaTags = helmet.metaTags

    // Helmet deals with overrides depending on the tag properties.
    // For arrays, custom description should be the content of our specific tag.
    const descriptionTags = metaTags.filter(
      (tag: any) => tag.name === "description"
    )
    expect(descriptionTags[descriptionTags.length - 1].content).toBe(
      "Custom Description"
    )

    const customTag = metaTags.find((tag: any) => tag.name === "custom")
    expect(customTag?.content).toBe("custom-value")
  })

  it("uses provided description instead of fallback", () => {
    render(<SEO title="Page Title" description="Explicit Description" />)

    const helmet = Helmet.peek()
    const metaTags = helmet.metaTags
    const descriptionTag = metaTags.find(
      (tag: any) => tag.name === "description"
    )
    expect(descriptionTag?.content).toBe("Explicit Description")
  })

  it("uses provided lang or falls back to 'en'", () => {
    render(<SEO title="Page Title" />)
    let helmet = Helmet.peek()
    expect(helmet.htmlAttributes?.lang).toBe("en")

    render(<SEO title="Page Title" lang="fr" />)
    helmet = Helmet.peek()
    expect(helmet.htmlAttributes?.lang).toBe("fr")
  })
})
