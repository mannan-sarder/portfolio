// site-data.ts
import type {
  PersonInfo,
  StackCard,
  ContactInfo,
  SocialLink,
  SeoMeta,
} from "@/types";

// ─── Person / Profile (used in Hero & About) ──────────────────────────────

export const PERSON: PersonInfo = {
  name: "MD Mannan Sarder",
  shortName: "Mannan",
  initials: "MS",
  role: "Software Engineer &",
  roleHighlight: "Full Stack Developer",
  tagline:
    "Full-stack engineer who designs the database first, then builds outward — API, business logic, UI.",
  bio: [
    "I'm a full-stack engineer who cares more about what a system does under load than how it looks in a demo. I usually start from the database schema and build outward — API, business logic, UI — so every layer reflects how the pieces will actually be used together.",
    "My two largest projects reflect that approach: RetailSync Hub, a four-role retail platform with transaction-safe checkout, real-time rider tracking over Server-Sent Events, and a 30-table schema migrated from a legacy PHP system; and MediMind, an offline Android app built around a custom OCR parsing engine that reads medical reports and explains them in Bangla and English against a WHO/NIH-sourced dataset.",
    "Outside web and mobile, I've also worked hands-on with applied computer vision — building a YOLOv8-based detection pipeline during an internship at Robo Tech Valley. Right now I'm focused on deepening my system-design skills and shipping software that holds up in production, not just in a demo.",
  ],
  education: "BSc in Computer Science & Engineering",
  location: "Bangladesh",
  status: "Open to Opportunities",
  interest: "Building Products & Solving Problems",
  resumeUrl: "/resume.pdf",
  profileImage: "/images/profile/mannan.jpg",
  currentFocus: [
    "Full Stack Development",
    "System Architecture",
    "Applied AI & Computer Vision",
    "Software Engineering",
    "Continuous Learning",
  ],
};

// ─── SEO ────────────────────────────────────────────────────────────────────

export const SEO: SeoMeta = {
  title: "MD Mannan Sarder — Software Engineer & Full Stack Developer",
  description:
    "Software Engineer & Full Stack Developer based in Bangladesh. Building modern web applications and turning ideas into useful digital products.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "Bangladesh",
    "Web Developer",
    "Portfolio",
    "MD Mannan Sarder",
  ],
  ogImage: "/og-image.webp",
  siteUrl: "https://mannansarder.vercel.app",
};

// ─── Social Links ───────────────────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/mannan-sarder/",
    icon: "github",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/mannansarder/",
    icon: "linkedin",
  },
  {
    platform: "email",
    label: "Email",
    href: "mailto:mannansarder00@gmail.com",
    icon: "mail",
  },
];

// ─── Tech Stack ─────────────────────────────────────────────────────────────
// Kept in sync with what's actually shipped in RetailSync Hub and MediMind,
// not just a generic list — every entry here is a technology exercised end
// to end in a real, working project.

export const STACK_CARDS: StackCard[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "monitor",
    items: [
      { name: "HTML5", icon: "/icons/html5.svg" },
      { name: "CSS3", icon: "/icons/css3.svg" },
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    items: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "PHP", icon: "/icons/php.svg" },
    ],
    secondary: {
      label: "Also familiar with",
      items: [
        { name: "MongoDB", icon: "/icons/mongodb.svg" },
      ],
    },
  },
  {
    id: "languages",
    title: "Languages",
    icon: "code2",
    items: [
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Java", icon: "/icons/java.svg" },
      { name: "C", icon: "/icons/c.svg" },
      { name: "C++", icon: "/icons/cpp.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "PHP", icon: "/icons/php.svg" },
      { name: "SQL", icon: "/icons/sql.svg" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    items: [
      { name: "Git", icon: "/icons/git.svg" },
      { name: "GitHub", icon: "/icons/github.svg" },
      { name: "VS Code", icon: "/icons/vscode.svg" },
      { name: "Android Studio", icon: "/icons/androidstudio.svg" },
      { name: "XAMPP", icon: "/icons/xampp.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
    ],
  },
];

// ─── Contact Info ───────────────────────────────────────────────────────────

export const CONTACT_INFO: ContactInfo = {
  location: "Bangladesh",
  city: "Dhaka",
  timezone: "Asia/Dhaka",
  gmtOffset: "GMT +6",
  email: "mailto:mannansarder00@gmail.com",
  linkedin: "https://linkedin.com/in/mannansarder",
  github: "https://github.com/mannan-sarder",
  whatsapp: "https://wa.me/@mannansarder",
  telegram: "https://t.me/mannan_sarder",
  isAvailable: true,
};
