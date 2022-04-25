/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    CHAIN_ID: process.env.CHAIN_ID,
    ALCHEMY_CHAIN_NAME: process.env.ALCHEMY_CHAIN_NAME,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  },
}

module.exports = nextConfig
