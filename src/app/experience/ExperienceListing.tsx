"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCE_ITEMS } from "@/data/experience";
import { TimelineEntry, TabButton } from "@/components/experience/ExperienceShared";

type Tab = "all" | "work" | "education";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

export default function ExperienceListing() {
  const [tab, setTab] = useState<Tab>("all");

  const workItems = EXPERIENCE_ITEMS.filter((e) => e.type === "work");
  const educationItems = EXPERIENCE_ITEMS.filter((e) => e.type === "education");
  const displayed =
    tab === "work" ? workItems : tab === "education" ? educationItems : EXPERIENCE_ITEMS;

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" aria-hidden="true" />
          <span className="text-[14px] font-semibold tracking-[0.2em] uppercase text-violet-400 font-geist">
            EXPERIENCE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" aria-hidden="true" />
        </div>

        <h1 className="font-satoshi text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight text-white mb-5">
          My{" "}
          <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
            Journey.
          </span>
        </h1>

        <p className="text-[18px] font-normal leading-[1.7] text-[#A1A1AA] font-geist max-w-[700px] mx-auto mb-8">
          A complete timeline of roles and education that shaped how I build software.
        </p>

        <div className="flex items-center justify-center gap-3">
          <TabButton label="All" active={tab === "all"} onClick={() => setTab("all")} />
          <TabButton label="Work" active={tab === "work"} onClick={() => setTab("work")} />
          <TabButton label="Education" active={tab === "education"} onClick={() => setTab("education")} />
        </div>
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[960px] mx-auto flex flex-col gap-6"
          role="region"
          aria-label="Experience timeline"
        >
          {displayed.map((item, i) => (
            <TimelineEntry key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
