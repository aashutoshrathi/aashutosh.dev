import { useEffect } from "react"

const ART = `
    _             _           _            _     
   / \\   __ _ ___| |__  _   _| |_ ___  ___| |__  
  / _ \\ / _\` / __| '_ \\| | | | __/ _ \\/ __| '_ \\ 
 / ___ \\ (_| \\__ \\ | | | |_| | || (_) \\__ \\ | | |
/_/   \\_\\__,_|___/_| |_|\\__,_|\\__\\___/|___/_| |_|
                        dev
`

export const useConsoleArt = () => {
  useEffect(() => {
    if (typeof window === "undefined") return
    console.log("%c" + ART, "color: #ffffff; font-family: monospace; font-size: 11px; line-height: 1.15;")
    console.log(
      "%cTry: %ccurl -H 'Accept: text/plain' https://aashutosh.dev/ %c- you might like what you see",
      "color: #94a3b8",
      "color: #ffffff; font-weight: bold",
      "color: #94a3b8"
    )
    console.log("%cEaster eggs:", "color: #ffffff; font-weight: bold; margin-top: 8px;")
    console.log("%c • Konami ↑↑↓↓←→←→BA → matrix rain", "color: #94a3b8")
    console.log("%c • Press : then type work / timeline / uses / blog / now → vim navigate", "color: #94a3b8")
    console.log("%c • Open after 1am → owl says go to sleep 🦉", "color: #94a3b8")
    console.log("%c • Check the Fun section for Spotify and Chess widgets", "color: #94a3b8")
    console.log("%c • Games at mnm.aashutosh.dev and cr.aashutosh.dev", "color: #94a3b8")
    ;(window as any).aashutosh = {
      hint: "You found the console. Try window.aashutosh.matrix()",
      matrix: () => {
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
        console.log("Now type the Konami code: ↑↑↓↓←→←→BA")
      },
      games: ["https://mnm.aashutosh.dev", "https://cr.aashutosh.dev"],
    }
  }, [])
}

const ConsoleArt: React.FC = () => {
  useConsoleArt()
  return null
}

export default ConsoleArt
