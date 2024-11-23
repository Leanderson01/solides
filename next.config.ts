import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      const currentExternals = Array.isArray(config.externals)
        ? config.externals
        : [];
      config.externals = [...currentExternals];
    }

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        canvas: false,
      },
      fallback: {
        ...config.resolve?.fallback,
        canvas: false,
        encoding: false,
        "pdfjs-dist": false,
      },
    };

    config.ignoreWarnings = [
      { module: /node_modules\/react-pdf/ },
      { module: /node_modules\/pdfjs-dist/ },
    ];

    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
  experimental: {
    esmExternals: "loose",
  },
  output: "standalone",
};

export default nextConfig;
