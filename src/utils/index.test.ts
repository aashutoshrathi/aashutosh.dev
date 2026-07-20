import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"

import { fetchData, hapticFeedback, titleCase } from "./index"

describe("titleCase", () => {
  it("should capitalize a single word", () => {
    expect(titleCase("hello")).toBe("Hello")
    expect(titleCase("WORLD")).toBe("World")
  })

  it("should return only the first segment for multi-word strings", () => {
    expect(titleCase("hello world")).toBe("Hello")
    expect(titleCase("foo bar baz")).toBe("Foo")
  })

  it("should handle mixed case strings correctly", () => {
    expect(titleCase("hElLo")).toBe("Hello")
    expect(titleCase("jAvAsCrIpT")).toBe("Javascript")
  })

  it("should return an empty string for an empty input", () => {
    expect(titleCase("")).toBe("")
  })

  it("should return an empty string for inputs with leading whitespace", () => {
    expect(titleCase("  leading space")).toBe("")
  })

  it("should handle special characters correctly", () => {
    expect(titleCase("c++")).toBe("C++")
    expect(titleCase("c#")).toBe("C#")
  })
})

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
      "fetchData can only be called on the client side"
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
  let originalNavigator: PropertyDescriptor | undefined

  beforeEach(() => {
    originalWindow = globalThis.window
    originalNavigator = Object.getOwnPropertyDescriptor(globalThis, "navigator")
  })

  afterEach(() => {
    globalThis.window = originalWindow
    if (originalNavigator) {
      Object.defineProperty(globalThis, "navigator", originalNavigator)
    }
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
    Object.defineProperty(globalThis, "navigator", {
      value: { userAgent: "iPhone" },
      writable: true,
      configurable: true,
    })

    hapticFeedback(15)
    expect(mockAudioContext).toHaveBeenCalled()
    expect(mockStop).toHaveBeenCalledWith(0.015)
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
    Object.defineProperty(globalThis, "navigator", {
      value: { userAgent: "iPad" },
      writable: true,
      configurable: true,
    })

    hapticFeedback([25, 10, 25])
    expect(mockAudioContext).toHaveBeenCalled()
    expect(mockStop).toHaveBeenCalledWith(0.025)
  })

  it("should silently fail on iOS if audio context throws an error", () => {
    const mockAudioContext = mock().mockImplementation(() => {
      throw new Error("AudioContext not supported")
    })

    // @ts-ignore
    globalThis.window = { AudioContext: mockAudioContext }
    Object.defineProperty(globalThis, "navigator", {
      value: { userAgent: "iPhone" },
      writable: true,
      configurable: true,
    })

    expect(() => hapticFeedback(10)).not.toThrow()
    expect(mockAudioContext).toHaveBeenCalled()
  })
})
