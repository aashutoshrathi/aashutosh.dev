import React from "react"
import Layout from "../components/layout"
import useSWR from "swr"
import SEO from "../components/seo"
import Loader from "../components/loader"
import TilCard from "../components/til-card"
import "./til.css"
import { fetchData } from "../utils/utils"

const TIL_URL = `${process.env.GATSBY_API_URI}til`

const Til = () => {
  const { data: tils } = useSWR(TIL_URL, fetchData(TIL_URL))

  return (
    <Layout>
      <SEO title="Today I Learned" />
      <h3 className={["text-center", "padding-small", "heading"].join(" ")}>
        Today I Learned{" "}
        <span role="img" aria-label="project">
          📚
        </span>
      </h3>
      <h4 className={["text-center"].join(" ")}>
        This page contains all #TILs, that I tweeted
      </h4>

      {tils ? (
        <section className="tils">
          {tils?.map(til => (
            <TilCard key={til.id} til={til} />
          ))}
        </section>
      ) : (
        <Loader />
      )}
    </Layout>
  )
}

export default Til
