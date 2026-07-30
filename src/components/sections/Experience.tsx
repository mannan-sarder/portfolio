"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { EXPERIENCE_ITEMS } from "@/data/experience";
import type { ExperienceItem } from "@/types";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

type AccentIconProps = { accent: { base: string; soft: string }; uid: string };

const BriefcaseIcon = ({ accent, uid }: AccentIconProps) => (
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

const GraduationCapIcon = ({ accent, uid }: AccentIconProps) => (
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

const CalendarIcon = ({ accent, uid }: AccentIconProps) => (
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

const MapPinIcon = ({ accent, uid }: AccentIconProps) => (
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

const ExpandIcon = ({ accent, uid }: AccentIconProps) => (
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

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─── Lightbox ─────────────────────────────────────────────────────────────────

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

const ZOOM_STEP = 0.25;
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;

function Lightbox({
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

  // Reset zoom and pan when image changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [current]);

  // Reset pan when zoom returns to 1
  useEffect(() => {
    if (zoom === ZOOM_MIN) setPan({ x: 0, y: 0 });
  }, [zoom]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && !isDragging.current) setCurrent((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight" && !isDragging.current) setCurrent((i) => (i + 1) % images.length);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
      if (e.key === "-") setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
    } else {
      setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN));
    }
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= ZOOM_MIN) return;
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panAtDragStart.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({ x: panAtDragStart.current.x + dx, y: panAtDragStart.current.y + dy });
  };

  const handleMouseUp = () => { isDragging.current = false; };

  // Touch pan handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= ZOOM_MIN || e.touches.length !== 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panAtDragStart.current = { ...pan };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    e.stopPropagation();
    const dx = e.touches[0].clientX - dragStart.current.x;
    const dy = e.touches[0].clientY - dragStart.current.y;
    setPan({ x: panAtDragStart.current.x + dx, y: panAtDragStart.current.y + dy });
  };

  const handleTouchEnd = () => { isDragging.current = false; };

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);
  const zoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
  const zoomOut = () => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN));

  const isPanned = zoom > ZOOM_MIN;

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

      {/* Zoom controls */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          onClick={zoomOut}
          disabled={zoom <= ZOOM_MIN}
          aria-label="Zoom out"
        >
          <ZoomOutIcon />
        </button>
        <span className="text-[13px] text-white/70 font-geist min-w-[44px] text-center select-none">
          {Math.round(zoom * 100)}%
        </span>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          onClick={zoomIn}
          disabled={zoom >= ZOOM_MAX}
          aria-label="Zoom in"
        >
          <ZoomInIcon />
        </button>
      </div>

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

      <div
        className="relative w-[90vw] h-[80vh] max-w-4xl overflow-hidden select-none"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isPanned ? (isDragging.current ? "grabbing" : "grab") : "default" }}
      >
        <div
          className="relative w-full h-full origin-center"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: isDragging.current ? "none" : "transform 0.2s ease",
          }}
        >
          <Image src={images[current]} alt={`${alt} document ${current + 1}`} fill className="object-contain" sizes="90vw" draggable={false} />
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-[13px] text-white/70 font-geist">
          {current + 1} / {images.length}
        </div>
      )}
    </motion.div>,
    document.body
  );
}

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

// ─── Accent Palette ───────────────────────────────────────────────────────────
// Each timeline entry carries its own hue, cycling down the journey. Colour is
// restricted to borders, icon strokes, and thin gradients — never a filled
// "highlight" block — so the page stays multicolor without feeling loud.

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ACCENTS = [
  { base: "#8B5CF6", soft: "#C4B5FD" }, // violet
  { base: "#3B82F6", soft: "#93C5FD" }, // blue
  { base: "#10B981", soft: "#6EE7B7" }, // emerald
  { base: "#F59E0B", soft: "#FCD34D" }, // amber
  { base: "#F43F5E", soft: "#FDA4AF" }, // rose
] as const;

// ─── Timeline Entry (Two-Panel Card) ─────────────────────────────────────────

function TimelineEntry({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const isWork = item.type === "work";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div custom={index} variants={cardVariants}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-[300px_1fr] rounded-3xl border overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #181823 0%, #111118 100%)",
          borderColor: "#2A2A36",
          boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
          transition: "box-shadow 0.35s ease, border-color 0.35s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = `0 0 0 1px ${hexToRgba(accent.base, 0.45)}, 0 24px 64px ${hexToRgba(accent.base, 0.22)}, 0 8px 24px rgba(0,0,0,0.55)`;
          el.style.borderColor = hexToRgba(accent.base, 0.6);
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.35)";
          el.style.borderColor = "#2A2A36";
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          className="flex flex-col gap-5 p-7 border-b lg:border-b-0 lg:border-r"
          style={{
            background: `linear-gradient(180deg, ${hexToRgba(accent.base, 0.07)}, rgba(20,20,33,0.7) 45%)`,
            borderColor: "#2A2A36",
          }}
        >
          {/* Logo box */}
          <div
            className="relative flex items-center justify-center w-[120px] h-[120px] rounded-[22px] border overflow-hidden flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${hexToRgba(accent.base, 0.22)}, #14101f)`,
              borderColor: hexToRgba(accent.base, 0.55),
              color: accent.base,
            }}
            aria-hidden="true"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            ) : isWork ? (
              <BriefcaseIcon accent={accent} uid={String(item.id)} />
            ) : (
              <GraduationCapIcon accent={accent} uid={String(item.id)} />
            )}
          </div>

          {/* Organization + employment type */}
          <div className="flex flex-col gap-1">
            <h3 className="text-[20px] font-bold text-white leading-snug font-satoshi">
              {item.organization}
            </h3>
            {item.employmentType && (
              <p className="text-[15px] font-geist" style={{ color: accent.soft }}>
                {item.employmentType}
              </p>
            )}
          </div>

          {/* Thin divider */}
          <div className="w-full h-px bg-[#303040]" aria-hidden="true" />

          {/* Period + duration */}
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 text-[13px] text-white font-geist">
              <CalendarIcon accent={accent} uid={String(item.id)} />
              {item.period}
            </p>
            {item.duration && (
              <p className="text-[12px] text-[#9CA3AF] font-geist pl-[22px]">
                {item.duration}
              </p>
            )}
          </div>

          {/* Location + work mode */}
          {(item.location || item.workMode) && (
            <div className="flex flex-col gap-1">
              {item.location && (
                <p className="flex items-center gap-2 text-[13px] text-white font-geist">
                  <MapPinIcon accent={accent} uid={String(item.id)} />
                  {item.location}
                </p>
              )}
              {item.workMode && (
                <p className="text-[12px] text-[#9CA3AF] font-geist pl-[22px]">
                  {item.workMode}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex flex-col p-7 sm:p-8">
          {/* Type badge */}
          <div className="mb-5">
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-full border text-[12px] font-medium tracking-wide font-geist"
              style={{
                backgroundColor: hexToRgba(accent.base, 0.1),
                borderColor: hexToRgba(accent.base, 0.3),
                color: accent.soft,
              }}
            >
              {item.employmentType ?? (isWork ? "Work Experience" : "Education")}
            </span>
          </div>

          {/* Role title */}
          <h2 className="font-satoshi text-[clamp(26px,3vw,42px)] font-extrabold text-white leading-tight mb-3">
            {item.role}
          </h2>

          {/* Accent underline rule */}
          <div
            className="w-full h-px mb-6"
            style={{
              background: `linear-gradient(to right, ${accent.base}, ${hexToRgba(accent.base, 0.35)} 45%, transparent)`,
            }}
            aria-hidden="true"
          />

          {/* Bullet points */}
          {item.points.length > 0 && (
            <ul className="flex flex-col" role="list">
              {item.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 py-3.5 border-b border-[#2C2C38] last:border-0"
                >
                  {/* Circle icon */}
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5"
                    style={{
                      backgroundColor: hexToRgba(accent.base, 0.14),
                      borderColor: hexToRgba(accent.base, 0.55),
                    }}
                    aria-hidden="true"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent.base }} />
                  </div>
                  <span className="text-[14px] text-white/90 font-geist leading-[1.65]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Certificates & Recognition */}
          {item.images && item.images.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#2C2C38]">
              {/* Section label */}
              <div className="flex items-center gap-4 mb-4">
                <h4 className="text-[13px] font-semibold text-white font-satoshi whitespace-nowrap">
                  Certificates & Recognition
                </h4>
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(to right, ${hexToRgba(accent.base, 0.4)}, transparent)`,
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Image thumbnails */}
              <div
                className="flex flex-wrap gap-3"
                role="list"
                aria-label={`${item.organization} supporting images`}
              >
                {item.images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setLightboxIndex(i);
                      setLightboxOpen(true);
                    }}
                    className="group relative w-[100px] h-[68px] rounded-xl overflow-hidden border border-[#555] flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    style={{
                      background:
                        "linear-gradient(to bottom, #181823, #111118)",
                    }}
                    aria-label={`View ${item.organization} document ${i + 1} full screen`}
                  >
                    <Image
                      src={src}
                      alt={`${item.organization} document ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="100px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-200 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ExpandIcon accent={accent} uid={`${item.id}-${i}`} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.article>

      {lightboxOpen && item.images && (
        <Lightbox
          images={item.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          alt={item.organization}
        />
      )}
    </motion.div>
  );
}

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

      {/* Main container */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8">

        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center mb-12 lg:mb-14"
        >
          {/* Label */}
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

          {/* Heading */}
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

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-[700px] text-[18px] font-normal leading-relaxed text-[#A1A1AA] font-geist"
          >
            A timeline of roles and education that shaped how I build software.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-[960px] mx-auto flex flex-col gap-6"
          role="region"
          aria-label="Experience timeline"
        >
          {EXPERIENCE_ITEMS.map((item, i) => (
            <TimelineEntry
              key={item.id}
              item={item}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
