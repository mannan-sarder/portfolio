"use client";

import { useRef, useState, useEffect, useId, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { STORIES } from "@/data/behind the code";

// ─── Types ────────────────────────────────────────────────────────────────────

type Story = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string[];
  date: string;
  location?: string;
  coverImage: string;
  supportingImages: {
    src: string;
    alt: string;
  }[];
  galleryImages: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  photoCount?: number;
};

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Category Config ──────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  Travel: {
    color: "text-violet-400",
    bg: "bg-violet-500/15",
    border: "border-violet-500/25",
    icon: "🧭",
  },
  Farming: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/25",
    icon: "🌱",
  },
  Food: {
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    border: "border-amber-500/25",
    icon: "🍜",
  },
  Nature: {
    color: "text-teal-400",
    bg: "bg-teal-500/15",
    border: "border-teal-500/25",
    icon: "🌿",
  },
  Photography: {
    color: "text-pink-400",
    bg: "bg-pink-500/15",
    border: "border-pink-500/25",
    icon: "📷",
  },
  "Life Moments": {
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/25",
    icon: "✨",
  },
};

function getCategoryStyle(category: string) {
  return (
    CATEGORY_CONFIG[category] ?? {
      color: "text-violet-400",
      bg: "bg-violet-500/15",
      border: "border-violet-500/25",
      icon: "📌",
    }
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

// ─── Category Badge ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  const style = getCategoryStyle(category);
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full border text-[12px] font-semibold font-geist ${style.color} ${style.bg} ${style.border}`}
    >
      <span>{style.icon}</span>
      {category}
    </span>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: { src: string; alt: string; caption?: string }[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-400 active:scale-95 text-white shadow-lg shadow-rose-500/30 transition-all duration-200"
        onClick={onClose}
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
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

      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-6 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>
        {images[current].caption && (
          <p className="mt-3 text-[13px] text-[#A1A1AA] font-geist">{images[current].caption}</p>
        )}
        <p className="mt-2 text-[12px] text-[#555] font-geist">
          {current + 1} / {images.length}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Story Row (Main List) ─────────────────────────────────────────────────────

function StoryRow({
  story,
  onExplore,
}: {
  story: Story;
  onExplore: (story: Story) => void;
}) {
  const catStyle = getCategoryStyle(story.category);
  const uid = useId();

  return (
    <>
      <motion.div
        id={`story-card-${story.slug}`}
        variants={itemVariants}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative rounded-2xl border border-[#2A2A2A] bg-[#111111] overflow-hidden"
        style={{ transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = "rgba(139,92,246,0.35)";
          el.style.boxShadow = "0 0 0 1px rgba(139,92,246,0.12), 0 16px 48px rgba(139,92,246,0.08)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = "#2A2A2A";
          el.style.boxShadow = "none";
        }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left — Images (65%) */}
          <div className="md:w-[65%] flex-shrink-0 flex gap-2 p-3">
            {/* Cover image */}
            <div
              className="relative flex-1 aspect-[16/11] rounded-xl overflow-hidden bg-[#1A1A1A]"
            >
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Supporting images */}
            {story.supportingImages.length > 0 && (
              <div className="flex flex-col gap-2 w-[38%]">
                {story.supportingImages.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className="relative flex-1 rounded-xl overflow-hidden bg-[#1A1A1A] min-h-0"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-500"
                      sizes="15vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — Story Info (35%) */}
          <div className="md:w-[35%] flex flex-col justify-between p-5 md:p-6 md:pl-2">
            <div className="flex flex-col gap-3">
              <CategoryBadge category={story.category} />

              <h3
                className="font-satoshi text-[22px] font-bold leading-snug"
                style={{
                  background: "linear-gradient(135deg, #2dd4bf, #f472b6, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {story.title}
              </h3>

              <p className="text-[14px] text-[#E5E5E5] font-geist leading-[1.7]">
                {story.summary}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mt-1">
                {story.date && (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-geist">
                    <svg viewBox="0 0 200 200" className="w-3.5 h-3.5">
                      <defs>
                        <linearGradient id={`goldDateCard-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="200">
                          <stop offset="0%" stopColor="#FCEABB" />
                          <stop offset="25%" stopColor="#F8B500" />
                          <stop offset="50%" stopColor="#D4A017" />
                          <stop offset="75%" stopColor="#B8860B" />
                          <stop offset="100%" stopColor="#8B6508" />
                        </linearGradient>
                      </defs>
                      <g fill="none" stroke={`url(#goldDateCard-${uid})`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M62 38 v36" /><path d="M84 38 v36" /><path d="M100 38 v36" /><path d="M116 38 v36" /><path d="M138 38 v36" />
                        <rect x="40" y="62" width="120" height="100" rx="8" />
                        <line x1="40" y1="92" x2="160" y2="92" />
                        <rect x="58" y="104" width="20" height="20" rx="4" /><rect x="90" y="104" width="20" height="20" rx="4" /><rect x="122" y="104" width="20" height="20" rx="4" />
                        <rect x="90" y="134" width="20" height="20" rx="4" /><rect x="122" y="134" width="20" height="20" rx="4" />
                        <path d="M61 144 l6 6 l11 -14" />
                      </g>
                    </svg>
                    <span className="text-[#A1A1AA] font-medium">
                      {new Date(story.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                )}
                {story.photoCount && (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-geist">
                    <span className="w-1 h-1 rounded-full bg-[#333]" />
                    <svg viewBox="0 0 200 200" className="w-3.5 h-3.5">
                      <defs>
                        <linearGradient id={`goldPhotoCard-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="200">
                          <stop offset="0%" stopColor="#FCEABB" />
                          <stop offset="25%" stopColor="#F8B500" />
                          <stop offset="50%" stopColor="#D4A017" />
                          <stop offset="75%" stopColor="#B8860B" />
                          <stop offset="100%" stopColor="#8B6508" />
                        </linearGradient>
                      </defs>
                      <g fill="none" stroke={`url(#goldPhotoCard-${uid})`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="100" cy="38" r="10" />
                        <path d="M100 48 L70 80" /><path d="M100 48 L130 80" />
                        <rect x="44" y="80" width="112" height="92" rx="10" />
                        <path d="M64 144 L92 104 L112 130 L132 102 L150 144 Z" />
                        <circle cx="134" cy="106" r="10" />
                      </g>
                    </svg>
                    <span className="text-[#A1A1AA] font-medium">
                      {story.photoCount} photos
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* Explore Button */}
            <button
              onClick={() => onExplore(story)}
              className={`mt-5 inline-flex items-center justify-center gap-2 h-10 px-5 rounded-2xl border text-[13px] font-semibold font-geist transition-all duration-200 ${catStyle.color} ${catStyle.bg} ${catStyle.border} hover:brightness-110 active:scale-[0.98]`}
            >
              Explore Story
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Story Detail Page ────────────────────────────────────────────────────────

function StoryDetail({
  story,
  onBack,
  fromAllStories,
}: {
  story: Story;
  onBack: () => void;
  fromAllStories: boolean;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const uid = useId();

  const galleryImages = story.galleryImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption,
  }));

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={galleryImages}
            startIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Back Button - sticky floating */}
        <div className="sticky top-0 z-10 pt-6 pb-4 bg-[#0A0A0A]/90 backdrop-blur-sm -mx-6 sm:-mx-8 lg:-mx-[100px] px-6 sm:px-8 lg:px-[100px] mb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[14px] text-[#A1A1AA] font-geist hover:text-white transition-colors duration-200"
          >
            <ArrowLeftIcon />
            {fromAllStories ? "Back to All Stories" : "Back to Behind the Coding"}
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-[#1A1A1A] mb-8">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Story Info */}
        <div className="mb-8">
          <CategoryBadge category={story.category} />
          <h1
            className="font-satoshi text-[clamp(32px,4vw,52px)] font-extrabold leading-tight mt-3 mb-3"
            style={{
              background: "linear-gradient(135deg, #2dd4bf, #f472b6, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {story.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2.5 text-[13px] font-geist">
            {story.date && (
              <span className="inline-flex items-center gap-2 h-9 pl-1.5 pr-3.5 rounded-full bg-[#161616] border border-white/10">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A1A1A]">
                  <svg viewBox="0 0 200 200" className="w-5 h-5">
                    <defs>
                      <linearGradient id={`goldDate-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="200">
                        <stop offset="0%" stopColor="#FCEABB" />
                        <stop offset="25%" stopColor="#F8B500" />
                        <stop offset="50%" stopColor="#D4A017" />
                        <stop offset="75%" stopColor="#B8860B" />
                        <stop offset="100%" stopColor="#8B6508" />
                      </linearGradient>
                    </defs>
                    <g fill="none" stroke={`url(#goldDate-${uid})`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M62 38 v36" /><path d="M84 38 v36" /><path d="M100 38 v36" /><path d="M116 38 v36" /><path d="M138 38 v36" />
                      <rect x="40" y="62" width="120" height="100" rx="8" />
                      <line x1="40" y1="92" x2="160" y2="92" />
                      <rect x="58" y="104" width="20" height="20" rx="4" /><rect x="90" y="104" width="20" height="20" rx="4" /><rect x="122" y="104" width="20" height="20" rx="4" />
                      <rect x="90" y="134" width="20" height="20" rx="4" /><rect x="122" y="134" width="20" height="20" rx="4" />
                      <path d="M61 144 l6 6 l11 -14" />
                    </g>
                  </svg>
                </span>
                <span className="text-[#E4E4E7] font-medium">
                  {new Date(story.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </span>
            )}
            {story.location && (
              <span className="inline-flex items-center gap-2 h-9 pl-1.5 pr-3.5 rounded-full bg-[#161616] border border-white/10">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A1A1A]">
                  <svg viewBox="0 0 200 200" className="w-5 h-5">
                    <defs>
                      <linearGradient id={`goldLoc-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="200">
                        <stop offset="0%" stopColor="#FCEABB" />
                        <stop offset="25%" stopColor="#F8B500" />
                        <stop offset="50%" stopColor="#D4A017" />
                        <stop offset="75%" stopColor="#B8860B" />
                        <stop offset="100%" stopColor="#8B6508" />
                      </linearGradient>
                    </defs>
                    <g fill="none" stroke={`url(#goldLoc-${uid})`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M100 38 C73 38 51 60 51 87 C51 118 100 162 100 162 C100 162 149 118 149 87 C149 60 127 38 100 38 Z" />
                      <circle cx="100" cy="87" r="22" />
                      <ellipse cx="100" cy="168" rx="38" ry="8" />
                    </g>
                  </svg>
                </span>
                <span className="text-[#E4E4E7] font-medium">
                  {story.location}
                </span>
              </span>
            )}
            {story.photoCount && (
              <span className="inline-flex items-center gap-2 h-9 pl-1.5 pr-3.5 rounded-full bg-[#161616] border border-white/10">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A1A1A]">
                  <svg viewBox="0 0 200 200" className="w-5 h-5">
                    <defs>
                      <linearGradient id={`goldPhoto-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="200">
                        <stop offset="0%" stopColor="#FCEABB" />
                        <stop offset="25%" stopColor="#F8B500" />
                        <stop offset="50%" stopColor="#D4A017" />
                        <stop offset="75%" stopColor="#B8860B" />
                        <stop offset="100%" stopColor="#8B6508" />
                      </linearGradient>
                    </defs>
                    <g fill="none" stroke={`url(#goldPhoto-${uid})`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="100" cy="38" r="10" />
                      <path d="M100 48 L70 80" /><path d="M100 48 L130 80" />
                      <rect x="44" y="80" width="112" height="92" rx="10" />
                      <path d="M64 144 L92 104 L112 130 L132 102 L150 144 Z" />
                      <circle cx="134" cy="106" r="10" />
                    </g>
                  </svg>
                </span>
                <span className="text-[#E4E4E7] font-medium">
                  {story.photoCount} photos
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2A2A2A] mb-8" />


        {/* Story Body */}
        <div className="mb-12">
          <div
            className="flex flex-col gap-5"
            style={
              bodyExpanded
                ? undefined
                : {
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 8,
                    overflow: "hidden",
                  }
            }
          >
            {story.body.map((para, i) => (
              <p key={i} className="text-[16px] text-[#E5E5E5] font-geist leading-[1.8]">
                {para}
              </p>
            ))}
          </div>

          <button
            onClick={() => setBodyExpanded((v) => !v)}
            aria-label={bodyExpanded ? "Show less" : "Show more"}
            className="mt-3 inline-flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-300"
            style={{
              transform: bodyExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <svg viewBox="0 0 88 88" className="w-5 h-5">
              <circle cx="44" cy="44" r="44" fill="#2C3E5C" stroke="#DC2626" strokeWidth="3" />
              <line x1="14" y1="33" x2="42.5" y2="61.5" stroke="#F472B6" strokeWidth="9" strokeLinecap="round" />
              <line x1="42.5" y1="61.5" x2="77" y2="18" stroke="#A78BFA" strokeWidth="9" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Photo Gallery */}
        {story.galleryImages.length > 0 && (
          <div>
            <div className="flex items-center justify-between gap-2.5 mb-6">
              {/* Left: icon + title + expand arrow (all together) */}
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0">
                  <defs>
                    <linearGradient id={`galleryIconGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="50%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" stroke={`url(#galleryIconGrad-${uid})`} />
                  <circle cx="9" cy="9" r="2" stroke={`url(#galleryIconGrad-${uid})`} />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke={`url(#galleryIconGrad-${uid})`} />
                </svg>
                <h2
                  className="font-satoshi text-[20px] font-bold"
                  style={{
                    background: "linear-gradient(135deg, #2dd4bf, #f472b6, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Photo Gallery
                </h2>

                {story.galleryImages.length > 10 && (
                  <button
                    onClick={() => setGalleryExpanded((v) => !v)}
                    aria-label={galleryExpanded ? "Show fewer photos" : "Show all photos"}
                    className="flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-300 ml-1"
                    style={{
                      transform: galleryExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg viewBox="0 0 88 88" className="w-5 h-5">
                      <circle cx="44" cy="44" r="44" fill="#C7C9D1" stroke="#DC2626" strokeWidth="3" />
                      <line x1="14" y1="33" x2="42.5" y2="61.5" stroke="#F472B6" strokeWidth="9" strokeLinecap="round" />
                      <line x1="42.5" y1="61.5" x2="77" y2="18" stroke="#A78BFA" strokeWidth="9" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div
              className={
                galleryExpanded || story.galleryImages.length <= 10
                  ? "overflow-hidden"
                  : "overflow-hidden max-h-[420px] sm:max-h-[290px] md:max-h-[330px] lg:max-h-[280px]"
              }
              style={{ transition: "max-height 0.5s ease-in-out" }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {story.galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#1A1A1A] cursor-pointer group"
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  {/* Expand overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <button
                    className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                    aria-label="Fullscreen"
                    onClick={() => openLightbox(i)}
                  >
                    <ExpandIcon />
                  </button>
                  {/* Caption */}
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2 pt-6 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[11px] text-white/90 font-geist leading-tight">{img.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

// ─── Behind The Coding Section ────────────────────────────────────────────────

export default function BehindTheCoding() {
  return (
    <Suspense fallback={null}>
      <BehindTheCodingInner />
    </Suspense>
  );
}

function BehindTheCodingInner() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [fromAllStories, setFromAllStories] = useState(false);
  const uid = useId();

  // Restore selected story from URL on load / refresh
  useEffect(() => {
    const slug = searchParams.get("story");
    if (slug) {
      const found = STORIES.find((s) => s.slug === slug);
      if (found) setSelectedStory(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openStory = (s: Story, fromAll: boolean) => {
    setFromAllStories(fromAll);
    setSelectedStory(s);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("story", s.slug);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeStory = () => {
    const slugToScrollTo = selectedStory?.slug ?? null;
    setSelectedStory(null);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("story");
    const query = params.toString();
    router.push(query ? `?${query}` : "?", { scroll: false });
    if (fromAllStories) {
      setShowAll(true);
    }
    // Story card-এ scroll করবে
    if (slugToScrollTo) {
      const delay = fromAllStories ? 500 : 350; // All Stories overlay render হতে বেশি সময় লাগে
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(`story-card-${slugToScrollTo}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, delay);
      });
    }
  };

  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedStory]);

  return (
    <>
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
        <AnimatePresence mode="wait">
          {!selectedStory ? (
            // ── Main List View ──
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
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
                  <StoryRow key={story.id} story={story} onExplore={(s) => openStory(s, false)} />
                ))}

                {STORIES.length > 3 && (
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => setShowAll(true)}
                      className="relative inline-flex items-center gap-1 px-3 py-2.5 rounded-[10px] text-[13px] font-medium font-geist overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, rgba(20,184,166,0.1), rgba(236,72,153,0.08), rgba(139,92,246,0.1))",
                        transition: "background 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(236,72,153,0.15), rgba(139,92,246,0.22))";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
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
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Footer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center text-[14px] text-[#555] font-geist mt-16"
              >
                💜 Collecting memories, one journey at a time.
              </motion.p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
    {showAll && typeof window !== "undefined" && createPortal(
      <AnimatePresence>
        <motion.div
          key="all-stories"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-[#0A0A0A]"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-[100px] pb-24">
            <div className="sticky top-0 z-10 pt-6 pb-4 bg-[#0A0A0A]/90 backdrop-blur-sm -mx-6 sm:-mx-8 lg:-mx-[100px] px-6 sm:px-8 lg:px-[100px] mb-6">
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 text-[14px] text-[#A1A1AA] font-geist hover:text-white transition-colors duration-200"
              >
                <ArrowLeftIcon />
                Back to Behind the Coding
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              {STORIES.map((story) => (
                <StoryRow
                  key={story.id}
                  story={story}
                  onExplore={(s) => {
                    setShowAll(false);
                    openStory(s, true);
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>,
      document.body
    )}
    {selectedStory && typeof window !== "undefined" && createPortal(
      <AnimatePresence>
        <motion.div
          key={`detail-${selectedStory?.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-[#0A0A0A]"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-[100px] pb-24">
            <StoryDetail
              story={selectedStory}
              fromAllStories={fromAllStories}
              onBack={closeStory}
            />
          </div>
        </motion.div>
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}