// next.config.js
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-pdf": "react-pdf",
    };

    return config;
  },
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
