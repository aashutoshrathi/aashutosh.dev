export interface Project {
  id: number
  name: string
  description: string | null
  language: string | null
  html_url: string
  homepage: string
  stargazers_count?: number
}

export interface SiteMetadata {
  title: string
  description: string
  author: string
  navigationString: string
  coverImage: string
  social: Array<{
    name: string
    url: string
  }>
}

export interface MetaTag {
  name?: string
  property?: string
  content: string
}

export interface SEOProps {
  description?: string
  lang?: string
  meta?: MetaTag[]
  title: string
}

export interface ProjectCardProps {
  project: Project
}

export interface IconProps {
  url?: string
  label: string
  width?: string
  height?: string
}

export interface LayoutProps {
  children: React.ReactNode
}

export interface SiteQueryResult {
  site: {
    siteMetadata: SiteMetadata
  }
}
