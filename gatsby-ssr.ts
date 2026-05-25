import React from "react"

import { RenderBodyArgs } from "gatsby"

export const onRenderBody = ({ setPreBodyComponents }: RenderBodyArgs) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-script",
      src: "/theme.js",
    }),
  ])
}
