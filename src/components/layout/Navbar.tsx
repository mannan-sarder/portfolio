"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// ─── Constants (module-level — never recreated) ──────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Behind The Coding", href: "#behind-the-coding" },
  { label: "Contact", href: "#contact" },
] as const;

type NavHref = (typeof NAV_LINKS)[number]["href"];

// Derived once at module load — never re-created per render
const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

function isNavHref(hash: string): hash is NavHref {
  return NAV_LINKS.some((l) => l.href === hash);
}

// ─── MS Monogram SVG ─────────────────────────────────────────────────────────
// Overlapping M + S mark with blue→purple gradient — matches the approved logo
function MSLogo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="select-none"
    >
      <defs>
        <linearGradient id="ms-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f0f1a" />
          <stop offset="100%" stopColor="#1a1030" />
        </linearGradient>
        <linearGradient id="ms-m" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="ms-s" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="ms-line" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Background rounded rect */}
      <rect width="48" height="40" rx="10" fill="url(#ms-bg)" /> 
      {/* Subtle inner border */}
      {/* <rect x="1" y="1" width="46" height="46" rx="9.5" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.08" /> */}
      {/* M — blue, behind */}
      <text
        x="23"
        y="30"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="26"
        fill="url(#ms-m)"
      >M</text>
      {/* S — purple, on top, overlapping 30% */}
      <text
        x="35"
        y="33"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="26"
        fill="url(#ms-s)"
      >S</text>
      {/* Underline accent */}
      <rect x="8" y="37" width="32" height="2" rx="1" fill="url(#ms-line)" opacity="0.85" />
    </svg>
  );
}

// ─── Download icon ────────────────────────────────────────────────────────────
function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-80 flex-shrink-0"
    >
      <path
        d="M7.5 1v9m0 0L4.5 7m3 3 3-3M2 13h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavHref>("#home");
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // ── IntersectionObserver-based active section detection (homepage only —
  //    the section elements this observes don't exist on other routes) ──────
  useEffect(() => {
    if (!isHome) return;

    // Seed immediately from the URL hash so the dot reflects where we just
    // arrived (e.g. cross-page nav to "/#contact") instead of showing
    // whatever was active before this navigation, while observers spin up.
    const hash = window.location.hash;
    setActiveSection(isNavHref(hash) ? hash : "#home");

    const observers: IntersectionObserver[] = [];
    const visibleMap = new Map<string, number>(); // id → top offset
    const attached = new Set<string>();
    let cancelled = false;

    const attach = (id: string, el: Element) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleMap.set(id, entry.boundingClientRect.top);
          } else {
            visibleMap.delete(id);
          }

          if (visibleMap.size > 0) {
            // Pick the section closest to the top of the viewport
            const topId = [...visibleMap.entries()].reduce((a, b) =>
              Math.abs(a[1]) < Math.abs(b[1]) ? a : b
            )[0];
            setActiveSection(`#${topId}` as NavHref);
            // Live scrollspy: keep the URL matching whatever's actually in
            // view, on every scroll — not just clicks — so manual scrolling
            // (which never went through handleNavClick) can't leave it stale.
            window.history.replaceState(null, "", `#${topId}`);
          }
        },
        { rootMargin: "-80px 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
      attached.add(id);
    };

    // Try attaching to whatever section elements already exist; returns
    // true once every section has an observer.
    const tryAttachMissing = () => {
      SECTION_IDS.forEach((id) => {
        if (attached.has(id)) return;
        const el = document.getElementById(id);
        if (el) attach(id, el);
      });
      return attached.size === SECTION_IDS.length;
    };

    // Pass 1 — synchronous. Covers the normal case (sections already mounted:
    // fresh load on "/", or scrolling while already home).
    const allFoundSync = tryAttachMissing();

    let rafId: number | null = null;
    let mutationObserver: MutationObserver | null = null;

    if (!allFoundSync) {
      // Pass 2 — one frame later. Covers the common case right after a
      // cross-page → home transition, where the new route's sections commit
      // to the DOM a tick after `isHome` flips.
      rafId = requestAnimationFrame(() => {
        if (cancelled) return;
        const allFoundRaf = tryAttachMissing();

        // Pass 3 — fallback for anything still missing after that one frame
        // (slower RSC streaming than a single tick accounts for). Watches
        // the DOM and attaches as soon as each section actually appears,
        // then disconnects itself — no arbitrary delay to tune.
        if (!allFoundRaf) {
          mutationObserver = new MutationObserver(() => {
            if (tryAttachMissing()) mutationObserver?.disconnect();
          });
          mutationObserver.observe(document.body, { childList: true, subtree: true });
        }
      });
    }

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      mutationObserver?.disconnect();
      observers.forEach((o) => o.disconnect());
    };
  }, [isHome]);

  // ── Scroll → header background ───────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close drawer on outside click ────────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // ── Lock body scroll while drawer open ───────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Close drawer on resize to desktop ────────────────────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Smooth scroll nav click (homepage only — elsewhere, Link just navigates
  //    to "/" + hash and the homepage's own hash-scroll effect takes over) ───
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setMenuOpen(false);
      if (!isHome) return;
      e.preventDefault();
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      // preventDefault above cancels Link's own URL update too — keep the
      // address bar in sync (replace, not push: scrolling between sections
      // shouldn't spam browser history), and reflect the pick immediately
      // rather than waiting for the observer to catch up mid-scroll.
      window.history.replaceState(null, "", href);
      if (isNavHref(href)) setActiveSection(href);
    },
    [isHome]
  );

  // ── Route-aware link target + active-state (elsewhere, point back at "/"
  //    and highlight by which page-family we're currently on) ───────────────
  const linkHref = useCallback(
    (href: NavHref) => (isHome ? href : `/${href}`),
    [isHome]
  );

  const isActive = useCallback(
    (href: NavHref) => {
      if (isHome) return activeSection === href;
      if (pathname.startsWith("/projects")) return href === "#projects";
      if (pathname.startsWith("/stories")) return href === "#behind-the-coding";
      return false;
    },
    [isHome, pathname, activeSection]
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <header
        role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300",
          scrolled
            ? "bg-[rgba(10,10,10,0.90)] backdrop-blur-[12px] border-b border-[#2A2A2A]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">

          {/* Logo — MS monogram SVG */}
          <Link
            href={isHome ? "#home" : "/"}
            onClick={(e) => handleNavClick(e, "#home")}
            aria-label="MD Mannan Sarder — home"
            className="flex-shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
          >
            <MSLogo />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={linkHref(href)}
                  onClick={(e) => handleNavClick(e, href)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "font-inter relative rounded-lg px-4 py-2 text-[15px] font-medium",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]",
                    active ? "text-white" : "text-[#E5E7EB] hover:text-white",
                  ].join(" ")}
                >
                  {label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#8B5CF6]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume (opens in new tab)"
              className={[
                "font-inter flex items-center gap-2 rounded-xl border border-[#2A2A2A]",
                "px-4 py-2 text-[15px] font-medium text-[#E5E7EB]",
                "transition-all duration-200",
                "hover:-translate-y-px hover:border-[#8B5CF6] hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]",
              ].join(" ")}
            >
              <DownloadIcon />
              Get Resume
            </Link>
          </div>

          {/* Hamburger — mobile only */}
          <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={[
              "md:hidden flex flex-col items-center justify-center gap-[5px]",
              "h-10 w-10 rounded-lg border border-[#2A2A2A]",
              "transition-colors duration-200 hover:border-[#8B5CF6]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]",
            ].join(" ")}
          >
            <span className={["block h-[1.5px] w-[18px] rounded-full bg-[#E5E7EB] transition-all duration-300 origin-center", menuOpen ? "rotate-45 translate-y-[6.5px]" : ""].join(" ")} />
            <span className={["block h-[1.5px] w-[18px] rounded-full bg-[#E5E7EB] transition-all duration-300",               menuOpen ? "opacity-0 scale-x-0" : ""].join(" ")} />
            <span className={["block h-[1.5px] w-[18px] rounded-full bg-[#E5E7EB] transition-all duration-300 origin-center", menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""].join(" ")} />
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ──────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={[
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed bottom-0 right-0 top-0 z-50 w-[280px]",
          "flex flex-col border-l border-[#2A2A2A] bg-[#0A0A0A]",
          "px-6 pb-8 pt-20 transition-transform duration-300 ease-in-out md:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <nav aria-label="Mobile navigation" className="mt-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={linkHref(href)}
                onClick={(e) => handleNavClick(e, href)}
                aria-current={active ? "page" : undefined}
                className={[
                  "font-inter flex items-center gap-3 rounded-xl border px-4 py-3",
                  "text-[16px] font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]",
                  active
                    ? "border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-white"
                    : "border-transparent text-[#A1A1AA] hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {active && (
                  <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B5CF6]" />
                )}
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-[#2A2A2A] pt-6">
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className={[
              "font-inter flex w-full items-center justify-center gap-2",
              "rounded-xl border border-[#2A2A2A] px-4 py-3",
              "text-[15px] font-medium text-[#E5E7EB]",
              "transition-all duration-200 hover:border-[#8B5CF6] hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]",
            ].join(" ")}
          >
            <DownloadIcon />
            Get Resume
          </Link>
        </div>
      </div>
    </>
  );
}