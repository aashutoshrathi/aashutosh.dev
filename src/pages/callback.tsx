import React from "react"

import { SEO } from "@components"

const CallbackPage: React.FC = () => {
  const [code, setCode] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const c = params.get("code")
    const e = params.get("error")
    if (c) setCode(c)
    if (e) setError(e)
  }, [])

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold">Spotify Callback</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        This page captures the <code>code</code> from Spotify and you can copy it to exchange for a refresh token. It is served over https as required.
      </p>
      <div className="mt-6 rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-slate-800">
        {code ? (
          <>
            <p className="mb-2 font-semibold text-green-600">Copy this code:</p>
            <p className="break-all rounded bg-white p-2 dark:bg-slate-900">{code}</p>
            <p className="mt-4 text-xs text-gray-500">
              Now run the curl exchange with this code and your Client ID/Secret, or paste it to me and I will generate the refresh token.
            </p>
          </>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <p className="text-gray-500">No code found. Did you come from Spotify authorize?</p>
        )}
      </div>
      <p className="mt-6 text-xs text-gray-400">
        Make sure your Spotify app has Redirect URI set to <code>https://aashutosh.dev/callback</code> exactly.
      </p>
    </main>
  )
}

export default CallbackPage

export const Head = () => <SEO title="Callback" />
