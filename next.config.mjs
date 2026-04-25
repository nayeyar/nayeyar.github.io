import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  outputFileTracingRoot: path.join(process.cwd()),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: false,
  },
};

export default nextConfig;
