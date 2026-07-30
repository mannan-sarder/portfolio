import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/data/projects";
import ProjectsListing from "./ProjectsListing";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web and mobile applications built by MD Mannan Sarder to solve real-world problems — browse the full project list.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | MD Mannan Sarder",
    description: "Web and mobile applications built to solve real-world problems.",
    url: "/projects",
    type: "website",
  },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const initialType = type === "web" || type === "mobile" ? type : "all";
  const projects = getAllProjects();

  return (
    <main className="relative min-h-screen bg-bg-main overflow-x-hidden pt-[120px] pb-24">
      {/* Ambient glows — same treatment as the homepage section */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-blue-700/5 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-700/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 mb-8 text-[14px] text-[#A1A1AA] font-geist hover:text-white transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <ProjectsListing projects={projects} initialType={initialType} />
      </div>
    </main>
  );
}
