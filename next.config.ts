import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better dev warnings
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ── Already present → hardened to best values ──────────────────
          {
            // Prevents clickjacking — DENY is the strongest value
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Prevents MIME-type sniffing attacks
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Controls how much referrer info is sent — best privacy/security balance
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Permissions-Policy — all browser APIs explicitly disabled
            // Previously only had 3; now covers all sensitive APIs
            key: "Permissions-Policy",
            value: [
              "accelerometer=()",
              "ambient-light-sensor=()",
              "autoplay=()",
              "battery=()",
              "camera=()",
              "display-capture=()",
              "document-domain=()",
              "encrypted-media=()",
              "execution-while-not-rendered=()",
              "execution-while-out-of-viewport=()",
              "fullscreen=()",
              "geolocation=()",
              "gyroscope=()",
              "keyboard-map=()",
              "magnetometer=()",
              "microphone=()",
              "midi=()",
              "payment=()",
              "picture-in-picture=()",
              "publickey-credentials-get=()",
              "screen-wake-lock=()",
              "sync-xhr=()",
              "usb=()",
              "web-share=()",
              "xr-spatial-tracking=()",
            ].join(", "),
          },
          {
            // CSP — tightened:
            // • fonts.googleapis.com / fonts.gstatic.com removed
            //   (next/font/google self-hosts at build time, no runtime Google requests)
            // • frame-ancestors 'none' added (CSP equivalent of X-Frame-Options DENY)
            // • unsafe-eval kept — required by Three.js / React Three Fiber WebGL shaders
            // • unsafe-inline kept for styles — required by Tailwind/Framer Motion
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: blob:",
              "connect-src 'self' blob:",
              "worker-src 'self' blob:",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },

          // ── New headers added ──────────────────────────────────────────
          {
            // Forces HTTPS for 1 year, includes subdomains, eligible for preload list
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            // Disables DNS prefetching — prevents data leakage of visited links
            key: "X-DNS-Prefetch-Control",
            value: "off",
          },
          {
            // Prevents cross-origin window reference attacks (e.g. Spectre side-channel)
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            // Blocks Flash/PDF cross-domain policy files — legacy but still good practice
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
        ],
      },
    ];
  },

  // Enable experimental features
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;