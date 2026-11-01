import type { Metadata } from "next";
import { SEO } from "@/data/portfolio";

// ─── Section Components ───────────────────────────────────────────────────────
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";               // ← uncomment when built
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";         // ← uncomment when built
import BehindTheCoding from "@/components/sections/BehindTheCoding"; // ← uncomment when built
import Contact from "@/components/sections/Contact";           // ← uncomment when built
import NeuralAurora from "@/components/sections/NeuralAurora";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  alternates: { canonical: "/" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* One fixed neural-network layer behind every section */}
      <NeuralAurora />

      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Hero />

        <About />

        <Stack />

        <Experience />

        <Projects />

        <BehindTheCoding />

        <Contact />
      </main>
    </>
  );
}
