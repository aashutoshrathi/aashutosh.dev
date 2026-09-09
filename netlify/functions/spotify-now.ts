import type { Handler } from "@netlify/functions"

const SPOTIFY_USER_ID = "qrj9kefbm3lg85izu15i2q333"

export const handler: Handler = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  // If no Spotify credentials are configured, return not playing
  // This avoids 404 and lets the widget degrade to the profile link
  if (!clientId || !clientSecret || !refreshToken) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        isPlaying: false,
        title: null,
        artist: null,
        url: `https://open.spotify.com/user/${SPOTIFY_USER_ID}`,
        image: null,
      }),
    }
  }

  try {
    // Refresh access token
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    })

    if (!tokenRes.ok) {
      throw new Error(`token refresh failed: ${tokenRes.status}`)
    }

    const tokenData = (await tokenRes.json()) as { access_token: string }
    const accessToken = tokenData.access_token

    // Fetch currently playing
    const nowRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (nowRes.status === 204 || nowRes.status === 202) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30" },
        body: JSON.stringify({ isPlaying: false }),
      }
    }

    if (!nowRes.ok) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30" },
        body: JSON.stringify({ isPlaying: false }),
      }
    }

    const data = (await nowRes.json()) as any
    if (!data?.item) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30" },
        body: JSON.stringify({ isPlaying: false }),
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        isPlaying: data.is_playing ?? true,
        title: data.item.name,
        artist: (data.item.artists || []).map((a: any) => a.name).join(", "),
        url: data.item.external_urls?.spotify || `https://open.spotify.com/user/${SPOTIFY_USER_ID}`,
        image: data.item.album?.images?.[0]?.url || null,
      }),
    }
  } catch {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" },
      body: JSON.stringify({ isPlaying: false }),
    }
  }
}
