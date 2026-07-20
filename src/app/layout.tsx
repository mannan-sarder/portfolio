import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/layout/Navbar";
import { SEO } from "@/data/portfolio";
import "@/styles/globals.css";
import Footer from "@/components/layout/Footer";
// ─── Satoshi Variable (local) ────────────────────────────────────────────────
// Headings: Hero titles, Section titles, Card titles, Story titles, CTA titles
// Weights used via font-variation-settings: 600 700 800

const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
  fallback: ["system-ui", "sans-serif"],
});

// ─── Inter (Google) ──────────────────────────────────────────────────────────
// Captions only — 400 600

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: `%s | MD Mannan Sarder`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: "MD Mannan Sarder" }],
  creator: "MD Mannan Sarder",
  metadataBase: new URL(SEO.siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SEO.siteUrl,
    title: SEO.title,
    description: SEO.description,
    siteName: "MD Mannan Sarder",
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: "MD Mannan Sarder — Software Engineer & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ─────────────────────────────────────────────────────────────

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${satoshi.variable} ${GeistSans.variable} ${GeistMono.variable} ${inter.variable}`}
    >
      <body className="bg-bg-main text-text-primary antialiased selection:bg-secondary-purple/30 selection:text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
