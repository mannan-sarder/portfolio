import type { Project } from "@/types";
import { retailSyncHub } from "./retailsync-hub";
import { medimind } from "./medimind";

// ─── Registry ───────────────────────────────────────────────────────────────
// Add a new project by creating `src/data/projects/<slug>.ts` (copy an
// existing file as a template) and adding it to this array.

export const PROJECTS: Project[] = [
  // ── Web ──
  retailSyncHub,
  // ── Mobile ──
  medimind,
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

export function getProjectsByType(type: Project["type"]): Project[] {
  return PROJECTS.filter((p) => p.type === type);
}

export type { Project } from "@/types";
