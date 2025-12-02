export const hapticFeedback = (pattern: number | number[] = 10) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export const lightHaptic = () => hapticFeedback(10)
export const mediumHaptic = () => hapticFeedback(20)
export const heavyHaptic = () => hapticFeedback(30)
