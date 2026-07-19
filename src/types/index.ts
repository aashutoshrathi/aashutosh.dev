export interface Project {
  id: number
  name: string
  description: string | null
  language: string | null
  html_url: string
  homepage: string | null
  stargazers_count?: number
  fork?: boolean
  archived?: boolean
  pushed_at?: string
}

export interface Contribution {
  id: number
  title: string
  html_url: string
  repository_url: string
  pull_request?: {
    merged_at?: string | null
  }
}

export type CommitType = "feat" | "ship" | "chore" | "fix" | "init"

export interface Commit {
  hash: string
  type: CommitType
  scope: string
  message: string
  details: readonly string[]
  date: string
}
