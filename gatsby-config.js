const cspDirectives = [
  "script-src 'self' 'unsafe-inline' *.cloudfront.net unpkg.com www.google-analytics.com www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: fonts.googleapis.com fonts.gstatic.com",
  "worker-src 'self' blob: data:",
  "connect-src 'self' 'unsafe-inline' api.aashutosh.dev github-contributions-api.jogruber.de www.google-analytics.com stats.g.doubleclick.net www.googletagmanager.com",
  "object-src 'none'",
  // "require-trusted-types-for 'script'",
]

module.exports = {
  siteMetadata: {
    title: `Aashutosh Rathi | Developer`,
    description: `I solve problems using code. Currently building stuff @regie.ai. Lead Dev communities at IIITV in past. Feel free to ping me for discussions on Tech || Cosmos`,
    navigationString: `Aashutosh Rathi | `,
    author: `@AashutoshRathi`,
    coverImage: `https://files.aashutosh.dev/pale_blue_dot.jpg`,
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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["UA-37968445-2"],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aashutosh Rathi | Dev Portfolio`,
        short_name: `Aashutosh.Dev`,
        start_url: `/`,
        background_color: `#252525`,
        theme_color: `#343b3f`,
        display: `minimal-ui`,
        icon: `src/images/pic.webp`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/*": [
            `Content-Security-Policy: ${cspDirectives.join(";")}`,
            "Feature-Policy: sync-xhr 'self'",
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
