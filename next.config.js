/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['sanity', '@sanity/ui', '@sanity/vision', 'next-sanity'],
  // output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'gw2ay2qy.apicdn.sanity.io' },
    ],
  },
  trailingSlash: true,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
}

module.exports = nextConfig 