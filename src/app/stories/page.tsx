import type { Metadata } from "next";
import Link from "next/link";
import { getAllStories } from "@/data/stories";
import { StoryRow } from "@/components/story/StoryShared";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Moments, places, and experiences that inspire MD Mannan Sarder beyond coding — the full Behind the Coding collection.",
  alternates: { canonical: "/stories" },
  openGraph: {
    title: "Stories | MD Mannan Sarder",
    description: "Moments, places, and experiences beyond coding.",
    url: "/stories",
    type: "website",
  },
};

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <main className="relative min-h-screen bg-bg-main overflow-x-hidden pt-[120px] pb-24">
      {/* Ambient glows — same treatment as the homepage section */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-700/5 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/4 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-[100px]">
        <Link
          href="/#behind-the-coding"
          className="inline-flex items-center gap-2 mb-8 text-[14px] text-[#A1A1AA] font-geist hover:text-white transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="mb-12">
          <p
            className="text-[13px] font-semibold tracking-[0.2em] uppercase font-geist mb-3"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #f472b6, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            BEHIND THE CODING
          </p>
          <h1
            className="font-satoshi text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.1] tracking-tight mb-4"
            style={{ background: "linear-gradient(90deg, #22d3ee, #3b82f6, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            All Stories.
          </h1>
          <p className="text-[16px] text-[#A1A1AA] font-geist leading-[1.7] max-w-[440px]">
            Every moment, place, and experience that inspires me beyond coding — {stories.length} stor{stories.length === 1 ? "y" : "ies"} and counting.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {stories.map((story) => (
            <StoryRow key={story.id} story={story} />
          ))}
        </div>

        <p className="text-center text-[14px] text-[#555] font-geist mt-16">
          💜 Collecting memories, one journey at a time.
        </p>
      </div>
    </main>
  );
}
