import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";
// For GitHub Pages:
// - Project pages (username.github.io/repo) need basePath like "/repo"
// - Custom domains are served from root and must NOT use a basePath
const basePath = isGhPages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  output: isGhPages ? "export" : undefined,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
