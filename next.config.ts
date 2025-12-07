import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  basePath: dev ? "" : "/nextapp",
  assetPrefix: dev ? "" : "/nextapp/",
  images: {
    unoptimized: true, // disable server-side image optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
