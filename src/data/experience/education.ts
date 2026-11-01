import type { ExperienceItem } from "@/types";
import { PERSON } from "@/data/portfolio";

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
    "Focused on full-stack web development, Android application development, and applied AI and computer vision.",
    "Capstone Project: MediMind — an offline Android medical report analyzer powered by on-device OCR.",
    "Industrial Project (IDP-2): RetailSync Hub — a four-role retail and e-commerce platform with real-time GPS rider tracking, an in-store POS terminal, and a custom MySQL-to-PostgreSQL migration script.",
  ],
};

export default education;
