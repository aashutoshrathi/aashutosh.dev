import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test"
import { fetchData, hapticFeedback } from "./index"

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

  it("should silently fail if AudioContext throws an error on iOS fallback", () => {
    // @ts-ignore
    globalThis.window = {
      AudioContext: mock().mockImplementation(() => {
        throw new Error("AudioContext not supported")
      }),
    }

    // @ts-ignore
    globalThis.navigator = {
      userAgent: "iPhone",
    }

    expect(() => hapticFeedback(10)).not.toThrow()
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
