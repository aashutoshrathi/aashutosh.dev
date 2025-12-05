export default {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^react$",
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^(@components|@utils)",
    "",
    "^[.]",
    "",
    "<TYPES>",
    "<TYPES>^[.]",
  ],
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
}
