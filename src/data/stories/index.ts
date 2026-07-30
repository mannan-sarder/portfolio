import type { Story } from "@/types";
import { sylhetTravelDiaries } from "./sylhet-travel-diaries";

// ─── Registry ───────────────────────────────────────────────────────────────
// Add a new story by creating `src/data/stories/<slug>.ts` (copy an existing
// file as a template) and adding it to this array.

export const STORIES: Story[] = [
  sylhetTravelDiaries,
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getAllStories(): Story[] {
  return STORIES;
}

export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}

export function getAllStorySlugs(): string[] {
  return STORIES.map((s) => s.slug);
}

export type { Story } from "@/types";
