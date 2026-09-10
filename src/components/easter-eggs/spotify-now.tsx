import React from "react"
import useSWR from "swr"

const fetcher = async (url: string) => {
  const r = await fetch(url)
  if (!r.ok) return null
  return r.json()
}

type SpotifyData = {
  isPlaying: boolean
  title?: string
  artist?: string
  url?: string
  image?: string
}

const SPOTIFY_USER_ID = "qrj9kefbm3lg85izu15i2q333"

const SpotifyNow: React.FC = () => {
  const { data } = useSWR<SpotifyData>(`/.netlify/functions/spotify-now?user=${SPOTIFY_USER_ID}`, fetcher, {
    refreshInterval: 30000,
    shouldRetryOnError: false,
  })

  if (!data || !data.isPlaying) return null

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700">
      {data.image && <img src={data.image} alt="" width={40} height={40} className="rounded" />}
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-green-600">
          <span className="inline-block size-2 animate-pulse rounded-full bg-green-500" /> Now playing
        </p>
        <p className="truncate text-sm font-medium">{data.title}</p>
        <p className="truncate text-xs text-gray-500">{data.artist}</p>
      </div>
      <span className="shrink-0 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white transition group-hover:bg-green-600">
        Listen Along
      </span>
    </a>
  )
}

export default SpotifyNow
// To make it live, add Netlify function at netlify/functions/spotify-now.ts that
// uses SPOTIFY_REFRESH_TOKEN to call https://api.spotify.com/v1/me/player/currently-playing
// and returns {isPlaying, title, artist, url, image}
