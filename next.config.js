/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'i.scdn.co'],
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
}

module.exports = nextConfig