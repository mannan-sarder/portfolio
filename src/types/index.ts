// ─── Navigation ────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// ─── Social Links ───────────────────────────────────────────────────────────────

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "email"
  | "whatsapp"
  | "telegram";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  icon: string;
}

// ─── Tech Stack ─────────────────────────────────────────────────────────────────

export type StackCategory = "frontend" | "backend" | "languages" | "tools";

export interface TechItem {
  name: string;
  icon: string;
  color?: string;
}

export interface StackCard {
  id: StackCategory;
  title: string;
  icon: string;
  items: TechItem[];
  secondary?: {
    label: string;
    items: TechItem[];
  };
}

// ─── Stories (Behind the Coding) ───────────────────────────────────────────────

export type StoryCategory =
  | "Travel"
  | "Farming"
  | "Food"
  | "Nature"
  | "Photography"
  | "Life Moments";

export interface GalleryImage {
  src: string;
  caption?: string;
  alt: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  category: StoryCategory;
  summary: string;
  body: string[];
  date: string;
  location?: string;
  coverImage: string;
  supportingImages: GalleryImage[];
  galleryImages: GalleryImage[];
  photoCount: number;
}

// ─── Contact ────────────────────────────────────────────────────────────────────

export interface ContactInfo {
  location: string;
  city: string;
  timezone: string;
  gmtOffset: string;
  email: string;
  linkedin: string;
  github: string;
  whatsapp: string;
  telegram: string;
  isAvailable: boolean;
}

// ─── SEO ────────────────────────────────────────────────────────────────────────

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  siteUrl: string;
}

// ─── Owner / Profile ────────────────────────────────────────────────────────────

export interface PersonInfo {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  roleHighlight: string;
  tagline: string;
  bio: string[];
  education: string;
  location: string;
  status: string;
  interest: string;
  resumeUrl: string;
  profileImage: string;
  currentFocus: string[];
}