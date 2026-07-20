import React, { useEffect, useRef, useState } from "react"

import { GoGitMerge } from "react-icons/go"

import { AnimatedLink } from "@components"
import { fetchData } from "@utils"

import { Contribution } from "../types"

const GITHUB_USERNAME = "aashutoshrathi"
const CONTRIBUTIONS_URL = `https://api.github.com/search/issues?q=type:pr+is:merged+author:${GITHUB_USERNAME}+-user:${GITHUB_USERNAME}&sort=updated&order=desc&per_page=8`
const CACHE_KEY = "github-contributions"

const repoFullName = (repositoryUrl: string): string =>
  repositoryUrl.replace("https://api.github.com/repos/", "")

const formatMergedAt = (mergedAt?: string | null): string | null => {
  if (!mergedAt) return null
  return new Date(mergedAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

const loadCache = (): Contribution[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed as Contribution[]
    }
  } catch {}
  return null
}

const saveCache = (data: Contribution[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {}
}

const Contributions: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[] | null>(
    loadCache
  )
  const [failed, setFailed] = useState(false)
  const hasCached = useRef(contributions !== null)

  useEffect(() => {
    fetchData<{ items: Contribution[] }>(CONTRIBUTIONS_URL)
      .then((data) => {
        setContributions(data.items)
        saveCache(data.items)
      })
      .catch(() => {
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to fetch contributions.")
        }
        if (!hasCached.current) setFailed(true)
      })
  }, [])

  if (failed) {
    return (
      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Open Source Contributions</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Could not load contributions right now.
        </p>
      </section>
    )
  }

  if (!contributions || contributions.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">Open Source Contributions</h2>
      <ul className="space-y-3">
        {contributions.map((pr) => {
          const mergedAt = formatMergedAt(pr.pull_request?.merged_at)
          return (
            <li key={pr.id} className="flex items-start gap-3">
              <span
                className="mt-1 shrink-0 text-purple-600 dark:text-purple-400"
                title="Merged pull request"
                aria-label="Merged pull request">
                <GoGitMerge />
              </span>
              <div className="flex flex-grow flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <AnimatedLink href={pr.html_url}>{pr.title}</AnimatedLink>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {repoFullName(pr.repository_url)}
                  </span>
                </span>
                {mergedAt && (
                  <span className="shrink-0 text-sm text-gray-400 dark:text-gray-500">
                    {mergedAt}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Contributions
