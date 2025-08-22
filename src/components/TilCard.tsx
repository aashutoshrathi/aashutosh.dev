import React from "react"
import { Card as UICard, CardContent } from "@/components/ui/card"
import { parseBetter } from "@/lib/utils-app"

interface TIL {
  id: number
  created_at: string
  full_text: string
  link_to_tweet: string
}

interface TilCardProps {
  til: TIL
}

const TilCard: React.FC<TilCardProps> = ({ til }) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  const date = new Date(til.created_at)
  const dateString = date.toLocaleDateString("en-US", options)
  
  return (
    <UICard className="bg-nav-footer-bg text-main-text border-none shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-xl w-full max-w-sm mx-auto my-4">
      <CardContent className="p-5">
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between text-sm text-dull-white mb-2">
            <span aria-label="Tweet Time">{dateString}</span>
          </div>
          <p className="text-white/85 text-left text-sm max-h-60 overflow-hidden mb-2">
            {parseBetter(til.full_text)}
          </p>
          <div className="flex justify-between text-sm">
            <a
              href={til.link_to_tweet}
              aria-label="Link to Tweet"
              title="Link to Tweet"
              rel="noopener noreferrer"
              target="_blank"
              className="text-dull-white underline hover:text-twitter-brand hover:decoration-twitter-brand"
            >
              Original Tweet
            </a>
          </div>
        </div>
      </CardContent>
    </UICard>
  )
}

export default TilCard