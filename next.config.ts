import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'images.pexels.com',
      },
      {
        protocol:'https',
        hostname:'otmrxfphozuclcvygucx.supabase.co'
      },
      {
        protocol:'https',
        hostname:'img.clerk.com'
      }
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
