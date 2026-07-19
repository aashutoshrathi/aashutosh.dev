import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet"

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
  title: string
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
      content: title,
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
      content: title,
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
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`${site.siteMetadata.navigationString}%s`}
      meta={metaTags}
    />
  )
}

export default SEO
