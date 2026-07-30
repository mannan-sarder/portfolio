"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCard, TabButton, SubHeader, MonitorIcon, PhoneIcon } from "@/components/project/ProjectShared";

type Tab = "all" | "web" | "mobile";

export default function ProjectsListing({
  projects,
  initialType,
}: {
  projects: Project[];
  initialType: Tab;
}) {
  const [tab, setTab] = useState<Tab>(initialType);

  const webProjects = projects.filter((p) => p.type === "web");
  const mobileProjects = projects.filter((p) => p.type === "mobile");

  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" aria-hidden="true" />
          <span className="text-[14px] font-semibold tracking-[0.2em] uppercase text-violet-400 font-geist">
            PROJECTS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" aria-hidden="true" />
        </div>

        <h1 className="font-satoshi text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight text-white mb-5">
          All{" "}
          <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
            Projects.
          </span>
        </h1>

        <p className="text-[18px] font-normal leading-[1.7] text-[#A1A1AA] font-geist max-w-[700px] mx-auto mb-8">
          Every web and mobile application I&apos;ve built to solve real-world problems.
        </p>

        <div className="flex items-center justify-center gap-3">
          <TabButton label="All" active={tab === "all"} onClick={() => setTab("all")} />
          <TabButton label="Web" active={tab === "web"} onClick={() => setTab("web")} />
          <TabButton label="Mobile" active={tab === "mobile"} onClick={() => setTab("mobile")} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-16"
        >
          {tab === "all" && (
            <>
              <div>
                <SubHeader icon={<MonitorIcon />} title="Web Projects" subtitle="Full-stack web applications and platforms" />
                <div className="flex flex-col gap-6">
                  {webProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
                </div>
              </div>
              <div>
                <SubHeader icon={<PhoneIcon />} title="Mobile Apps" subtitle="Cross-platform mobile applications" />
                <div className="flex flex-col gap-6">
                  {mobileProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
                </div>
              </div>
            </>
          )}

          {tab === "web" && (
            <div className="flex flex-col gap-6">
              {webProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          )}

          {tab === "mobile" && (
            <div className="flex flex-col gap-6">
              {mobileProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
