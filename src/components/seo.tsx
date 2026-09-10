import React from "react"

import { graphql, useStaticQuery } from "gatsby"

interface SiteQueryResult {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
      navigationString: string
      coverImage: string
      siteUrl: string
      social: Array<{
        name: string
        url: string
      }>
    }
  }
}

interface MetaTag {
  name?: string
  property?: string
  content: string
}

export interface SEOProps {
  description?: string
  image?: string | null
  lang?: string
  meta?: MetaTag[]
  /* Omit on the landing page so the title is just the site name */
  title?: string
}

const SEO: React.FC<SEOProps> = ({
  description = "",
  image = null,
  lang = "en",
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery<SiteQueryResult>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          navigationString
          coverImage
          siteUrl
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description

  /* Share cards should show the same title as the tab, not the bare page label */
  const pageTitle = title
    ? `${site.siteMetadata.navigationString}${title}`
    : site.siteMetadata.title

  /* Per-post images may be absolute URLs or site-relative paths */
  const metaImage = image
    ? image.startsWith("http")
      ? image
      : `${site.siteMetadata.siteUrl}${image}`
    : site.siteMetadata.coverImage

  const metaTags: MetaTag[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: pageTitle,
    },
    {
      property: `og:url`,
      content: `https://aashutosh.dev`,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:image`,
      content: metaImage,
    },
    {
      name: `twitter:card`,
      content: image ? `summary_large_image` : `summary`,
    },
    {
      property: `twitter:url`,
      content: `https://aashutosh.dev`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: pageTitle,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      property: `twitter:image`,
      content: metaImage,
    },
    ...meta,
  ]

  return (
    <>
      <html lang={lang} />
      <title>{pageTitle}</title>
      {metaTags.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
    </>
  )
}

export default SEO
