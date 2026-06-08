import React from "react"
import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test"
import { render, screen, fireEvent, waitFor, act, cleanup } from "@testing-library/react"

// Mock the utils module BEFORE importing the component
mock.module("@utils", () => ({
  mediumHaptic: mock(),
}))

// Use dynamic import so the mock takes effect
const { default: CodeBlock } = await import("./code-block")

describe("CodeBlock", () => {
  let writeTextMock: ReturnType<typeof mock>
  let originalClipboard: any

  beforeEach(() => {
    writeTextMock = mock().mockResolvedValue(undefined)

    // Setup navigator.clipboard mock in a way that works with JSDOM/HappyDOM
    originalClipboard = globalThis.navigator.clipboard

    Object.defineProperty(globalThis.navigator, "clipboard", {
      value: {
        writeText: writeTextMock,
      },
      configurable: true,
    })
  })

  afterEach(() => {
    cleanup() // clear DOM after each test to avoid multi-element matching issues
    Object.defineProperty(globalThis.navigator, "clipboard", {
      value: originalClipboard,
      configurable: true,
    })
  })

  it("renders correctly with children", () => {
    render(<CodeBlock>Hello World</CodeBlock>)
    expect(screen.getByText("Hello World")).toBeTruthy()
  })

  it("extracts language from className", () => {
    render(<CodeBlock className="language-javascript">console.log()</CodeBlock>)
    expect(screen.getByText("javascript")).toBeTruthy()
  })

  it("defaults to text if no language class is provided", () => {
    render(<CodeBlock>plain text</CodeBlock>)
    expect(screen.queryByText("text")).toBeNull() // It hides "text" tag
  })

  it("extracts text correctly from complex children", async () => {
    // A structure simulating nested components or formatted text
    render(
      <CodeBlock>
        <span>line 1</span>
        {"\n"}
        <span>line 2</span>
      </CodeBlock>
    )

    const copyButton = screen.getByRole("button", { name: "Copy code" })
    await act(async () => {
      fireEvent.click(copyButton)
    })

    expect(writeTextMock).toHaveBeenCalledWith("line 1\nline 2")
  })

  it("handles empty children gracefully", async () => {
    render(<CodeBlock>{null as any}</CodeBlock>)

    const copyButton = screen.getByRole("button", { name: "Copy code" })
    await act(async () => {
      fireEvent.click(copyButton)
    })

    expect(writeTextMock).toHaveBeenCalledWith("")
  })

  it("copies text content to clipboard when copy button is clicked", async () => {
    render(<CodeBlock>const a = 1;</CodeBlock>)

    const copyButton = screen.getByRole("button", { name: "Copy code" })

    await act(async () => {
      fireEvent.click(copyButton)
    })

    expect(writeTextMock).toHaveBeenCalledWith("const a = 1;")
    expect(screen.getByText("✓ Copied!")).toBeTruthy()

    // Wait for the text to revert
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2050))
    })

    expect(screen.getByText("Copy")).toBeTruthy()
  })
})
