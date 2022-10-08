/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ipfs.io']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ipfs.infura.io:5001/api/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
