// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname, // force this folder as the root
};

module.exports = nextConfig;
