import type { ExperienceItem } from "@/types";
import { roboTechValley } from "./robo-tech-valley";
import { education } from "./education";
// ─── Registry ───────────────────────────────────────────────────────────────
// Add a new entry by creating `src/data/experience/<name>.ts` (copy an
// existing file as a template) and adding it to this array — most recent
// first, same convention as a resume.

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  roboTechValley,
  education,
];

// ─── Featured (Homepage Preview) ────────────────────────────────────────────
// Only items with `featured: true` appear in the homepage Experience section.
// Mark exactly 2 entries as featured — one per "spotlight" card shown before
// the "View All" button.

export const FEATURED_EXPERIENCE_ITEMS: ExperienceItem[] =
  EXPERIENCE_ITEMS.filter((e) => e.featured);

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getAllExperience(): ExperienceItem[] {
  return EXPERIENCE_ITEMS;
}

export function getExperienceById(id: string): ExperienceItem | undefined {
  return EXPERIENCE_ITEMS.find((e) => e.id === id);
}

export function getExperienceByType(
  type: ExperienceItem["type"]
): ExperienceItem[] {
  return EXPERIENCE_ITEMS.filter((e) => e.type === type);
}

export type { ExperienceItem } from "@/types";
