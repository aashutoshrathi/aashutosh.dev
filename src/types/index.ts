export interface Project {
  id: number
  name: string
  description: string | null
  language: string | null
  html_url: string
  homepage: string
  stargazers_count?: number
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
