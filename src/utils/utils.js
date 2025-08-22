const titleCase = str =>
  str
    .toLowerCase()
    .replace(/\b(\w)/g, s => s.toUpperCase())
    .split(" ")[0]

const fetchData = async (url) => {
  // Only fetch on client side
  if (typeof window === "undefined") {
    return null
  }
  const response = await fetch(url)
  return response.json()
}

const parseBetter = text => {
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
