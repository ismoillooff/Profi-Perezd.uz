import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route lives under /[locale]; send the bare root to the default one.
  // Russian is the default because it is the language the business already
  // sells in — the live site, its reviews and its ads are all Russian.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ru",
        permanent: false,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Long-lived immutable caching is handled by the host; these headers cover
  // the security basics a corporate site is expected to ship with.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
