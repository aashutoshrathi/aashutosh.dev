import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet"

import { MetaTag, SEOProps, SiteQueryResult } from "../types"

const SEO: React.FC<SEOProps> = ({
  description = "",
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
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description

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
      content: `${site.siteMetadata.coverImage}`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
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
      content: `${site.siteMetadata.coverImage}`,
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
