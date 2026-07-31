import type { Metadata } from "next";
import Link from "next/link";
import ExperienceListing from "./ExperienceListing";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A complete timeline of work experience and education that shaped how MD Mannan Sarder builds software.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience | MD Mannan Sarder",
    description: "A complete timeline of work experience and education.",
    url: "/experience",
    type: "website",
  },
};

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen bg-[#070709] overflow-x-hidden pt-[120px] pb-24">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-violet-600/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8">
        {/* Back link */}
        <Link
          href="/#experience"
          className="inline-flex items-center gap-2 mb-8 text-[14px] text-[#A1A1AA] font-geist hover:text-white transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <ExperienceListing />
      </div>
    </main>
  );
}
