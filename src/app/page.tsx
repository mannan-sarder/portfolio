import type { Metadata } from "next";
import { SEO } from "@/data/portfolio";

// ─── Section Components ───────────────────────────────────────────────────────
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";               // ← uncomment when built
import Projects from "@/components/sections/Projects";         // ← uncomment when built
import BehindTheCoding from "@/components/sections/BehindTheCoding"; // ← uncomment when built
import Contact from "@/components/sections/Contact";           // ← uncomment when built

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-bg-main overflow-x-hidden">

      <Hero />

      <About />

      <Stack />

      <Projects />

      <BehindTheCoding />

      <Contact />
    </main>
  );
}
