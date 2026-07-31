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

// ─── Experience ─────────────────────────────────────────────────────────────────

export type ExperienceType = "work" | "education";
export type WorkMode = "On-site" | "Remote" | "Hybrid";

export interface ExperienceItem {
  id: string;
  type: ExperienceType;
  /** Set to true to show this entry in the homepage preview (max 2 shown). */
  featured?: boolean;
  role: string;
  organization: string;
  employmentType?: string; // e.g. "Internship", "Full-time"
  period: string;          // e.g. "Feb 2026 – Apr 2026"
  duration?: string;       // e.g. "3 mos"
  location?: string;       // e.g. "Dhaka, Bangladesh"
  workMode?: WorkMode;
  image?: string;          // optional company / institution logo (timeline icon)
  images?: string[];       // optional gallery of supporting images (certificates, letters, etc.)
  points: string[];
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

// ─── Projects ───────────────────────────────────────────────────────────────────

export type ProjectType = "web" | "mobile";

export interface TechBadgeItem {
  name: string;
  category?: "frontend" | "backend" | "database" | "tools";
}

export interface ProjectFeature {
  text: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  type: ProjectType;
  subtitle?: string;
  description: string;
  shortDescription: string;
  features: ProjectFeature[];
  techStack: TechBadgeItem[];
  coverImage: string;
  mockupImage?: string;
  screenshots?: ProjectImage[];
  liveUrl?: string;
  liveUrlLabel?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  myRole?: string;
  duration?: string;
  problem?: string[];
  solution?: string[];
  challenges?: string[];
  lessonsLearned?: string[];
  // Web only
  results?: string[];
  // Mobile only
  userFlow?: string[];
  appArchitecture?: string[];
  futureImprovements?: string[];
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
