;(function () {
  function getTheme() {
    try {
      var stored = window.localStorage.getItem("theme")
      if (stored === "light" || stored === "dark") {
        return stored
      }
    } catch (e) {
      /* storage unavailable — fall through to system preference */
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark"
    }
    return "light"
  }

  var theme = getTheme()
  document.documentElement.setAttribute("data-theme", theme)
  document.documentElement.classList.add(theme)
})()
