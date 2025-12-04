import React, { useEffect } from "react"

import { navigate } from "gatsby"

const NotFound: React.FC = () => {
  useEffect(() => {
    navigate("/")
  }, [])
  return null
}

export default NotFound
