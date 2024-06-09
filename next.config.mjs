/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  api: {
    responseLimit: '8mb',
  },
}

export default nextConfig
