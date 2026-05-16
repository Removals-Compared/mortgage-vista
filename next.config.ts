import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js doesn't pick up an unrelated
  // package-lock.json higher up the directory tree.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
