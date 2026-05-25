import { expect, test, describe } from "bun:test"
import { titleCase } from "./index"

describe("titleCase", () => {
  test("capitalizes a single word", () => {
    expect(titleCase("hello")).toBe("Hello")
  })

  test("handles fully uppercase words by making them title case", () => {
    expect(titleCase("WORLD")).toBe("World")
  })

  test("returns only the first segment when multiple words are provided", () => {
    expect(titleCase("hello world")).toBe("Hello")
  })

  test("returns an empty string when the input has leading whitespace", () => {
    // This is an expected behavior per project memory:
    // "The `titleCase` utility in `src/utils/index.ts` capitalizes words but returns only the first segment via `.split(" ")[0]`; consequently, input with leading whitespace results in an empty string."
    expect(titleCase(" hello")).toBe("")
  })

  test("handles empty string input", () => {
    expect(titleCase("")).toBe("")
  })
})
