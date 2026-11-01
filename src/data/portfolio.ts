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
  roleHighlight: "Full-Stack Developer",
  tagline:
    "Full-stack engineer who designs the database first, then builds outward — API, business logic, UI.",
  bio: [
    "I'm a software engineer who cares more about how a system behaves under real use than how it looks in a demo. I start from the data model and build outward — APIs, business logic, then interface — so every layer reflects how the pieces are actually used together.",
    "Two projects show this approach. RetailSync Hub is a four-role retail and e-commerce platform with transaction-safe workflows, real-time rider tracking through Server-Sent Events (SSE), and a 30+ table database architecture migrated from a legacy PHP system to PostgreSQL. MediMind is an offline Android application with a custom on-device OCR engine that analyzes medical reports and presents bilingual results in Bangla and English, using a WHO/NIH-sourced dataset.",
    "I also have practical experience in applied AI and computer vision. During my internship at Robo Tech Valley, I worked on a YOLOv8-based fruit freshness detection system, including model training, dataset processing, real-time inference, and object tracking. I'm continuing to deepen my knowledge of system design, software architecture, and scalable application development, with a focus on software that performs reliably beyond the development environment.",
  ],
  education: "BSc in Computer Science & Engineering",
  location: "Bangladesh",
  status: "Open to Opportunities",
  interest: "Building Products & Solving Problems",
  resumeUrl: "/resume.pdf",
  profileImage: "/images/profile/mannan.webp",
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
    "Software Engineer & Full-Stack Developer specializing in web platforms, Android solutions, and applied AI systems — building robust software from database to UI.",
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
    title: "Frontend Architecture",
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
    title: "Backend & Databases",
    icon: "server",
    items: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "PHP", icon: "/icons/php.svg" },
    ],
    secondary: {
      label: "Also Familiar With",
      items: [
        { name: "MongoDB", icon: "/icons/mongodb.svg" },
      ],
    },
  },
  {
    id: "languages",
    title: "Core Programming Languages",
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
    title: "Development & DevOps Tools",
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
