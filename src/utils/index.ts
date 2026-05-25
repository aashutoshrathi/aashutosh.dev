const isIOS = () => {
  if (typeof window === "undefined") return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  )
}

let sharedAudioContext: AudioContext | null = null

// iOS fallback: subtle audio feedback
const playTapSound = (duration: number) => {
  if (typeof window === "undefined") return
  try {
    if (!sharedAudioContext) {
      sharedAudioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )()
    }
    const oscillator = sharedAudioContext.createOscillator()
    const gainNode = sharedAudioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(sharedAudioContext.destination)

    oscillator.frequency.value = 1000
    gainNode.gain.value = 0.01 // Very quiet

    oscillator.start()
    oscillator.stop(sharedAudioContext.currentTime + duration / 1000)
  } catch (e) {
    // Silently fail if audio context not available
  }
}

export const hapticFeedback = (pattern: number | number[] = 10) => {
  if (typeof window === "undefined") return

  // iOS doesn't support vibration API - use subtle audio feedback instead
  if (isIOS()) {
    const duration = typeof pattern === "number" ? pattern : pattern[0]
    playTapSound(duration)
    return
  }

  if ("vibrate" in navigator) {
    navigator.vibrate(pattern)
  }
}

export const lightHaptic = () => hapticFeedback(10)
export const mediumHaptic = () => hapticFeedback(20)
export const heavyHaptic = () => hapticFeedback(30)

export const titleCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\b(\w)/g, (s: string) => s.toUpperCase())
    .split(" ")[0]

export const fetchData = async <T>(url: string): Promise<T> => {
  if (typeof window === "undefined") {
    throw new Error("fetchData can only be called on the client side")
  }
  const response = await fetch(url)
  return response.json()
}
