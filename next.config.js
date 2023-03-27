/** @type {import('next').NextConfig} */
const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  // experimental: {
  //   esmExternals: "loose",
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "firebasestorage.googleapis.com",
        hostname: ["**.amazonaws.com", "**.googleapis.com"],
      },
    ],
    domains: ["googleapis.com", "amazonaws.com"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
