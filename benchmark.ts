const mockAudioContext = class {
  destination = {}
  currentTime = 0
  createOscillator() {
    return { connect: () => {}, start: () => {}, stop: () => {}, frequency: { value: 0 } }
  }
  createGain() {
    return { connect: () => {}, gain: { value: 0 } }
  }
}

globalThis.window = {
  AudioContext: mockAudioContext
} as any

globalThis.navigator = {
  userAgent: "iPhone",
  vibrate: () => {}
} as any

import { hapticFeedback } from "./src/utils/index"

console.time("hapticFeedback")
for (let i = 0; i < 100000; i++) {
  hapticFeedback()
}
console.timeEnd("hapticFeedback")
