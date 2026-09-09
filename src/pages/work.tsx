import React, { useEffect, useState } from "react"

import GitHubCalendar from "react-github-calendar"
import { Tooltip as ReactTooltip } from "react-tooltip"

import { Contributions, FreeGames, Projects, SEO } from "@components"

const WorkPage: React.FC = () => {
  const [monthsToShow, setMonthsToShow] = useState(12)

  useEffect(() => {
    const calculateMonths = () => {
      const width = window.innerWidth
      const padding = 32 // Account for page padding
      const availableWidth = width - padding
      const monthWidth = 90 // Approx width per month

      // Calculate how many months can fit, max 12
      const months = Math.floor(availableWidth / monthWidth)
      return Math.min(Math.max(months, 1), 12)
    }

    const updateMonths = () => {
      setMonthsToShow(calculateMonths())
    }

    updateMonths()
    window.addEventListener("resize", updateMonths)

    return () => window.removeEventListener("resize", updateMonths)
  }, [])

  return (
    <>
      <div className="mx-auto mt-6 max-w-3xl px-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Work &amp; Play</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Code that shipped, games you can play tonight, and the commit graph
          to prove I was there.
        </p>
      </div>
      <div className="my-8 flex justify-center text-center overflow-x-auto">
        <GitHubCalendar
          username="aashutoshrathi"
          fontSize={16}
          blockSize={14}
          hideColorLegend
          hideTotalCount
          transformData={(data) => {
            if (monthsToShow < 12) {
              const today = new Date()
              const cutoffDate = new Date()
              cutoffDate.setMonth(cutoffDate.getMonth() - monthsToShow)

              // Find the Sunday on or before the cutoff date
              const startSunday = new Date(cutoffDate)
              startSunday.setDate(cutoffDate.getDate() - cutoffDate.getDay())

              // Find the Saturday after today (end of current week)
              const endSaturday = new Date(today)
              endSaturday.setDate(today.getDate() + (6 - today.getDay()))

              return data.filter((day) => {
                const date = new Date(day.date)
                return date >= startSunday && date <= endSaturday
              })
            }
            return data
          }}>
          <ReactTooltip delayShow={10} className="custom-tooltip" />
        </GitHubCalendar>
      </div>
      <FreeGames />
      <div className="mt-12">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Open Source</h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          A few favorites from GitHub - sorted by recent activity or stars.
          Contributions live below.
        </p>
        <Projects />
      </div>
      <Contributions />
    </>
  )
}

export default WorkPage

export const Head = () => <SEO title="Projects" />
