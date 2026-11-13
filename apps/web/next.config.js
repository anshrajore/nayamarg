/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@nayamarg/contracts",
    "@nayamarg/domain",
    "@nayamarg/providers",
    "@nayamarg/workflow-engine",
  ],
};

module.exports = nextConfig;
