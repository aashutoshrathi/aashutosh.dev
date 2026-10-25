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

export interface OgVideo {
  /* Direct link to an MP4 file, not a player page */
  url: string
  width: number
  height: number
}

export interface SEOProps {
  description?: string
  image?: string | null
  lang?: string
  meta?: MetaTag[]
  /* Omit on the landing page so the title is just the site name */
  title?: string
  /* Plays inline in iMessage, Discord and Telegram; other previews keep og:image */
  video?: OgVideo | null
}

const SEO: React.FC<SEOProps> = ({
  description = "",
  image = null,
  lang = "en",
  meta = [],
  title,
  video = null,
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

  /* Per-page media may be absolute URLs or site-relative paths */
  const toAbsoluteUrl = (url: string) =>
    url.startsWith("http") ? url : `${site.siteMetadata.siteUrl}${url}`

  const metaImage = image ? toAbsoluteUrl(image) : site.siteMetadata.coverImage

  const videoTags: MetaTag[] = video
    ? [
        { property: `og:video`, content: toAbsoluteUrl(video.url) },
        { property: `og:video:secure_url`, content: toAbsoluteUrl(video.url) },
        { property: `og:video:type`, content: `video/mp4` },
        { property: `og:video:width`, content: String(video.width) },
        { property: `og:video:height`, content: String(video.height) },
      ]
    : []

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
    ...videoTags,
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
