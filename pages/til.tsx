import React from "react"
import Layout from "@/components/layout/Layout"
import useSWR from "swr"
import SEO from "@/components/layout/SEO"
import Loader from "@/components/Loader"
import TilCard from "@/components/TilCard"
import { fetchData } from "@/lib/utils-app"

const TIL_URL = `${process.env.NEXT_PUBLIC_API_URI}til`

const TilPage = () => {
  const { data: tils } = useSWR(TIL_URL, fetchData)

  return (
    <Layout>
      <SEO title="Today I Learned" />
      <h3 className="text-center p-4 text-2xl font-semibold">
        Today I Learned{" "}
        <span role="img" aria-label="project">
          📚
        </span>
      </h3>
      <h4 className="text-center text-lg mb-6">
        This page contains all #TILs, that I tweeted
      </h4>

      {tils ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 justify-items-center">
          {tils?.map((til: any) => (
            <TilCard key={til.id} til={til} />
          ))}
        </section>
      ) : (
        <Loader />
      )}
    </Layout>
  )
}

export default TilPage