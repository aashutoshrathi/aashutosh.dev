import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test"
import { fetchData, hapticFeedback } from "./index"

describe("fetchData", () => {
  let originalWindow: typeof globalThis.window
  let originalFetch: typeof globalThis.fetch

  beforeEach(() => {
    originalWindow = globalThis.window
    originalFetch = globalThis.fetch
  })

  afterEach(() => {
    globalThis.window = originalWindow
    globalThis.fetch = originalFetch
  })

  it("should throw an error if window is undefined", async () => {
    // @ts-ignore
    delete (globalThis as any).window

    await expect(fetchData("https://api.example.com")).rejects.toThrow(
      "fetchData can only be called on the client side",
    )
  })

  it("should return parsed JSON when window is defined", async () => {
    // @ts-ignore
    globalThis.window = {}

    const mockResponse = { data: "success" }
    globalThis.fetch = mock().mockResolvedValue({
      json: mock().mockResolvedValue(mockResponse),
    } as any)

    const result = await fetchData("https://api.example.com")
    expect(globalThis.fetch).toHaveBeenCalledWith("https://api.example.com")
    expect(result).toEqual(mockResponse)
  })
})

describe("hapticFeedback", () => {
  let originalWindow: typeof globalThis.window
  let originalNavigator: typeof globalThis.navigator

  beforeEach(() => {
    originalWindow = globalThis.window
    originalNavigator = globalThis.navigator
  })

  afterEach(() => {
    globalThis.window = originalWindow
    globalThis.navigator = originalNavigator
  })

  it("should do nothing if window is undefined", () => {
    // @ts-ignore
    delete (globalThis as any).window
    expect(() => hapticFeedback()).not.toThrow()
  })

  it("should use AudioContext on iOS with number pattern", () => {
    const mockStop = mock()
    const mockAudioContext = mock().mockImplementation(() => ({
      createOscillator: mock().mockReturnValue({
        connect: mock(),
        frequency: { value: 0 },
        start: mock(),
        stop: mockStop,
      }),
      createGain: mock().mockReturnValue({
        connect: mock(),
        gain: { value: 0 },
      }),
      destination: {},
      currentTime: 0,
    }))

    // @ts-ignore
    globalThis.window = { AudioContext: mockAudioContext }
    // @ts-ignore
    globalThis.navigator = { userAgent: "iPhone" }

    hapticFeedback(15)
    expect(mockAudioContext).toHaveBeenCalled()
    expect(mockStop).toHaveBeenCalledWith(0.015) // 0 + 15/1000
  })

  it("should use webkitAudioContext on iOS with array pattern", () => {
    const mockStop = mock()
    const mockAudioContext = mock().mockImplementation(() => ({
      createOscillator: mock().mockReturnValue({
        connect: mock(),
        frequency: { value: 0 },
        start: mock(),
        stop: mockStop,
      }),
      createGain: mock().mockReturnValue({
        connect: mock(),
        gain: { value: 0 },
      }),
      destination: {},
      currentTime: 0,
    }))

    // @ts-ignore
    globalThis.window = { webkitAudioContext: mockAudioContext }
    // @ts-ignore
    globalThis.navigator = { userAgent: "iPad" }

    hapticFeedback([25, 10, 25])
    expect(mockAudioContext).toHaveBeenCalled()
    expect(mockStop).toHaveBeenCalledWith(0.025) // 0 + 25/1000
  })

  it("should silently fail on iOS if audio context throws an error", () => {
    const mockAudioContext = mock().mockImplementation(() => {
      throw new Error("AudioContext not supported")
    })

    // @ts-ignore
    globalThis.window = { AudioContext: mockAudioContext }
    // @ts-ignore
    globalThis.navigator = { userAgent: "iPhone" }

    expect(() => hapticFeedback(10)).not.toThrow()
    expect(mockAudioContext).toHaveBeenCalled()
  })

  it("should use navigator.vibrate if supported on non-iOS", () => {
    const mockVibrate = mock()
    // @ts-ignore
    globalThis.window = {}
    // @ts-ignore
    globalThis.navigator = {
      userAgent: "Android",
      vibrate: mockVibrate,
    }

    hapticFeedback(30)
    expect(mockVibrate).toHaveBeenCalledWith(30)
  })

  it("should do nothing on non-iOS if vibrate is not supported", () => {
    // @ts-ignore
    globalThis.window = {}
    // @ts-ignore
    globalThis.navigator = { userAgent: "Android" }

    expect(() => hapticFeedback(10)).not.toThrow()
  })
})
