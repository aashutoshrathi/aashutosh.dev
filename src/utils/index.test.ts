import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test"
import { fetchData, titleCase } from "./index"

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
