import { useEffect } from "react"
import { useRouter } from "next/router"

const NotFound = () => {
  const router = useRouter()
  
  useEffect(() => {
    router.push("/")
  }, [router])
  
  return null
}

export default NotFound