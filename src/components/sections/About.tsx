"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PERSON } from "@/data/portfolio";
import SandTextHero from "./SandTextHero";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InfoRow {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface FocusBadge {
  label: string;
  icon: React.ReactNode;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const EducationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const StatusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const InterestIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const LayersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const CpuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
  </svg>
);

const PaletteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const infoRows: InfoRow[] = [
  {
    id: "education",
    label: "Education",
    value: PERSON.education,
    icon: <EducationIcon />,
  },
  {
    id: "location",
    label: "Location",
    value: PERSON.location,
    icon: <LocationIcon />,
  },
  {
    id: "status",
    label: "Status",
    value: PERSON.status,
    icon: <StatusIcon />,
  },
  {
    id: "interest",
    label: "Interest",
    value: PERSON.interest,
    icon: <InterestIcon />,
  },
];

const focusBadgeIcons: Record<string, React.ReactNode> = {
  "Web Development": <CodeIcon />,
  "Full Stack Development": <LayersIcon />,
  "Software Engineering": <CpuIcon />,
  "UI/UX Design": <PaletteIcon />,
  "Continuous Learning": <BookIcon />,
};

const focusBadges: FocusBadge[] = PERSON.currentFocus.map((label) => ({
  label,
  icon: focusBadgeIcons[label] ?? <CodeIcon />,
}));

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-[20px]"
      aria-label="About section"
    >
      {/* ── Background decorations ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] rounded-full bg-blue-700/5 blur-[100px]" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(139,92,246,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-20">

          {/* ── Left column ── */}
          <motion.div
            className="flex-1 min-w-0 flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Section label */}
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[4px] text-[#3B82F6] uppercase font-inter">
                About
              </span>
              <div className="mt-2 h-px w-12 bg-gradient-to-r from-[#3B82F6] to-transparent" />
            </motion.div>

            {/* Animated sand-text */}
            <motion.div variants={itemVariants} className="mb-6 flex justify-center sm:justify-start">
              <SandTextHero width={420} height={130} />
            </motion.div>

            {/* Main heading */}
            <motion.h2
              variants={itemVariants}
              className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-white font-satoshi mb-8 whitespace-nowrap"
            >
              Getting to know me
              <span className="text-[#8B5CF6]">.</span>
            </motion.h2>

            {/* Bio paragraphs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-6 max-w-[580px]"
            >
              {PERSON.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[17px] leading-[1.85] text-[#A1A1AA] font-inter"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Current Focus */}
            <motion.div variants={itemVariants} className="mt-12">
              <p className="text-xs font-semibold tracking-[4px] text-[#3B82F6] uppercase font-inter mb-5">
                Current Focus
              </p>

              <div
                className="flex flex-wrap gap-3"
                role="list"
                aria-label="Current focus areas"
              >
                {focusBadges.map(({ label, icon }) => (
                  <motion.div
                    key={label}
                    role="listitem"
                    whileHover={{ scale: 1.03, y: -1 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2.5 h-[52px] px-5 rounded-full border border-[#2A2A2A] bg-transparent text-[#E5E7EB] text-[15px] font-medium font-inter cursor-default select-none transition-colors duration-200 hover:border-violet-500/35 hover:text-white hover:bg-violet-500/5"
                  >
                    <span className="text-[#8B5CF6]">{icon}</span>
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column — Profile card ── */}
          <motion.div
            className="w-full lg:w-[460px] xl:w-[480px] flex-shrink-0"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div
              className="relative w-full rounded-[32px] border border-[#2A2A2A] bg-[#111111] p-8 sm:p-10"
              style={{ boxShadow: "0 0 60px rgba(139,92,246,0.06), 0 24px 48px rgba(0,0,0,0.4)" }}
            >
              {/* Corner accent lines */}
              <div className="pointer-events-none absolute inset-0 rounded-[32px] overflow-hidden" aria-hidden="true">
                <div className="absolute top-5 left-5 h-7 w-7 border-t border-l border-violet-500/20 rounded-tl-lg" />
                <div className="absolute top-5 right-5 h-7 w-7 border-t border-r border-violet-500/20 rounded-tr-lg" />
                <div className="absolute bottom-5 left-5 h-7 w-7 border-b border-l border-violet-500/20 rounded-bl-lg" />
                <div className="absolute bottom-5 right-5 h-7 w-7 border-b border-r border-violet-500/20 rounded-br-lg" />
              </div>

              {/* Profile image */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {/* Glow ring */}
                  <div
                    className="absolute -inset-1.5 rounded-full opacity-50 blur-md"
                    style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
                    aria-hidden="true"
                  />
                  {/* Image container */}
                  <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden border-2 border-[#2A2A2A] bg-[#1A1A1A]">
                    <Image
                      src={PERSON.profileImage}
                      alt={`${PERSON.name} — ${PERSON.roleHighlight}`}
                      fill
                      sizes="(max-width: 640px) 200px, 240px"
                      className="object-cover object-top z-10"
                      priority
                      onLoad={(e) => {
                        const container = (e.currentTarget as HTMLImageElement).parentElement;
                        const fallback = container?.querySelector<HTMLDivElement>("[data-initials]");
                        if (fallback) fallback.style.display = "none";
                      }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    {/* Initials fallback — hidden on image load success */}
                    <div
                      data-initials
                      className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[#8B5CF6] font-satoshi select-none"
                      aria-hidden="true"
                    >
                      {PERSON.initials}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider before rows */}
              <div className="h-px w-full bg-[#2A2A2A] mb-6" />

              {/* Info rows */}
              <dl className="flex flex-col gap-0">
                {infoRows.map((row, index) => (
                  <div key={row.id}>
                    <div className="flex items-center gap-4 py-5">
                      {/* Icon box */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-[#8B5CF6]"
                        aria-hidden="true"
                      >
                        {row.icon}
                      </div>

                      {/* Label + value */}
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <dt className="text-[14px] font-medium text-[#8B5CF6] font-inter leading-none">
                          {row.label}
                        </dt>
                        <dd className="text-[16px] sm:text-[17px] font-medium text-white font-inter leading-snug truncate">
                          {row.value}
                        </dd>
                      </div>
                    </div>

                    {/* Divider between rows (not after last) */}
                    {index < infoRows.length - 1 && (
                      <div className="h-px w-full bg-[#2A2A2A]" />
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
