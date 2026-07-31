"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ExperienceItem } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const ACCENTS = [
  { base: "#8B5CF6", soft: "#C4B5FD" },
  { base: "#3B82F6", soft: "#93C5FD" },
  { base: "#10B981", soft: "#6EE7B7" },
  { base: "#F59E0B", soft: "#FCD34D" },
  { base: "#F43F5E", soft: "#FDA4AF" },
] as const;

// ─── Animation Variants ───────────────────────────────────────────────────────

export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

type AccentIconProps = { accent: { base: string; soft: string }; uid: string };

export const BriefcaseIcon = ({ accent, uid }: AccentIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9" aria-hidden="true">
    <defs>
      <linearGradient id={`briefcase-${uid}`} x1="2" y1="5" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={accent.soft} />
        <stop offset="100%" stopColor={accent.base} />
      </linearGradient>
      <filter id={`briefcase-glow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.1" floodColor={accent.base} floodOpacity="0.5" />
      </filter>
    </defs>
    <g filter={`url(#briefcase-glow-${uid})`}>
      <rect x="2" y="7" width="20" height="14" rx="2" stroke={`url(#briefcase-${uid})`} fill={hexToRgba(accent.base, 0.16)} />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke={`url(#briefcase-${uid})`} />
    </g>
  </svg>
);

export const GraduationCapIcon = ({ accent, uid }: AccentIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9" aria-hidden="true">
    <defs>
      <linearGradient id={`gradcap-${uid}`} x1="2" y1="5" x2="22" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={accent.soft} />
        <stop offset="100%" stopColor={accent.base} />
      </linearGradient>
      <filter id={`gradcap-glow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.1" floodColor={accent.base} floodOpacity="0.5" />
      </filter>
    </defs>
    <g filter={`url(#gradcap-glow-${uid})`}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" stroke={`url(#gradcap-${uid})`} fill={hexToRgba(accent.base, 0.16)} />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" stroke={`url(#gradcap-${uid})`} />
    </g>
  </svg>
);

export const CalendarIcon = ({ accent, uid }: AccentIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
    <defs>
      <linearGradient id={`cal-${uid}`} x1="3" y1="4" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={accent.soft} />
        <stop offset="100%" stopColor={accent.base} />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={`url(#cal-${uid})`} fill={hexToRgba(accent.base, 0.16)} />
    <line x1="16" y1="2" x2="16" y2="6" stroke={`url(#cal-${uid})`} />
    <line x1="8" y1="2" x2="8" y2="6" stroke={`url(#cal-${uid})`} />
    <line x1="3" y1="10" x2="21" y2="10" stroke={`url(#cal-${uid})`} />
  </svg>
);

export const MapPinIcon = ({ accent, uid }: AccentIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
    <defs>
      <linearGradient id={`pin-${uid}`} x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={accent.soft} />
        <stop offset="100%" stopColor={accent.base} />
      </linearGradient>
    </defs>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke={`url(#pin-${uid})`} fill={hexToRgba(accent.base, 0.16)} />
    <circle cx="12" cy="10" r="3" stroke={`url(#pin-${uid})`} fill={accent.base} fillOpacity={0.4} />
  </svg>
);

export const ExpandIcon = ({ accent, uid }: AccentIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <defs>
      <linearGradient id={`expand-${uid}`} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={accent.soft} />
        <stop offset="100%" stopColor={accent.base} />
      </linearGradient>
      <filter id={`expand-glow-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.3" floodColor={accent.base} floodOpacity="0.6" />
      </filter>
    </defs>
    <g filter={`url(#expand-glow-${uid})`}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke={`url(#expand-${uid})`} />
    </g>
  </svg>
);

export const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ArrowRightSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ZoomInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const ZOOM_STEP = 0.25;
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;

export function Lightbox({
  images,
  startIndex,
  onClose,
  alt,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
  alt: string;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panAtDragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, [current]);
  useEffect(() => { if (zoom === ZOOM_MIN) setPan({ x: 0, y: 0 }); }, [zoom]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((i) => (i + 1) % images.length);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
      if (e.key === "-") setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    setZoom((z) => e.deltaY < 0 ? Math.min(z + ZOOM_STEP, ZOOM_MAX) : Math.max(z - ZOOM_STEP, ZOOM_MIN));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= ZOOM_MIN) return;
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panAtDragStart.current = { ...pan };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({ x: panAtDragStart.current.x + (e.clientX - dragStart.current.x), y: panAtDragStart.current.y + (e.clientY - dragStart.current.y) });
  };
  const handleMouseUp = () => { isDragging.current = false; };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= ZOOM_MIN || e.touches.length !== 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panAtDragStart.current = { ...pan };
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    e.stopPropagation();
    setPan({ x: panAtDragStart.current.x + (e.touches[0].clientX - dragStart.current.x), y: panAtDragStart.current.y + (e.touches[0].clientY - dragStart.current.y) });
  };
  const handleTouchEnd = () => { isDragging.current = false; };

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-400 active:scale-95 text-white shadow-lg shadow-rose-500/30 transition-all duration-200" onClick={onClose} aria-label="Close"><XIcon /></button>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" onClick={() => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN))} disabled={zoom <= ZOOM_MIN} aria-label="Zoom out"><ZoomOutIcon /></button>
        <span className="text-[13px] text-white/70 font-geist min-w-[44px] text-center select-none">{Math.round(zoom * 100)}%</span>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" onClick={() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX))} disabled={zoom >= ZOOM_MAX} aria-label="Zoom in"><ZoomInIcon /></button>
      </div>

      {images.length > 1 && (
        <>
          <button className="absolute left-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"><ArrowLeftIcon /></button>
          <button className="absolute right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"><ArrowRightIcon /></button>
        </>
      )}

      <div
        className="relative w-[90vw] h-[80vh] max-w-4xl overflow-hidden select-none"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        style={{ cursor: zoom > ZOOM_MIN ? (isDragging.current ? "grabbing" : "grab") : "default" }}
      >
        <div className="relative w-full h-full origin-center" style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`, transition: isDragging.current ? "none" : "transform 0.2s ease" }}>
          <Image src={images[current]} alt={`${alt} document ${current + 1}`} fill className="object-contain" sizes="90vw" draggable={false} />
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-[13px] text-white/70 font-geist">{current + 1} / {images.length}</div>
      )}
    </motion.div>,
    document.body
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

export function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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

// ─── Timeline Entry Card ──────────────────────────────────────────────────────

export function TimelineEntry({ item, index }: { item: ExperienceItem; index: number }) {
  const isWork = item.type === "work";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div custom={index} variants={cardVariants}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-[260px_1fr] rounded-3xl border overflow-hidden"
        style={{ background: "linear-gradient(135deg, #181823 0%, #111118 100%)", borderColor: "#2A2A36", boxShadow: "0 12px 32px rgba(0,0,0,0.35)", transition: "box-shadow 0.35s ease, border-color 0.35s ease" }}
        onMouseEnter={(e) => { const el = e.currentTarget; el.style.boxShadow = `0 0 0 1px ${hexToRgba(accent.base, 0.45)}, 0 24px 64px ${hexToRgba(accent.base, 0.22)}, 0 8px 24px rgba(0,0,0,0.55)`; el.style.borderColor = hexToRgba(accent.base, 0.6); }}
        onMouseLeave={(e) => { const el = e.currentTarget; el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.35)"; el.style.borderColor = "#2A2A36"; }}
      >
        {/* LEFT PANEL */}
        <div className="flex flex-col gap-3 p-5 border-b lg:border-b-0 lg:border-r" style={{ background: `linear-gradient(180deg, ${hexToRgba(accent.base, 0.07)}, rgba(20,20,33,0.7) 45%)`, borderColor: "#2A2A36" }}>
          <div className="relative flex items-center justify-center w-[88px] h-[88px] rounded-[18px] border overflow-hidden flex-shrink-0" style={{ background: `linear-gradient(135deg, ${hexToRgba(accent.base, 0.22)}, #14101f)`, borderColor: hexToRgba(accent.base, 0.55), color: accent.base }} aria-hidden="true">
            {item.image ? (
              <Image src={item.image} alt="" fill className="object-cover" sizes="88px" />
            ) : isWork ? (
              <BriefcaseIcon accent={accent} uid={String(item.id)} />
            ) : (
              <GraduationCapIcon accent={accent} uid={String(item.id)} />
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <h3 className="text-[17px] font-bold text-white leading-snug font-satoshi">{item.organization}</h3>
            {item.employmentType && <p className="text-[13px] font-geist" style={{ color: accent.soft }}>{item.employmentType}</p>}
          </div>

          <div className="w-full h-px bg-[#303040]" aria-hidden="true" />

          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 text-[12px] text-white font-geist"><CalendarIcon accent={accent} uid={String(item.id)} />{item.period}</p>
            {item.duration && <p className="text-[11px] text-[#9CA3AF] font-geist pl-[22px]">{item.duration}</p>}
            {item.location && <p className="flex items-center gap-2 text-[12px] text-white font-geist mt-0.5"><MapPinIcon accent={accent} uid={String(item.id)} />{item.location}</p>}
            {item.workMode && <p className="text-[11px] text-[#9CA3AF] font-geist pl-[22px]">{item.workMode}</p>}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col p-5 sm:p-6">
          <div className="mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-medium tracking-wide font-geist" style={{ backgroundColor: hexToRgba(accent.base, 0.1), borderColor: hexToRgba(accent.base, 0.3), color: accent.soft }}>
              {item.employmentType ?? (isWork ? "Work Experience" : "Education")}
            </span>
          </div>

          <h2 className="font-satoshi text-[clamp(22px,2.6vw,34px)] font-extrabold text-white leading-tight mb-2">{item.role}</h2>

          <div className="w-full h-px mb-4" style={{ background: `linear-gradient(to right, ${accent.base}, ${hexToRgba(accent.base, 0.35)} 45%, transparent)` }} aria-hidden="true" />

          {item.points.length > 0 && (
            <ul className="flex flex-col" role="list">
              {item.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 py-2.5 border-b border-[#2C2C38] last:border-0">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mt-0.5" style={{ backgroundColor: hexToRgba(accent.base, 0.14), borderColor: hexToRgba(accent.base, 0.55) }} aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.base }} />
                  </div>
                  <span className="text-[13px] text-white/90 font-geist leading-[1.6]">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {item.images && item.images.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#2C2C38]">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-[13px] font-semibold text-white font-satoshi whitespace-nowrap">Certificates & Recognition</h4>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${hexToRgba(accent.base, 0.4)}, transparent)` }} aria-hidden="true" />
              </div>
              <div className="flex flex-wrap gap-3" role="list" aria-label={`${item.organization} supporting images`}>
                {item.images.map((src, i) => (
                  <button key={i} type="button" onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }} className="group relative w-[100px] h-[68px] rounded-xl overflow-hidden border border-[#555] flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" style={{ background: "linear-gradient(to bottom, #181823, #111118)" }} aria-label={`View ${item.organization} document ${i + 1} full screen`}>
                    <Image src={src} alt={`${item.organization} document ${i + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="100px" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-200 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"><ExpandIcon accent={accent} uid={`${item.id}-${i}`} /></span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.article>

      {lightboxOpen && item.images && (
        <Lightbox images={item.images} startIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} alt={item.organization} />
      )}
    </motion.div>
  );
}
