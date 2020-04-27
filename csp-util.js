#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const htmlparser = require("htmlparser2")
const replaceInFile = require("replace-in-file")

const TARGET_FOLDER = path.join(__dirname, "public")

const INPUT_FILE = path.join(TARGET_FOLDER, "index.html")
const OUTPUT_FILE = path.join(TARGET_FOLDER, "_headers")
const TOKEN_TO_REPLACE = "__REPLACE_ME__"

console.log("Copying the CSP for Netlify headers")

const cspContent = getCspContentFrom(INPUT_FILE)

updateNetlifyHeaderFile(cspContent, OUTPUT_FILE)

function getCspContentFrom(inputFile) {
  console.log(`Getting the CSP content from ${inputFile}`)
  try {
    const fileContents = fs.readFileSync(inputFile, { encoding: "utf-8" })

    let found = false
    let retVal = ""

    const parser = new htmlparser.Parser(
      {
        onopentag: (name, attributes) => {
          if (name === "meta") {
            if (
              attributes["http-equiv"] &&
              "Content-Security-Policy" === attributes["http-equiv"]
            ) {
              console.log("Found the CSP content:", attributes["content"])
              found = true
              retVal = attributes["content"]
            }
          }
        },
      },
      { decodeEntities: true }
    )

    parser.write(fileContents)

    if (found === false) {
      throw new Error(`Could not find the CSP`)
    }

    return retVal
  } catch (err) {
    console.error(
      "Could not retrieve the CSP content. Did you build first? Is the gatsby-config.js still correct?"
    )
    throw err
  }
}

function updateNetlifyHeaderFile(cspText, outputFile) {
  console.log(`Updating the CSP in the output file [${outputFile}]`)
  const replacementOptions = {
    files: outputFile,
    from: new RegExp(TOKEN_TO_REPLACE, "g"),
    to: cspText,
  }

  try {
    console.log(`Modifying Netlify's header file`)
    const changes = replaceInFile.sync(replacementOptions)
    if (changes && changes.length && changes.length > 0) {
      console.log(
        `Modified Netlify's headers file successfully`,
        changes.join(", ")
      )
    } else {
      throw new Error(
        `Failed to find the expected token to replace: ${TOKEN_TO_REPLACE}`
      )
    }
  } catch (error) {
    console.error(`Failed to modify Netlify's header file`)
    throw error
  }
}
