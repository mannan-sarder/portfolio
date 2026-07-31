"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FEATURED_EXPERIENCE_ITEMS } from "@/data/experience";
import { TimelineEntry, ArrowRightSmIcon } from "@/components/experience/ExperienceShared";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Experience Section ───────────────────────────────────────────────────────

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#070709] py-10 lg:py-0"
      aria-label="Experience"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-violet-600/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8">

        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center mb-12 lg:mb-14"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <div className="inline-flex flex-col items-center gap-2">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/[0.08] text-[11px] font-semibold tracking-[0.18em] uppercase text-violet-400 font-geist"
                aria-label="Section: Experience"
              >
                <span className="w-1 h-1 rounded-full bg-violet-400" aria-hidden="true" />
                EXPERIENCE
                <span className="w-1 h-1 rounded-full bg-violet-400" aria-hidden="true" />
              </span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-satoshi text-[clamp(44px,5.5vw,64px)] font-extrabold leading-[1.05] tracking-tight text-white mb-5"
          >
            My{" "}
            <span
              className="inline bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent"
              aria-label="Journey"
            >
              Journey.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="max-w-[700px] text-[18px] font-normal leading-relaxed text-[#A1A1AA] font-geist"
          >
            A timeline of roles and education that shaped how I build software.
          </motion.p>
        </motion.div>

        {/* Featured cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-[960px] mx-auto flex flex-col gap-6"
          role="region"
          aria-label="Experience timeline"
        >
          {FEATURED_EXPERIENCE_ITEMS.map((item, i) => (
            <TimelineEntry key={item.id} item={item} index={i} />
          ))}
        </motion.div>

        {/* View All link */}
        <div className="max-w-[960px] mx-auto flex justify-end mt-6">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-violet-500/25 text-[13px] font-semibold text-violet-400 font-geist hover:from-blue-500/20 hover:to-violet-500/20 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200"
          >
            View All Experience
            <ArrowRightSmIcon />
          </Link>
        </div>

      </div>
    </section>
  );
}
