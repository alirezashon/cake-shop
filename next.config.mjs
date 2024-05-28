/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  api: {
    responseLimit: false,
  },
}

export default nextConfig
