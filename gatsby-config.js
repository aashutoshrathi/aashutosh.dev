const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.lr-ingest.io",
  "script-src-elem *",
  "font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com",
  "img-src 'self' data:",
  "worker-src 'self' blob: data:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "connect-src 'self' https://api.aashutosh.dev https://r.lr-ingest.io/",
]

const directivesToCspHeader = headers => headers.join(";")

module.exports = {
  siteMetadata: {
    title: `Aashutosh Rathi | Blog`,
    description: `Personal Blog and Site by Aashutosh Rathi`,
    author: `@aashutoshrathi`,
    social: [
      {
        name: `Twitter`,
        url: `https://twitter.com/AashutoshRathi`,
      },
      {
        name: `GitHub`,
        url: `https://github.com/aashutoshrathi`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aashutosh Rathi | Dev Portfolio`,
        short_name: `Aashutosh.Dev`,
        start_url: `/`,
        background_color: `#252525`,
        theme_color: `#343b3f`,
        display: `minimal-ui`,
        icon: `src/images/pic.jpeg`, // This path is relative to the root of the site.
      },
    },
    // {
    //   resolve: "gatsby-plugin-netlify",
    //   options: {
    //     headers: {
    //       "/*": [
    //         "X-Frame-Options: DENY",
    //         "X-XSS-Protection: 1; mode=block",
    //         "X-Content-Type-Options: nosniff",
    //         `Content-Security-Policy: ${directivesToCspHeader(cspDirectives)}`,
    //         "Referrer-Policy: no-referrer-when-downgrade",
    //       ],
    //     },
    //   },
    // },
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        directives: {
          "script-src": `'self' 'unsafe-inline' data: https://unpkg.com https://cdn.lr-ingest.io`,
          "style-src": `'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com`,
          "img-src": `'self' data: www.google-analytics.com`,
          "font-src": `'self' data: fonts.gstatic.com`,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
