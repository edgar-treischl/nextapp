import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  basePath: dev ? "" : "/nextapp",
  assetPrefix: dev ? "" : "/nextapp/",
};

export default nextConfig;
