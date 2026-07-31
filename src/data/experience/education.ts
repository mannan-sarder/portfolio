import type { ExperienceItem } from "@/types";
import { PERSON } from "@/data/portfolio";

// Institution/dates are placeholders — degree name is real (PERSON.education).
export const education: ExperienceItem = {
  id: "bsc-cse-education",
  type: "education",
  featured: true,
  role: PERSON.education,
  organization: "Green University of Bangladesh",
  period: "2022 – 2026",
  location:
    "Purbachal American City, Kanchan, Rupganj, Narayanganj, Dhaka, Bangladesh",
  image: "/images/experience/gub logo.webp",
  points: [
    "Focused on full-stack web development, Android application development, and applied AI/Computer Vision",
    "Capstone project: MediMind — a fully offline Android medical report analyzer using on-device OCR.",
    "Industrial project (IDP-2): RetailSync Hub — a 4-role integrated retail & e-commerce platform with real-time GPS rider tracking, an in-store POS terminal, and a custom MySQL → PostgreSQL migration script",
  ],
};

export default education;
