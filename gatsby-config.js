const dotenv = require("dotenv")
const path = require("path")

dotenv.config({
  path: `.env`,
})

const cspDirectives = [
  "script-src 'self' 'unsafe-inline' *.cloudfront.net unpkg.com www.google-analytics.com www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: fonts.googleapis.com fonts.gstatic.com",
  "worker-src 'self' blob: data:",
  "connect-src 'self' 'unsafe-inline' api.aashutosh.dev github-contributions-api.jogruber.de www.google-analytics.com stats.g.doubleclick.net www.googletagmanager.com",
  "object-src 'none'",
]

module.exports = {
  siteMetadata: {
    title: `aashutosh.dev`,
    description: `software engineer by profession, in it for the plot, baking code into stories. writing nibbles and open to quibbles on tech, life and everything in between.`,
    navigationString: `aashutosh.dev | `,
    author: `@AashutoshRathi`,
    coverImage: `https://files.aashutosh.dev/pale_blue_dot.jpg`,
    social: [
      {
        name: `X`,
        url: `https://x.com/AashutoshRathi`,
      },
      {
        name: `GitHub`,
        url: `https://github.com/aashutoshrathi`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.tsx`),
      },
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@components": path.resolve(__dirname, "./src/components"),
          "@utils": path.resolve(__dirname, "./src/utils"),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["UA-37968445-2"],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aashutosh Rathi`,
        short_name: `aashutosh.dev`,
        start_url: `/`,
        background_color: `#252525`,
        theme_color: `#343b3f`,
        display: `minimal-ui`,
        icon: `src/images/square.png`,
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
  ],
}
