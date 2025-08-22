/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['files.aashutosh.dev'],
  },
  env: {
    NEXT_PUBLIC_API_URI: process.env.NEXT_PUBLIC_API_URI || 'https://api.aashutosh.dev/',
  },
}

module.exports = nextConfig