import { useEffect, useState } from "react"

const API_BASE_URL = process.env.GATSBY_API_URI

interface ViewCountResponse {
  slug: string
  views: number
}

/**
 * Custom hook to fetch and increment view count for a blog post
 * @param slug - The blog post slug
 * @returns Object containing view count and loading state
 */
export const useViewCount = (slug: string) => {
  const [viewCount, setViewCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!slug || typeof window === "undefined" || !API_BASE_URL) {
      setIsLoading(false)
      return
    }

    const fetchAndIncrementViews = async () => {
      try {
        // First, increment the view count
        const incrementResponse = await fetch(
          `${API_BASE_URL}views/${encodeURIComponent(slug)}`,
          {
            method: "POST",
          }
        )

        if (incrementResponse.ok) {
          const data: ViewCountResponse = await incrementResponse.json()
          setViewCount(data.views)
        } else {
          // If API fails, try to just fetch the count
          const getResponse = await fetch(
            `${API_BASE_URL}views/${encodeURIComponent(slug)}`
          )
          if (getResponse.ok) {
            const data: ViewCountResponse = await getResponse.json()
            setViewCount(data.views)
          }
        }
      } catch (error) {
        console.error("Failed to fetch view count:", error)
        // Silently fail - view count is not critical functionality
      } finally {
        setIsLoading(false)
      }
    }

    fetchAndIncrementViews()
  }, [slug])

  return { viewCount, isLoading }
}
