import { OutboundLink } from "gatsby-plugin-google-analytics"
import React from "react"
import "./card.css"

const TilCard = ({ til }) => {
  var options = { year: "numeric", month: "long", day: "numeric" }
  const date = new Date(til.created_at)
  const dateString = `${date.toLocaleDateString("en-US", options)}`
  return (
    <div className="card">
      <div>
        <div className="til-card-boundary">
          <span aria-label="Tweet Time">{dateString}</span>
        </div>
        <p className="card-til"> {til.full_text} </p>
        <div className="til-card-boundary">
          <OutboundLink
            href={til.link_to_tweet}
            aria-label="Link to Tweet"
            title="Link to Tweet"
            rel="noopener noreferrer"
            target="_blank"
            className="link-twitter"
          >
            Original Tweet
          </OutboundLink>
        </div>
      </div>
    </div>
  )
}

export default TilCard
