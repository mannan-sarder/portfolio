"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { STACK_CARDS } from "@/data/portfolio";
import type { StackCard, TechItem } from "@/types";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const ServerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <path d="M6 6h.01M6 18h.01" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const WrenchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const CARD_ICONS: Record<string, React.ReactNode> = {
  monitor: <MonitorIcon />,
  server: <ServerIcon />,
  code2: <CodeIcon />,
  wrench: <WrenchIcon />,
};

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

// ─── Tech Item ────────────────────────────────────────────────────────────────

function TechItem({ item }: { item: TechItem }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] p-5 cursor-default select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
      style={{ transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(139,92,246,0.6)";
        el.style.boxShadow = "0 0 0 1px rgba(139,92,246,0.2), 0 8px 32px rgba(139,92,246,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "#2A2A2A";
        el.style.boxShadow = "none";
      }}
      tabIndex={0}
      role="listitem"
      aria-label={item.name}
    >
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image src={item.icon} alt={`${item.name} icon`} fill className="object-contain" sizes="40px" />
      </div>
      <span className="text-[13px] font-medium text-[#A1A1AA] group-hover:text-white transition-colors duration-300 text-center leading-tight font-geist">
        {item.name}
      </span>
    </motion.div>
  );
}

// ─── Secondary Tech Item ──────────────────────────────────────────────────────

function SecondaryTechItem({ item }: { item: TechItem }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex items-center gap-3 rounded-xl border border-[#2A2A2A] bg-[#0F0F0F] px-4 py-3 cursor-default select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      style={{ transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(139,92,246,0.6)";
        el.style.boxShadow = "0 0 0 1px rgba(139,92,246,0.2), 0 4px 16px rgba(139,92,246,0.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "#2A2A2A";
        el.style.boxShadow = "none";
      }}
      tabIndex={0}
      role="listitem"
      aria-label={item.name}
    >
      <div className="relative w-7 h-7 flex-shrink-0">
        <Image src={item.icon} alt={`${item.name} icon`} fill className="object-contain" sizes="28px" />
      </div>
      <span className="text-[13px] font-medium text-[#A1A1AA] group-hover:text-white transition-colors duration-300 font-geist whitespace-nowrap">
        {item.name}
      </span>
    </motion.div>
  );
}

// ─── Stack Card ───────────────────────────────────────────────────────────────

function StackCardComponent({ card, index }: { card: StackCard; index: number }) {
  const isLanguages = card.id === "languages";
  const isBackend = card.id === "backend";

  const gridClass = isLanguages ? "grid-cols-5" : "grid-cols-3";

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative flex flex-col gap-4 rounded-3xl border border-[#2A2A2A] bg-[#111111] p-5 focus-within:ring-2 focus-within:ring-violet-500/30"
      style={{ transition: "box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "0 0 0 1px rgba(139,92,246,0.15), 0 20px 60px rgba(139,92,246,0.08), 0 8px 24px rgba(0,0,0,0.4)";
        el.style.borderColor = "rgba(139,92,246,0.3)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "none";
        el.style.borderColor = "#2A2A2A";
      }}
      aria-label={`${card.title} technologies`}
    >
      {/* Card Header */}
      <header className="flex items-center gap-3 pb-3 border-b border-[#2A2A2A]">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-violet-400 flex-shrink-0" aria-hidden="true">
          {CARD_ICONS[card.icon] ?? <MonitorIcon />}
        </div>
        <h3 className="text-[17px] font-semibold text-white leading-none font-satoshi">
          {card.title}
        </h3>
      </header>

      {/* Tech Grid */}
      <div className={`grid gap-2 ${gridClass}`} role="list" aria-label={`${card.title} items`}>
        {card.items.map((item) => (
          <TechItem key={item.name} item={item} />
        ))}
      </div>

      {/* Secondary Section (Backend only) */}
      {isBackend && card.secondary && (
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-medium text-violet-400 tracking-wide font-geist uppercase">
            {card.secondary.label}
          </span>
          <div className="flex flex-wrap gap-2" role="list" aria-label={card.secondary.label}>
            {card.secondary.items.map((item) => (
              <SecondaryTechItem key={item.name} item={item} />
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}

// ─── Stack Section ────────────────────────────────────────────────────────────

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-10 lg:py-0"
      aria-label="Tech Stack"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-violet-600/6 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/5 blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-violet-800/5 blur-[90px]" />
      </div>

      {/* Main container */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8">

        {/* Top Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center mb-12 lg:mb-14"
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="inline-flex flex-col items-center gap-2">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/8 text-[11px] font-semibold tracking-[0.18em] uppercase text-violet-400 font-geist"
                aria-label="Section: Stack"
              >
                <span className="w-1 h-1 rounded-full bg-violet-400" aria-hidden="true" />
                STACK
                <span className="w-1 h-1 rounded-full bg-violet-400" aria-hidden="true" />
              </span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-satoshi text-[clamp(44px,5.5vw,64px)] font-extrabold leading-[1.05] tracking-tight text-white mb-5"
          >
            My Tech{" "}
            <span
              className="inline bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent"
              aria-label="Stack"
            >
              Stack.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-[700px] text-[18px] font-normal leading-relaxed text-[#A1A1AA] font-geist"
          >
            Technologies and tools I use to build modern, scalable and efficient solutions.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          role="region"
          aria-label="Technology categories"
        >
          {STACK_CARDS.map((card, i) => (
            <StackCardComponent key={card.id} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
