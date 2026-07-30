"use client";

import { useState, useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";

// ─── Animation Variants ───────────────────────────────────────────────────────

export const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

export const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />
);

const MonitorIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const PhoneIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="20" x="5" y="2" rx="2" />
    <path d="M12 18h.01" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ArrowLeftIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const ZoomInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);

// ─── Tech Icon Map ────────────────────────────────────────────────────────────

const TECH_ICON_MAP: Record<string, string> = {
  "Next.js": "/icons/nextjs.svg",
  "React": "/icons/react.svg",
  "Tailwind CSS": "/icons/tailwindcss.svg",
  "Node.js": "/icons/nodejs.svg",
  "MongoDB": "/icons/mongodb.svg",
  "PostgreSQL": "/icons/postgresql.svg",
  "MySQL": "/icons/mysql.svg",
  "Firebase": "/icons/firebase.svg",
  "Flutter": "/icons/flutter.svg",
  "Dart": "/icons/dart.svg",
  "TypeScript": "/icons/typescript.svg",
  "JavaScript": "/icons/javascript.svg",
  "PHP": "/icons/php.svg",
  "Python": "/icons/python.svg",
  "Git": "/icons/git.svg",
  "GitHub": "/icons/github.svg",
  "MDX": "/icons/mdx.svg",
  "Hive": "/icons/hive.svg",
  "GetX": "/icons/getx.svg",
  "Provider": "/icons/provider.svg",
  "Charts": "/icons/charts.svg",
  "ObsrAI": "/icons/obsrai.svg",
  "HTML5": "/icons/html5.svg",
  "CSS3": "/icons/css3.svg",
  "Java": "/icons/java.svg",
  "C": "/icons/c.svg",
  "C++": "/icons/cpp.svg",
  "SQL": "/icons/sql.svg",
  "VS Code": "/icons/vscode.svg",
  "Android Studio": "/icons/androidstudio.svg",
  "XAMPP": "/icons/xampp.svg",
  "Postman": "/icons/postman.svg",
};

const CATEGORY_COLORS: Record<string, { text: string; border: string; bg: string; dot: string }> = {
  frontend: { text: "text-blue-400", border: "border-blue-500/25", bg: "bg-blue-500/15", dot: "bg-blue-400" },
  backend: { text: "text-emerald-400", border: "border-emerald-500/25", bg: "bg-emerald-500/15", dot: "bg-emerald-400" },
  database: { text: "text-orange-400", border: "border-orange-500/25", bg: "bg-orange-500/15", dot: "bg-orange-400" },
  tools: { text: "text-purple-400", border: "border-purple-500/25", bg: "bg-purple-500/15", dot: "bg-purple-400" },
};

// ─── Tech Badge ───────────────────────────────────────────────────────────────

export function TechBadge({ name, category }: { name: string; category?: string }) {
  const iconSrc = TECH_ICON_MAP[name];
  const colors = category ? CATEGORY_COLORS[category] : null;

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 h-8 px-3 rounded-full border text-[13px] font-medium font-geist transition-colors duration-200",
        colors ? `${colors.border} ${colors.bg}` : "border-[#2A2A2A] bg-[#141414]",
      ].join(" ")}
      style={{ color: "rgba(255,255,255,0.75)" }}
    >
      {iconSrc ? (
        <Image src={iconSrc} alt={name} width={14} height={14} className="flex-shrink-0 opacity-90" />
      ) : colors ? (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
      ) : null}
      {name}
    </span>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

export function Lightbox({
  images,
  startIndex,
  onClose,
  zoomable = false,
}: {
  images: { src: string; alt: string; caption?: string }[];
  startIndex: number;
  onClose: () => void;
  zoomable?: boolean;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [zoom, setZoom] = useState(1);

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.5;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    setZoom(1);
  }, [current]);

  const zoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
  const zoomOut = () => setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((i) => (i + 1) % images.length);
      if (zoomable && (e.key === "+" || e.key === "=")) zoomIn();
      if (zoomable && e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose, zoomable]);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-400 active:scale-95 text-white shadow-lg shadow-rose-500/30 transition-all duration-200"
        onClick={onClose}
        aria-label="Close"
      >
        <XIcon />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            <ArrowLeftIcon />
          </button>
          <button
            className="absolute right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <ArrowRightIcon />
          </button>
        </>
      )}

      {zoomable && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2 py-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
          >
            <ZoomOutIcon />
          </button>
          <span className="w-11 text-center text-[12px] text-white/80 font-geist select-none">
            {Math.round(zoom * 100)}%
          </span>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
          >
            <ZoomInIcon />
          </button>
        </div>
      )}

      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-6 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative w-full max-h-[85vh] rounded-xl flex items-center justify-center ${zoom > 1 ? "overflow-auto" : "overflow-hidden"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 0.2s ease" }}
          />
        </div>
        {images[current].caption && (
          <p className="mt-3 text-[13px] text-[#A1A1AA] font-geist">{images[current].caption}</p>
        )}
        {images.length > 1 && (
          <p className="mt-2 text-[12px] text-[#555] font-geist">{current + 1} / {images.length}</p>
        )}
      </div>
    </motion.div>,
    document.body
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
// Web: content (40%) on left, image (60%) on right — image aspect reduced to 16/9

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isWeb = project.type === "web";

  const imageBlock = (
    <div
      className={[
        "flex-shrink-0 w-full flex items-center justify-center",
        isWeb ? "md:w-[60%]" : "md:w-[38%]",
        "rounded-xl overflow-hidden bg-[#1A1A1A]",
      ].join(" ")}
    >
      <Image
        src={project.coverImage}
        alt={project.title}
        width={0}
        height={0}
        className="w-full h-auto"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </div>
  );

  const contentBlock = (
    <div className={`flex flex-col flex-1 justify-between min-w-0 p-6 md:p-8 ${isWeb ? "md:w-[40%]" : ""}`}>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-violet-400">
            {isWeb ? <MonitorIcon /> : <PhoneIcon />}
          </span>
          <h4 className="font-satoshi text-[20px] font-bold text-white">{project.title}</h4>
        </div>

        {project.subtitle && (
          <p className="text-[13px] text-violet-400 font-geist font-medium mb-3">{project.subtitle}</p>
        )}

        <p className="text-[14px] text-[#A1A1AA] font-geist leading-[1.65] mb-5">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 4).map((t) => (
            <TechBadge key={t.name} name={t.name} category={t.category} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl border border-[#2A2A2A] bg-transparent text-[13px] font-medium text-[#A1A1AA] font-geist hover:border-[#8B5CF6]/50 hover:text-white transition-all duration-200"
          >
            {project.type === "mobile" && !project.liveUrlLabel ? <PlayIcon /> : <ExternalLinkIcon />}
            {project.liveUrlLabel ?? (project.type === "mobile" ? "Google Play" : "Live Demo")}
          </a>
        )}
        {project.playStoreUrl && (
          <a
            href={project.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl border border-[#2A2A2A] bg-transparent text-[13px] font-medium text-[#A1A1AA] font-geist hover:border-[#8B5CF6]/50 hover:text-white transition-all duration-200"
          >
            <PlayIcon />
            Play Store
          </a>
        )}
        {project.appStoreUrl && (
          <a
            href={project.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl border border-[#2A2A2A] bg-transparent text-[13px] font-medium text-[#A1A1AA] font-geist hover:border-[#8B5CF6]/50 hover:text-white transition-all duration-200"
          >
            <ExternalLinkIcon />
            App Store
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl border border-[#2A2A2A] bg-transparent text-[13px] font-medium text-[#A1A1AA] font-geist hover:border-[#8B5CF6]/50 hover:text-white transition-all duration-200"
          >
            <GithubIcon />
            GitHub
          </a>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-violet-600/15 border border-violet-500/25 text-[13px] font-medium text-violet-400 font-geist hover:bg-violet-600/25 hover:border-violet-500/40 transition-all duration-200"
        >
          Details
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative rounded-2xl border border-[#2A2A2A] bg-[#111111] overflow-hidden"
      style={{ transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(139,92,246,0.3)";
        el.style.boxShadow = "0 0 0 1px rgba(139,92,246,0.1), 0 12px 40px rgba(139,92,246,0.07)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "#2A2A2A";
        el.style.boxShadow = "none";
      }}
    >
      <div className="flex flex-col md:flex-row">
        {isWeb ? (
          <>
            {contentBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {contentBlock}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

export function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick?: () => void }) {
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

// ─── Sub Header ───────────────────────────────────────────────────────────────

export function SubHeader({ icon, title, subtitle }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-violet-400">{icon}</span>
      <div>
        <h3 className="font-satoshi text-[20px] font-bold text-white">{title}</h3>
        <p className="text-[13px] text-[#A1A1AA] font-geist">{subtitle}</p>
      </div>
    </div>
  );
}

export { MonitorIcon, PhoneIcon };

// ─── Tech Stack Grouped ───────────────────────────────────────────────────────

const SECTION_COLORS: Record<string, string> = {
  problem: "#f43f5e",
  solution: "#10b981",
  userFlow: "#3b82f6",
  appArchitecture: "#7c3aed",
  myRole: "#3b82f6",
  duration: "#f59e0b",
  keyFeatures: "#6366f1",
  techStack: "#7c3aed",
  screenshots: "#06b6d4",
  challenges: "#f97316",
  lessonsLearned: "#06b6d4",
  results: "#10b981",
  futureImprovements: "#a855f7",
};

const CATEGORY_META: { key: string; label: string; color: string }[] = [
  { key: "frontend", label: "Frontend", color: "#3b82f6" },
  { key: "backend", label: "Backend", color: "#10b981" },
  { key: "database", label: "Database", color: "#f97316" },
  { key: "tools", label: "Tools", color: "#a855f7" },
];

function TechStackSection({ techStack }: { techStack: Project["techStack"] }) {
  const grouped = CATEGORY_META
    .map((cat) => ({ ...cat, items: techStack.filter((t) => t.category === cat.key) }))
    .filter((cat) => cat.items.length > 0);

  const uncategorized = techStack.filter((t) => !t.category);

  return (
    <div>
      {grouped.length > 0 ? (
        <div className="rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] overflow-hidden divide-y divide-[#1E1E1E]">
          <div className="px-6 pt-5 pb-3">
            <h2 className="font-satoshi text-[20px] font-bold" style={{ color: SECTION_COLORS.techStack }}>
              Tech Stack
            </h2>
          </div>
          {grouped.map((cat) => (
            <div key={cat.key} className="flex items-start gap-5 px-5 py-4" style={{ borderLeft: `3px solid ${cat.color}` }}>
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] font-geist w-20 flex-shrink-0 pt-2.5" style={{ color: cat.color }}>
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {cat.items.map((t) => <TechBadge key={t.name} name={t.name} category={t.category} />)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {uncategorized.map((t) => <TechBadge key={t.name} name={t.name} />)}
        </div>
      )}
    </div>
  );
}

// ─── Two Column Section ───────────────────────────────────────────────────────

function TwoColumn({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {left}
      {right}
    </div>
  );
}

// ─── Section Block ──────────────────────────────────────────────────────────

function SectionBlock({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div
      className="rounded-2xl bg-[#111111] p-6"
      style={{ borderTop: "1px solid #2A2A2A", borderRight: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A", borderLeft: `3px solid ${color}` }}
    >
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] font-geist mb-3" style={{ color }}>
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <p key={i} className="text-[14px] text-[#A1A1AA] font-geist leading-[1.7]">{item}</p>
        ))}
      </div>
    </div>
  );
}

// ─── Flow Block ───────────────────────────────────────────────────────────────

function FlowBlock({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div
      className="rounded-2xl bg-[#111111] p-6"
      style={{ borderTop: "1px solid #2A2A2A", borderRight: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A", borderLeft: `3px solid ${color}` }}
    >
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] font-geist mb-4" style={{ color }}>
        {title}
      </h3>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-start">
            <div className="flex items-start gap-2.5">
              <span className="flex-shrink-0 mt-2 w-3.5 text-[2px] font-bold font-geist leading-none" style={{ color: "#A1A1AA" }}>—</span>
              <p className="text-[14px] text-[#A1A1AA] font-geist leading-[1.7]">{item}</p>
            </div>
            {i < items.length - 1 && (
              <div className="ml-2.5 flex items-center" style={{ color: "#7BF1A8" }}>
                <svg viewBox="0 0 12 16" fill="currentColor" className="w-1.5 h-2.5 mx-auto">
                  <path d="M5 0h2v10H5zM0 9l6 7 6-7H8V8H4v1H0z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Arch Block ───────────────────────────────────────────────────────────────

const ARCH_BADGE_COLOR = "#F1F5F9";

function ArchBlock({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div
      className="rounded-2xl bg-[#111111] p-6"
      style={{ borderTop: "1px solid #2A2A2A", borderRight: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A", borderLeft: `3px solid ${color}` }}
    >
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] font-geist mb-4" style={{ color }}>
        {title}
      </h3>
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-2.5 gap-y-3">
        {items.map((item, i) => {
          const [badge, text] = item.includes("::") ? item.split("::") : [null, item];
          return (
            <Fragment key={i}>
              {badge ? (
                <span
                  className="justify-self-start mt-0.5 text-[10px] font-bold font-geist uppercase tracking-[0.08em] px-2 py-0.5 rounded-md"
                  style={{ color: ARCH_BADGE_COLOR, background: `${ARCH_BADGE_COLOR}18`, border: `1px solid ${ARCH_BADGE_COLOR}35` }}
                >
                  {badge}
                </span>
              ) : (
                <span />
              )}
              <p className="text-[14px] text-[#A1A1AA] font-geist leading-[1.7]">{text}</p>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ─── Screenshots Carousel ─────────────────────────────────────────────────────

const screenshotSlideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }),
};

function ScreenshotsCarousel({
  screenshots,
  onOpenLightbox,
  isWeb = false,
}: {
  screenshots: NonNullable<Project["screenshots"]>;
  onOpenLightbox: (index: number) => void;
  isWeb?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = () => { setDirection(-1); setCurrent((i) => (i - 1 + screenshots.length) % screenshots.length); };
  const next = () => { setDirection(1); setCurrent((i) => (i + 1) % screenshots.length); };
  const goTo = (i: number) => { setDirection(i > current ? 1 : -1); setCurrent(i); };

  return (
    <div>
      <h2 className="font-satoshi text-[20px] font-bold mb-5" style={{ color: SECTION_COLORS.screenshots }}>
        Screenshots
      </h2>

      <div className={isWeb ? "max-w-[1100px] w-full mx-auto" : "max-w-[620px] w-full mx-auto"}>
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(#0A0A0A, #0A0A0A) padding-box, linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%) border-box",
            border: "1px solid transparent",
            boxShadow: "0 0 0 1px rgba(6,182,212,0.18), 0 0 48px rgba(6,182,212,0.10)",
          }}
        >
          <div className={isWeb ? "relative w-full h-[240px] sm:h-[340px] md:h-[550px]" : "relative w-full h-[380px] sm:h-[500px] md:h-[500px]"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={`backdrop-${current}`}
              src={screenshots[current].src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "blur(28px) brightness(0.35) saturate(1.2)", transform: "scale(1.12)" }}
            />
            <div className="absolute inset-0 bg-black/25" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={screenshotSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => onOpenLightbox(current)}
              >
                <Image
                  src={screenshots[current].src}
                  alt={screenshots[current].alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full"
                  style={{ objectFit: "contain" }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                <button className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200" aria-label="Fullscreen">
                  <ExpandIcon />
                </button>
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-3 left-3 z-10 flex items-center h-7 px-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[12px] font-medium text-white/65 font-geist select-none pointer-events-none">
              {current + 1} / {screenshots.length}
            </div>

            {screenshots[current].caption && (
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-12 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none">
                <p className="text-[13px] text-white/90 font-geist">{screenshots[current].caption}</p>
              </div>
            )}

            {screenshots.length > 1 && (
              <>
                <button className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 text-white hover:bg-white/15 hover:border-white/30 hover:scale-110 active:scale-95 transition-all duration-200" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
                  <ArrowLeftIcon />
                </button>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 text-white hover:bg-white/15 hover:border-white/30 hover:scale-110 active:scale-95 transition-all duration-200" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
                  <ArrowRightIcon />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {screenshots.length > 1 && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
          {screenshots.map((ss, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-200"
              style={{
                width: "88px",
                height: "56px",
                border: `2px solid ${i === current ? "#06b6d4" : "rgba(255,255,255,0.08)"}`,
                boxShadow: i === current ? "0 0 0 1px #06b6d4, 0 0 14px rgba(6,182,212,0.35)" : "none",
                transform: i === current ? "scale(1.06)" : "scale(1)",
                opacity: i === current ? 1 : 0.5,
              }}
            >
              <Image src={ss.src} alt={ss.alt} fill className="object-cover" sizes="88px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Project Detail ─────────────────────────────────────────────────────────
// Full detail view — used both on the dedicated /projects/[slug] page and
// (optionally) anywhere else a full write-up is needed.

export function ProjectDetail({
  project,
  allProjects,
  backHref,
  backLabel = "Back to Projects",
}: {
  project: Project;
  allProjects: Project[];
  backHref: string;
  backLabel?: string;
}) {
  const isWeb = project.type === "web";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string; caption?: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomable, setLightboxZoomable] = useState(false);

  const sameTypeProjects = allProjects.filter((p) => p.type === project.type);
  const currentIndex = sameTypeProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? sameTypeProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < sameTypeProjects.length - 1 ? sameTypeProjects[currentIndex + 1] : null;

  const openLightbox = (images: { src: string; alt: string; caption?: string }[], index: number, zoomable = false) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxZoomable(zoomable);
    setLightboxOpen(true);
  };

  const mockupImages = project.mockupImage
    ? [{ src: project.mockupImage, alt: project.title }]
    : [{ src: project.coverImage, alt: project.title }];

  const infoBlock = (
    <div className="flex flex-col justify-center">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-violet-500/15 border border-violet-500/25 text-[12px] font-semibold text-violet-400 tracking-wide uppercase font-geist">
          {isWeb ? <MonitorIcon className="w-3.5 h-3.5" /> : <PhoneIcon className="w-3.5 h-3.5" />}
          {isWeb ? "Web Project" : "Mobile App"}
        </span>
      </div>

      <h1 className="font-satoshi text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-tight mb-2">
        {project.title}
      </h1>

      {project.subtitle && (
        <p className="text-[16px] text-violet-400 font-geist font-medium mb-4">{project.subtitle}</p>
      )}

      <p className="text-[15px] text-[#A1A1AA] font-geist leading-[1.75] mb-8 max-w-[480px]">
        {project.description}
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-[14px] font-semibold font-geist hover:opacity-90 active:scale-[0.98] transition-all duration-200">
            {project.liveUrlLabel ?? (isWeb ? "View Live Demo" : "Google Play")}
            <ExternalLinkIcon />
          </a>
        )}
        {project.playStoreUrl && (
          <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl border border-[#2A2A2A] bg-transparent text-white text-[14px] font-semibold font-geist hover:border-[#8B5CF6]/50 active:scale-[0.98] transition-all duration-200">
            <PlayIcon />
            Play Store
          </a>
        )}
        {project.appStoreUrl && (
          <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl border border-[#2A2A2A] bg-transparent text-white text-[14px] font-semibold font-geist hover:border-[#8B5CF6]/50 active:scale-[0.98] transition-all duration-200">
            <ExternalLinkIcon />
            App Store
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl border border-[#2A2A2A] bg-transparent text-white text-[14px] font-semibold font-geist hover:border-[#8B5CF6]/50 active:scale-[0.98] transition-all duration-200">
            <GithubIcon />
            GitHub
          </a>
        )}
        {project.caseStudyUrl && (
          <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl border border-[#2A2A2A] bg-transparent text-white text-[14px] font-semibold font-geist hover:border-[#8B5CF6]/50 active:scale-[0.98] transition-all duration-200">
            Case Study
            <ArrowRightIcon />
          </a>
        )}
      </div>
    </div>
  );

  const imageBlock = (
    <div
      className={`relative ${isWeb ? "" : "max-w-[480px] mx-auto w-full"} rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] cursor-pointer group flex items-center justify-center`}
      onClick={() => openLightbox(mockupImages, 0)}
    >
      <Image
        src={project.mockupImage ?? project.coverImage}
        alt={project.title}
        width={0}
        height={0}
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="w-full h-auto"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      <button className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200" aria-label="Fullscreen">
        <ExpandIcon />
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-10"
    >
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox images={lightboxImages} startIndex={lightboxIndex} zoomable={lightboxZoomable} onClose={() => setLightboxOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sticky back link */}
      <div className="sticky top-[80px] z-10 -mx-6 sm:-mx-8 px-6 sm:px-8 py-4 mb-2 bg-[#0A0A0A]/90 backdrop-blur-sm">
        <Link href={backHref} className="inline-flex items-center gap-2 text-[14px] text-[#A1A1AA] font-geist hover:text-white transition-colors duration-200">
          <ArrowLeftIcon />
          {backLabel}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {isWeb ? <>{infoBlock}{imageBlock}</> : <>{imageBlock}{infoBlock}</>}
      </div>

      <div className="border-t border-[#2A2A2A]" />

      {isWeb ? (
        (project.problem || project.solution) && (
          <TwoColumn
            left={project.problem ? <SectionBlock title="Problem" items={project.problem} color={SECTION_COLORS.problem} /> : <div />}
            right={project.solution ? <SectionBlock title="Solution" items={project.solution} color={SECTION_COLORS.solution} /> : <div />}
          />
        )
      ) : (
        (project.userFlow || project.appArchitecture) && (
          <TwoColumn
            left={project.userFlow ? <FlowBlock title="User Flow" items={project.userFlow} color={SECTION_COLORS.userFlow} /> : <div />}
            right={project.appArchitecture ? <ArchBlock title="App Architecture" items={project.appArchitecture} color={SECTION_COLORS.appArchitecture} /> : <div />}
          />
        )
      )}

      {(project.myRole || project.duration) && (
        <TwoColumn
          left={
            <div className="rounded-2xl bg-[#111111] p-6" style={{ borderTop: "1px solid #2A2A2A", borderRight: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A", borderLeft: `3px solid ${SECTION_COLORS.myRole}` }}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] font-geist mb-2" style={{ color: SECTION_COLORS.myRole }}>My Role</p>
              <p className="text-[16px] font-satoshi font-bold text-white">{project.myRole ?? "—"}</p>
            </div>
          }
          right={
            <div className="rounded-2xl bg-[#111111] p-6" style={{ borderTop: "1px solid #2A2A2A", borderRight: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A", borderLeft: `3px solid ${SECTION_COLORS.duration}` }}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] font-geist mb-2" style={{ color: SECTION_COLORS.duration }}>Duration</p>
              <p className="text-[16px] font-satoshi font-bold text-white">{project.duration ?? "—"}</p>
            </div>
          }
        />
      )}

      {project.features.length > 0 && (
        <div className="rounded-2xl bg-[#111111] p-6" style={{ borderTop: "1px solid #2A2A2A", borderRight: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A", borderLeft: `3px solid ${SECTION_COLORS.keyFeatures}` }}>
          <h2 className="font-satoshi text-[20px] font-bold mb-5" style={{ color: SECTION_COLORS.keyFeatures }}>Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-violet-400 flex-shrink-0 mt-0.5"><CheckIcon /></span>
                <p className="text-[14px] text-[#A1A1AA] font-geist leading-[1.65]">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl overflow-hidden">
        <TechStackSection techStack={project.techStack} />
      </div>

      {project.screenshots && project.screenshots.length > 0 && (
        <ScreenshotsCarousel
          screenshots={project.screenshots}
          onOpenLightbox={(index) => openLightbox(project.screenshots ?? [], index, true)}
          isWeb={isWeb}
        />
      )}

      {(project.challenges || project.lessonsLearned) && (
        <TwoColumn
          left={project.challenges ? <SectionBlock title="Challenges" items={project.challenges} color={SECTION_COLORS.challenges} /> : <div />}
          right={project.lessonsLearned ? <SectionBlock title="Lessons Learned" items={project.lessonsLearned} color={SECTION_COLORS.lessonsLearned} /> : <div />}
        />
      )}

      {isWeb && project.results && (
        <SectionBlock title="Results / Impact" items={project.results} color={SECTION_COLORS.results} />
      )}

      {!isWeb && project.futureImprovements && (
        <SectionBlock title="Future Improvements" items={project.futureImprovements} color={SECTION_COLORS.futureImprovements} />
      )}

      {(prevProject || nextProject) && (
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#2A2A2A]">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="inline-flex items-center gap-2 text-[14px] text-[#A1A1AA] font-geist hover:text-white transition-colors duration-200">
              <ArrowLeftIcon />
              <span>
                <span className="block text-[11px] text-[#555] mb-0.5">Previous</span>
                {prevProject.title}
              </span>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="inline-flex items-center gap-2 text-[14px] text-[#A1A1AA] font-geist hover:text-white transition-colors duration-200 text-right">
              <span>
                <span className="block text-[11px] text-[#555] mb-0.5">Next</span>
                {nextProject.title}
              </span>
              <ArrowRightIcon />
            </Link>
          ) : <div />}
        </div>
      )}
    </motion.div>
  );
}
