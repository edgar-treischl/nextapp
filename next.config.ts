import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: "export",
  basePath: "/nextapp",

  // You can keep other config options here
  // Example: basePath if deploying to GitHub Pages subpath
  // basePath: "/my-repo-name",
};

export default nextConfig;
