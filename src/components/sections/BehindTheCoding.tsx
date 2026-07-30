"use client";

import { useRef, useId } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { STORIES } from "@/data/stories";
import { StoryRow, containerVariants, itemVariants } from "@/components/story/StoryShared";

export default function BehindTheCoding() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const uid = useId();

  return (
    <section
      id="behind-the-coding"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-[20px]"
      aria-label="Behind the Coding"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-700/5 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/4 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-[100px]">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.p
            variants={itemVariants}
            className="text-[13px] font-semibold tracking-[0.2em] uppercase font-geist mb-3"
            style={{
              background: "linear-gradient(135deg, #2dd4bf, #f472b6, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            BEHIND THE CODING
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-satoshi text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.1] tracking-tight mb-4"
            style={{
              background: "linear-gradient(90deg, #22d3ee, #3b82f6, #a78bfa, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Life Outside the IDE.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[16px] text-[#A1A1AA] font-geist leading-[1.7] max-w-[360px]">
            A collection of moments, places, and experiences that inspire me beyond coding.
          </motion.p>
        </motion.div>

        {/* Story Rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-8"
        >
          {STORIES.slice(0, 2).map((story) => (
            <StoryRow key={story.id} story={story} />
          ))}

          {STORIES.length > 2 && (
            <div className="flex justify-end mt-2">
              <Link
                href="/stories"
                className="relative inline-flex items-center gap-1 px-3 py-2.5 rounded-[10px] text-[13px] font-medium font-geist overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(20,184,166,0.1), rgba(236,72,153,0.08), rgba(139,92,246,0.1))",
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(236,72,153,0.15), rgba(139,92,246,0.22))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "linear-gradient(135deg, rgba(20,184,166,0.1), rgba(236,72,153,0.08), rgba(139,92,246,0.1))";
                }}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-[14px]"
                  style={{
                    padding: "1.5px",
                    background: "linear-gradient(135deg, #14b8a6, #ec4899, #8b5cf6)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px] flex-shrink-0">
                  <defs>
                    <linearGradient id={`bookGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="50%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" stroke={`url(#bookGrad-${uid})`} />
                </svg>
                <span style={{ background: "linear-gradient(135deg, #2dd4bf, #f472b6, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  View More Stories
                </span>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
                  <defs>
                    <linearGradient id={`arrowGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke={`url(#arrowGrad-${uid})`} />
                </svg>
              </Link>
            </div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-[14px] text-[#555] font-geist mt-16"
        >
          💜 Collecting memories, one journey at a time.
        </motion.p>
      </div>
    </section>
  );
}
