import React from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type SpotifyData = {
  isPlaying: boolean
  title?: string
  artist?: string
  url?: string
  image?: string
}

const SPOTIFY_USER_ID = "qrj9kefbm3lg85izu15i2q333"

const SpotifyNow: React.FC = () => {
  const { data } = useSWR<SpotifyData>(`/api/spotify-now?user=${SPOTIFY_USER_ID}`, fetcher, {
    refreshInterval: 30000,
    shouldRetryOnError: false,
  })

  if (!data) {
    return (
      <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-500 dark:bg-slate-800 dark:text-gray-400">
        <a
          href={`https://open.spotify.com/user/${SPOTIFY_USER_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400">
          Spotify
        </a>{" "}
        - not playing right now, but you can read{" "}
        <a href="https://nibbles.dev" className="text-blue-600 dark:text-blue-400">
          nibbles
        </a>{" "}
        instead
      </div>
    )
  }

  if (!data.isPlaying) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-slate-800">
        <span className="text-lg">🎧</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Not playing right now</p>
          {data.title && (
            <p className="truncate text-xs text-gray-500">Last: {data.title} - {data.artist}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700">
      {data.image && <img src={data.image} alt="" width={40} height={40} className="rounded" />}
      <div className="min-w-0">
        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-green-600">
          <span className="inline-block size-2 animate-pulse rounded-full bg-green-500" /> Now playing
        </p>
        <p className="truncate text-sm font-medium">{data.title}</p>
        <p className="truncate text-xs text-gray-500">{data.artist}</p>
      </div>
    </a>
  )
}

export default SpotifyNow
// To make it live, add Netlify function at netlify/functions/spotify-now.ts that
// uses SPOTIFY_REFRESH_TOKEN to call https://api.spotify.com/v1/me/player/currently-playing
// and returns {isPlaying, title, artist, url, image}
