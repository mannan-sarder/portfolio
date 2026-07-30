"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import {
  ProjectCard,
  SubHeader,
  MonitorIcon,
  PhoneIcon,
  ArrowRightIcon,
} from "@/components/project/ProjectShared";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Tab Link — homepage tabs now hand off to the dedicated /projects page ────

function TabLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={[
        "relative h-8 px-6 rounded-full text-[15px] font-medium font-geist transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 inline-flex items-center",
        active
          ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]"
          : "border border-[#2A2A2A] bg-transparent text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6]/40",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

// "All" isn't a real destination — the preview already shows it — so it just
// re-affirms scroll position instead of navigating away to /projects.
function TabScrollButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative h-8 px-6 rounded-full text-[15px] font-medium font-geist transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
        active
          ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]"
          : "border border-[#2A2A2A] bg-transparent text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6]/40",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const webProjects = PROJECTS.filter((p) => p.type === "web");
  const mobileProjects = PROJECTS.filter((p) => p.type === "mobile");

  // "All" preview shows the first 2 of each category — full lists live on /projects
  const previewWeb = webProjects.slice(0, 2);
  const previewMobile = mobileProjects.slice(0, 2);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-[30px]"
      aria-label="Projects"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-blue-700/5 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-700/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8">

        {/* ── Section Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" aria-hidden="true" />
            <span className="text-[14px] font-semibold tracking-[0.2em] uppercase text-violet-400 font-geist">
              PROJECTS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" aria-hidden="true" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-satoshi text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.1] tracking-tight text-white mb-5"
          >
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              Built.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[18px] font-normal leading-[1.7] text-[#A1A1AA] font-geist max-w-[700px] mx-auto mb-4"
          >
            A collection of web and mobile applications I&apos;ve built to solve real-world problems.
          </motion.p>

          {/* Tabs — Web / Mobile open the full, dedicated listing; All just re-affirms position */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
            <TabScrollButton
              label="All"
              active
              onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            />
            <TabLink label="Web" href="/projects?type=web" active={false} />
            <TabLink label="Mobile" href="/projects?type=mobile" active={false} />
          </motion.div>
        </motion.div>

        {/* ── Preview ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-16"
        >
          {/* Web Projects */}
          <div>
            <SubHeader
              icon={<MonitorIcon />}
              title="Web Projects"
              subtitle="Full-stack web applications and platforms"
            />
            <div className="flex flex-col gap-6">
              {previewWeb.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Link
                href="/projects?type=web"
                className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-violet-500/25 text-[13px] font-semibold text-violet-400 font-geist hover:from-blue-500/20 hover:to-violet-500/20 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200"
              >
                View All Web Projects
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Mobile Projects */}
          <div>
            <SubHeader
              icon={<PhoneIcon />}
              title="Mobile Apps"
              subtitle="Cross-platform mobile applications"
            />
            <div className="flex flex-col gap-6">
              {previewMobile.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Link
                href="/projects?type=mobile"
                className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-violet-500/25 text-[13px] font-semibold text-violet-400 font-geist hover:from-blue-500/20 hover:to-violet-500/20 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200"
              >
                View All Mobile Apps
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
