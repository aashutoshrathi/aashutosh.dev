export const titleCaseSingleWord = str =>
  str
    .toLowerCase()
    .replace(/\b(\w)/g, s => s.toUpperCase())
    .split(" ")[0]
