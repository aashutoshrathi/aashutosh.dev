import { test, expect, describe, mock, beforeEach, afterEach } from "bun:test"
import { hapticFeedback, lightHaptic, mediumHaptic, heavyHaptic, titleCase, fetchData } from "./index"

describe("utils", () => {
  describe("titleCase", () => {
    test("capitalizes single word", () => {
      expect(titleCase("hello")).toBe("Hello")
    })

    test("handles multiple words but returns first segment", () => {
      expect(titleCase("hello world")).toBe("Hello")
    })
  })
})
