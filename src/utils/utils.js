const titleCaseSingleWord = str =>
  str
    .toLowerCase()
    .replace(/\b(\w)/g, s => s.toUpperCase())
    .split(" ")[0]

const fetchData = async url => {
  const response = await fetch(url)
  return await response.json()
}

export { titleCaseSingleWord, fetchData }
