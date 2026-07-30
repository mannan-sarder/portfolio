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

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getAllExperience(): ExperienceItem[] {
  return EXPERIENCE_ITEMS;
}

export function getExperienceById(id: string): ExperienceItem | undefined {
  return EXPERIENCE_ITEMS.find((e) => e.id === id);
}

export function getExperienceByType(type: ExperienceItem["type"]): ExperienceItem[] {
  return EXPERIENCE_ITEMS.filter((e) => e.type === type);
}

export type { ExperienceItem } from "@/types";
