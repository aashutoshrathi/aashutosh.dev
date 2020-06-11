import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TilCard from "../components/til-card"
import "./til.css"

const CACHE = {}
const TIL_URL = `${process.env.GATSBY_API_URI}til`

const Til = () => {
  const [tils, setTil] = useState([])

  const getTils = () => {
    fetch(TIL_URL)
      .then(res => res.json())
      .then(data => {
        CACHE[TIL_URL] = data
        setTil(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (CACHE[TIL_URL] !== undefined) {
      setTil(CACHE[TIL_URL])
    }
    getTils()
  }, [])

  return (
    <Layout>
      <SEO title="TILs" />
      <h3 className={["text-center", "padding-small", "heading"].join(" ")}>
        TILs{" "}
        <span role="img" aria-label="project">
          📚
        </span>
      </h3>
      <h4 className={["text-center"].join(" ")}>
        This page contains all #TILs, that I tweeted
      </h4>

      <section className="tils">
        {tils.map(til => (
          <TilCard key={til.id} til={til} />
        ))}
      </section>
    </Layout>
  )
}

export default Til
