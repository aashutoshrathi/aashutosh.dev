import React from "react"

import { RenderBodyArgs } from "gatsby"

export const onRenderBody = ({ setPreBodyComponents }: RenderBodyArgs) => {
  const themeScript = `
    (function() {
      function getTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return 'light';
      }
      
      const theme = getTheme();
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.add(theme);
    })();
  `

  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-script",
      dangerouslySetInnerHTML: { __html: themeScript },
    }),
  ])
}
