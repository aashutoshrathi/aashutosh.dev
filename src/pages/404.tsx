import React from "react"

import { Link } from "gatsby"

import { SEO } from "@components"

const NotFound: React.FC = () => {

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
        404 · not found
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        Lost in the stack trace?
      </h1>
      <p className="mt-3 max-w-prose text-gray-600 dark:text-gray-300">
        The page you’re looking for doesn’t exist. It might have been moved,
        renamed, or maybe you typed a little too fast - happens to the best of
        us.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-blue-500">
          Go home
        </Link>
        <Link
          to="/work"
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold no-underline hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800">
          See my work
        </Link>
      </div>
      <p className="mt-6 font-mono text-xs text-gray-400 dark:text-gray-500">
        If you arrived via an old link, try checking the nav - About lives at
        /timeline.
      </p>
    </main>
  )
}

export default NotFound

export const Head = () => <SEO title="Not Found" />
