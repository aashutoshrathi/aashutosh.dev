import React from "react"
import { titleCaseSingleWord } from "../utils/utils"
import { path } from "./Icons/index"

const Icon = ({ url, label, width, height }) => {
  const updatedLabel = titleCaseSingleWord(label.replace(/\+/g, "p")) // for c++
  const color = "#ffffff"
  const sizeProps = { width: width ?? "2em", height: height ?? "2em" }
  return (
    <>
      {path[updatedLabel] ? (
        <svg viewBox="0 0 24 24" {...sizeProps}>
          <path fill={color} d={path[updatedLabel]} />
        </svg>
      ) : (
        <p> {updatedLabel} </p>
      )}
    </>
  )
}

export default Icon
