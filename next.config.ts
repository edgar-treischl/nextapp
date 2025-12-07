const dev = process.env.NODE_ENV === "development";

const nextConfig = {
  output: "export",
  basePath: dev ? "" : "/nextapp",
  assetPrefix: dev ? "" : "/nextapp/",
  env: {
    NEXT_PUBLIC_BASE_PATH: dev ? "" : "/nextapp", // expose to client
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
