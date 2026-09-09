import React from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error("chess fetch failed")
  return r.json()
})

type ChessStats = {
  chess_rapid?: { last?: { rating: number } }
  chess_blitz?: { last?: { rating: number } }
  tactics?: { highest?: { rating: number } }
}

// Replace with your Chess.com username
const USERNAME = "aashutoshrathi"

const ChessWidget: React.FC = () => {
  const { data } = useSWR<ChessStats>(`https://api.chess.com/pub/player/${USERNAME}/stats`, fetcher, {
    refreshInterval: 3600000,
    shouldRetryOnError: false,
  })

  if (!data) return null
  const rapid = data.chess_rapid?.last?.rating
  const blitz = data.chess_blitz?.last?.rating
  const puzzle = data.tactics?.highest?.rating

  return (
    <div className="rounded-lg bg-gray-50 p-4 dark:bg-slate-800">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">Chess.com</p>
      <div className="flex gap-3 text-sm">
        {rapid && <span>Rapid <b>{rapid}</b></span>}
        {blitz && <span>Blitz <b>{blitz}</b></span>}
        {puzzle && <span>Puzzle <b>{puzzle}</b></span>}
      </div>
      <a href={`https://www.chess.com/member/${USERNAME}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-blue-600 dark:text-blue-400">
        View profile
      </a>
    </div>
  )
}

export default ChessWidget
