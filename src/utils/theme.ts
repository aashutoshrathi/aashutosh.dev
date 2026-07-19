export type Theme = "light" | "dark"

export const THEME_STORAGE_KEY = "theme"

export const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return stored === "light" || stored === "dark" ? stored : null
  } catch {
    return null
  }
}

export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export const getCurrentTheme = (): Theme => {
  if (typeof document === "undefined") return "light"
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light"
}

export const applyTheme = (theme: Theme, persist = true) => {
  if (typeof document === "undefined") return
  document.documentElement.setAttribute("data-theme", theme)
  document.documentElement.classList.remove("light", "dark")
  document.documentElement.classList.add(theme)
  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // storage unavailable (private mode, etc.) — theme still applies
    }
  }
}
