import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // biarkan build tetap jalan meski ada error lint
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
