import { OutboundLink } from "gatsby-plugin-google-analytics"
import React from "react"
import "./card.css"

const TilCard = ({ til }) => {
  const date = new Date(til.created_at)
  const dateString = `${date.toLocaleDateString()}`
  return (
    <div className="card">
      <div>
        <p className="card-til"> {til.full_text} </p>
        <div className="eq-div-flex">
          <span aria-label="Tweet Time">
            <span aria-label="watch" role="img">
              ⌚️
            </span>{" "}
            {dateString}
          </span>
          <OutboundLink
            href={til.link_to_tweet}
            aria-label="Link to Tweet"
            title="Link to Tweet"
            rel="noopener noreferrer"
            target="_blank"
            className="link"
          >
            <span aria-label="link" role="img">
              🔗
            </span>{" "}
            to Tweet
          </OutboundLink>
          <span aria-label="Liked">
            {" "}
            <span aria-label="like" role="img">
              ❤️
            </span>{" "}
            {til.favorite_count}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TilCard
