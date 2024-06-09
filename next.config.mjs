/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  api: {
    responseLimit: '12mb',
  },
}

export default nextConfig
