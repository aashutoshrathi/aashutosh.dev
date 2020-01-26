import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "pic.jpeg" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Img
      fixed={data.placeholderImage.childImageSharp.fixed}
      className={"pic"}
    />
  )
}

export default Image
