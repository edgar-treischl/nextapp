import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  basePath: dev ? "" : "/nextapp",  // dev: root '/', prod: GitHub Pages subpath
};

export default nextConfig;
