import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.qwenlm.ai",
        pathname: "/public_source/**",
      },
    ],
  },
};

export default nextConfig;
