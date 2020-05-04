const cspDirectives = [
  "script-src 'self' *.cloudfront.net unpkg.com 'sha256-jFwHy8F6vD3srEixoFhY/KzLjJf8hqeGKJYhPUUqcrc=' 'sha256-egpbluqkD8NT0bY3bWy7raM9tRIMkfUWboq0Y8KqsFk=' 'sha256-RO/fsOOG1Pjr/GU/rMC3PRDUlAZbJbReLigQo4Ed+cw='",
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com",
  "img-src 'self' data: *.githubusercontent.com *.githubassets.com",
  "font-src 'self' data: fonts.googleapis.com fonts.gstatic.com",
  "worker-src 'self' blob: data:",
  "connect-src 'self' api.aashutosh.dev urlreq.appspot.com",
  "object-src 'none'",
  // "require-trusted-types-for 'script'",
]

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
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/*": [
            `Content-Security-Policy: ${cspDirectives.join(";")}`,
            "Feature-Policy: vibrate 'self'; usermedia *; sync-xhr 'self'",
            "X-Frame-Options: DENY",
            "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
            "Upgrade-Insecure-Requests: 1",
            "X-XSS-Protection: 1; mode=block",
            "X-Content-Type-Options: nosniff",
            "Referrer-Policy: no-referrer-when-downgrade",
          ],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
