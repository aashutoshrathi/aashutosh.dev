import React from "react"
import { titleCase } from "../utils/utils"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { IconProps } from "../types"
import {
  FaCode,
  FaPython,
  FaJsSquare,
  FaGithub,
  FaTwitter,
  FaStackOverflow,
  FaDev,
  FaLinkedin,
  FaFacebook,
  FaRust,
} from "react-icons/fa"
import { SiCplusplus, SiTypescript, SiGo, SiJupyter, SiMdx, SiFlutter } from "react-icons/si"

const iconMap: { [key: string]: React.ComponentType } = {
  C: FaCode,
  Cpp: SiCplusplus,
  Dev: FaDev,
  Facebook: FaFacebook,
  Flutter: SiFlutter,
  Github: FaGithub,
  Javascript: FaJsSquare,
  Jupyter: SiJupyter,
  Linkedin: FaLinkedin,
  Python: FaPython,
  Stackoverflow: FaStackOverflow,
  Twitter: FaTwitter,
  Typescript: SiTypescript,
  Rust: FaRust,
  Go: SiGo,
  Mdx: SiMdx,
}

const Icon: React.FC<IconProps> = ({ url, label, width, height }) => {
  const updatedLabel = titleCase(label.replace(/\+/g, "p"))
  const IconComponent = iconMap[updatedLabel]

  return (
    <>
      <OutboundLink
        href={url}
        title={updatedLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {IconComponent ? (
          <IconComponent
            aria-label={updatedLabel}
          />
        ) : (
          <span> {updatedLabel} </span>
        )}
      </OutboundLink>
    </>
  )
}

export default Icon
