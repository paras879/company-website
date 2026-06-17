import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js Image Optimization enabled
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'three', '@react-three/fiber', '@react-three/drei'],
  },
};

export default nextConfig;
