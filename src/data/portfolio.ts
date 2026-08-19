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
    "I build modern web applications and enjoy turning ideas into useful digital products.",
  bio: [
    "I'm a Software Engineer who loves turning ideas into real-world digital products. I enjoy building clean, scalable and user-friendly web applications.",
    "I'm passionate about problem solving, continuous learning and creating solutions that make an impact.",
    "Currently, I'm focused on full stack development and exploring modern technologies.",
  ],
  education: "BSc in Computer Science & Engineering",
  location: "Bangladesh",
  status: "Open to Opportunities",
  interest: "Building Products & Solving Problems",
  resumeUrl: "/resume.pdf",
  profileImage: "/images/profile/mannan.jpg",
  currentFocus: [
    "Web Development",
    "Full Stack Development",
    "Software Engineering",
    "UI/UX Design",
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
      { name: "PHP", icon: "/icons/php.svg" },
      { name: "MySQL", icon: "/icons/mysql.svg" },
    ],
    secondary: {
      label: "Also familiar with",
      items: [
        { name: "MongoDB", icon: "/icons/mongodb.svg" },
        { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
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