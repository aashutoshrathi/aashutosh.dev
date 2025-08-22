import React from "react"
import { Button as UIButton } from "@/components/ui/button"

interface ButtonProps {
  url: string
  text: string
}

const Button: React.FC<ButtonProps> = ({ url, text }) => {
  return (
    <UIButton
      asChild
      variant="pill"
      size="pill"
      className="mr-5 my-1"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    </UIButton>
  )
}

export default Button