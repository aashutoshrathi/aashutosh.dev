import React from "react"
import Icon from "./icon"

const Footer: React.FC = () => {
  return (
    <footer className="text-center mono">
      <div id="social" className="text-center">
        <Icon url="https://github.com/aashutoshrathi" label="GitHub" />
        <Icon url="https://twitter.com/AashutoshRathi" label="Twitter" />
        <Icon
          url="https://stackoverflow.com/users/7326407/aashutosh-rathi?tab=profile"
          label="Stackoverflow"
        />
        <Icon
          url="https://dev.to/aashutoshrathi"
          label="Dev"
          viewBox="0 0 448 512"
        />
        <Icon url="https://linkedin.com/in/aashutoshrathi/" label="LinkedIn" />
        <Icon url="https://fb.com/aashutoshrathi" label="Facebook" />
      </div>
      <p>
        {">"} aashutosh@dev: ~$ <span className="blinking-cursor">_</span>
      </p>
    </footer>
  )
}

export default Footer
