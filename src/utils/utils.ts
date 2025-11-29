const titleCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\b(\w)/g, (s: string) => s.toUpperCase())
    .split(" ")[0]

const fetchData = async <T = any>(url: string): Promise<T> => {
  const response = await fetch(url)
  return response.json()
}

const parseBetter = (text: string): string | null => {
  // Only parse on client side where DOMParser is available
  if (typeof window === "undefined") {
    return text
  }
  const parser = new DOMParser()
  const dom = parser.parseFromString(
    `<!doctype html><body>${text}`,
    "text/html"
  )
  return dom.body.textContent
}

export { titleCase, fetchData, parseBetter }
