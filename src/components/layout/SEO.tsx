import React from "react"
import Head from "next/head"

interface SEOProps {
  title: string
  description?: string
  lang?: string
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "I solve problems using code. Currently building stuff @regie.ai. Lead Dev communities at IIITV in past. Feel free to ping me for discussions on Tech || Cosmos",
  lang = "en"
}) => {
  const siteTitle = "Aashutosh Rathi | Developer"
  const navigationString = "Aashutosh Rathi | "
  const coverImage = "https://files.aashutosh.dev/pale_blue_dot.jpg"
  const author = "@AashutoshRathi"

  return (
    <Head>
      <html lang={lang} />
      <title>{`${navigationString}${title}`}</title>
      
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="https://aashutosh.dev" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={coverImage} />
      
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:url" content="https://aashutosh.dev" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:image" content={coverImage} />
    </Head>
  )
}

export default SEO