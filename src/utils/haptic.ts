const isIOS = () => {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

// iOS fallback: subtle audio feedback
const playTapSound = (duration: number) => {
  if (typeof window === 'undefined') return
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 1000
    gainNode.gain.value = 0.01 // Very quiet
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + duration / 1000)
  } catch (e) {
    // Silently fail if audio context not available
  }
}

export const hapticFeedback = (pattern: number | number[] = 10) => {
  if (typeof window === 'undefined') return
  
  // iOS doesn't support vibration API - use subtle audio feedback instead
  if (isIOS()) {
    const duration = typeof pattern === 'number' ? pattern : pattern[0]
    playTapSound(duration)
    return
  }
  
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export const lightHaptic = () => hapticFeedback(10)
export const mediumHaptic = () => hapticFeedback(20)
export const heavyHaptic = () => hapticFeedback(30)
