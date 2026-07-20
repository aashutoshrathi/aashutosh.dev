import React from "react"

import { render } from "@testing-library/react"
import { beforeEach, describe, expect, it, mock } from "bun:test"

import SEO from "./seo"

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

  it("renders title with navigation string prefix", () => {
    const { container } = render(<SEO title="Page Title" />)
    expect(container.querySelector("title")?.textContent).toBe(
      "Site Navigation | Page Title"
    )
  })

  it("renders default description from siteMetadata", () => {
    const { container } = render(<SEO title="Page Title" />)
    const description = container.querySelector('meta[name="description"]')
    expect(description?.getAttribute("content")).toBe("Site Description")
  })

  it("renders lang attribute on html element", () => {
    const { container } = render(<SEO title="Page Title" />)
    const html = container.querySelector("html")
    expect(html?.getAttribute("lang")).toBe("en")
  })

  it("uses provided lang", () => {
    const { container } = render(<SEO title="Page Title" lang="fr" />)
    const html = container.querySelector("html")
    expect(html?.getAttribute("lang")).toBe("fr")
  })

  it("uses provided description instead of fallback", () => {
    const { container } = render(
      <SEO title="Page Title" description="Explicit Description" />
    )
    const description = container.querySelector('meta[name="description"]')
    expect(description?.getAttribute("content")).toBe("Explicit Description")
  })

  it("merges custom meta tags", () => {
    const customMeta = [
      { name: "custom", content: "custom-value" },
    ]
    const { container } = render(
      <SEO title="Page Title" meta={customMeta} />
    )
    const custom = container.querySelector('meta[name="custom"]')
    expect(custom?.getAttribute("content")).toBe("custom-value")
  })
})
