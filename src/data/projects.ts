// ─── Types ────────────────────────────────────────────────────────────────────

export type ProjectType = "web" | "mobile";

export interface TechBadge {
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
  techStack: TechBadge[];
  coverImage: string;
  mockupImage?: string;
  screenshots?: ProjectImage[];
  liveUrl?: string;
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

// ─── Data ─────────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  // ── Web Projects ──────────────────────────────────────────────────────────

  {
    id: "retailsync-hub",
    title: "RetailSync Hub",
    slug: "retailsync-hub",
    type: "web",
    subtitle: "Integrated Retail & E-commerce Platform",
    description:
      "A production-grade full-stack retail platform built with Next.js 15 and PostgreSQL, supporting four distinct roles — Admin, Employee, Delivery, and Customer — each with their own portal and permission set. Features include real-time rider tracking via Server-Sent Events, an in-store POS terminal, dynamic analytics dashboard, coupon system, order lifecycle management, and a custom MySQL → PostgreSQL migration pipeline ported from a legacy PHP system.",
    shortDescription:
      "4-role retail & e-commerce platform with real-time rider tracking, POS terminal, and dynamic analytics.",
    features: [
      { text: "4-role system: Admin, Employee, Delivery, Customer — each with a dedicated portal" },
      { text: "Dual-session NextAuth architecture — staff and customer sessions coexist without conflict" },
      { text: "Real-time rider tracking via Server-Sent Events (SSE) and Leaflet maps with live GPS markers" },
      { text: "Haversine formula for on-the-fly delivery distance calculation" },
      { text: "In-store POS terminal with coupon validation and multi-method payment (cash, card, bKash, Nagad)" },
      { text: "Automatic cash memo generation per POS sale" },
      { text: "Dynamic analytics dashboard with auto-switching hourly/daily revenue buckets by date range" },
      { text: "Top-selling products and top-performing rider rankings" },
      { text: "Order lifecycle management: pending → picked → out for delivery → delivered" },
      { text: "Customer-side live location sharing for active orders" },
      { text: "Inventory tracking with low-stock alerts" },
      { text: "Product CRUD with variants (size, color), multiple images, and category management" },
      { text: "Review and rating system with admin moderation (approve/reject)" },
      { text: "Cancel and return request handling" },
      { text: "Audit log tracking every insert, update, and delete per staff user" },
      { text: "Login attempt tracking for brute-force protection" },
      { text: "Employee management with soft-delete, trash, and restore" },
      { text: "Attendance check-in/check-out for staff" },
      { text: "Site-wide settings panel for admin" },
      { text: "Middleware-level route protection by role" },
    ],
    techStack: [
      { name: "Next.js 15", category: "frontend" },
      { name: "React 19", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Node.js", category: "backend" },
      { name: "Prisma ORM", category: "backend" },
      { name: "NextAuth v5", category: "backend" },
      { name: "Zod", category: "backend" },
      { name: "PostgreSQL", category: "database" },
      { name: "Server-Sent Events", category: "tools" },
      { name: "Leaflet", category: "tools" },
    ],
    coverImage: "/images/project/retailSync hub/cover2.webp",
    mockupImage: "/images/project/retailSync hub/customer dashboard.webp",
    screenshots: [
  { src: "/images/project/retailSync hub/cover.webp", alt: "RetailSync Hub landing page", caption: "RetailSync Hub landing page featuring product categories and deals" },
  { src: "/images/project/retailSync hub/customer dashboard.webp", alt: "Customer dashboard", caption: "Customer dashboard with order summary and live location tracking" },
  { src: "/images/project/retailSync hub/customer login.webp", alt: "Authentication screens", caption: "Login and registration interface for new and existing users" },
  { src: "/images/project/retailSync hub/customer orders.webp", alt: "Order status details", caption: "Detailed view of order status, delivery progress, and rider info" },
  { src: "/images/project/retailSync hub/customer profile.webp", alt: "Customer profile", caption: "Customer account and personal information management page" },
  { src: "/images/project/retailSync hub/delivery orders.webp", alt: "Delivery management", caption: "Delivery dashboard interface for tracking active orders" },
  { src: "/images/project/retailSync hub/delivery.webp", alt: "Live rider map", caption: "Map-based interface for monitoring delivery riders and locations" },
  { src: "/images/project/retailSync hub/employee dashboard.webp", alt: "Employee dashboard", caption: "Employee dashboard with business analytics and live tracking" },
  { src: "/images/project/retailSync hub/employee profile.webp", alt: "Employee profile", caption: "Profile settings and account details for employees" },
  { src: "/images/project/retailSync hub/employee.webp", alt: "Staff management", caption: "Staff management panel for managing roles and permissions" },
  { src: "/images/project/retailSync hub/orders.webp", alt: "Order management", caption: "Order tracking and management system for operations" },
  { src: "/images/project/retailSync hub/pos.webp", alt: "POS system", caption: "Point of Sale terminal for billing and product management" },
  { src: "/images/project/retailSync hub/product.webp", alt: "Product inventory", caption: "Inventory management interface for tracking stock and pricing" },
  { src: "/images/project/retailSync hub/rider dashboard.webp", alt: "Rider dashboard", caption: "Dashboard for riders to view delivery tasks and locations" },
  { src: "/images/project/retailSync hub/user.webp", alt: "User management", caption: "User management panel for controlling customer accounts" }
],
    githubUrl: "https://github.com/mannan-sarder/retailsync-hub",
    myRole: "Full-Stack Developer",
    duration: "3 months",
    problem: [
      "A local retail shop was running on a legacy PHP/MySQL system with no real-time visibility into stock levels, sales performance, or delivery status.",
      "Staff, delivery riders, and customers had no dedicated portals — everything was managed from a single admin panel with no role separation.",
      "Migrating years of existing data from the old MySQL system without downtime or data loss was a major concern.",
    ],
    solution: [
      "Rebuilt the entire system from scratch using Next.js 15 and PostgreSQL with Prisma ORM, introducing four dedicated role-based portals (Admin, Employee, Delivery, Customer) each with its own authentication session and permission set.",
      "Implemented real-time rider tracking using Server-Sent Events so admins can see delivery riders on a live map, and customers can optionally share their own location for the rider to find them.",
      "Wrote a custom MySQL → PostgreSQL migration script that ported all 30+ tables from the legacy system, preserved foreign key relationships, and reset auto-increment sequences — making the cutover seamless.",
    ],
    challenges: [
      "Running staff and customer NextAuth sessions in the same browser required a dual-session architecture with separate cookies and separate NextAuth configurations to avoid session conflicts.",
      "Server-Sent Events needed a shared in-memory EventEmitter on the server to broadcast rider online/offline status to all connected admin clients simultaneously.",
      "The analytics chart needed to auto-detect whether to render hourly or daily buckets based on the selected date range, requiring dynamic aggregation logic on the backend.",
      "XSS protection in the Leaflet map was critical since user-generated content (names, profile images) was being rendered in custom HTML map markers.",
    ],
    lessonsLearned: [
      "Middleware-level route protection is far more maintainable than per-page auth checks when dealing with multiple roles.",
      "SSE is a simpler and more predictable alternative to WebSockets for one-directional server-to-client push like live tracking updates.",
      "Legacy data migration is as much about understanding the old schema as it is about writing the migration script — foreign key order and sequence resets matter.",
      "Zod validation on every API input catches a surprising number of edge cases that would otherwise silently fail or corrupt data.",
    ],
    results: [
      "Replaced a fragmented PHP system with a unified platform covering storefront, staff operations, delivery, and analytics in one codebase.",
      "Staff can now assign delivery riders and track them live on a map without any third-party service.",
      "The POS terminal allows in-store sales to flow through the same order pipeline as online orders, giving a unified sales view.",
    ],
  },

  /*
{
  id: "",
  title: "",
  slug: "",
  type: "web",
  subtitle: "",
  description: "",
  shortDescription: "",
  features: [
    { text: "" },
    { text: "" },
    { text: "" },
  ],
  techStack: [
    { name: "", category: "" },
    { name: "", category: "" },
    { name: "", category: "" },
    { name: "", category: "" },
    { name: "", category: "" },
  ],
  coverImage: "",
  mockupImage: "",
  screenshots: [
    { src: "", alt: "", caption: "" },
    { src: "", alt: "", caption: "" },
    { src: "", alt: "", caption: "" },
  ],
  liveUrl: "",
  githubUrl: "",
  myRole: "",
  duration: "",
  problem: [
    "",
    "",
  ],
  solution: [
    "",
    "",
  ],
  challenges: [
    "",
    "",
  ],
  lessonsLearned: [
    "",
    "",
  ],
  results: [
    "",
    "",
  ],
},
*/

  // ── Mobile Projects ───────────────────────────────────────────────────────

  {
    id: "medimind",
    title: "MediMind",
    slug: "medimind",
    type: "mobile",
    subtitle: "Smart Medical Report Reader & Health Assistant",
    description:
      "A fully offline Android app that scans medical test reports using OCR, extracts patient data and test values, compares them against a WHO/NIH-sourced standard range dataset, and presents results in both Bangla and English. Users can compare two reports side by side with trend charts, track history, and set medicine reminders.",
    shortDescription:
      "Offline medical report scanner with OCR analysis, bilingual results, and report comparison.",
    features: [
      { text: "Scan reports via camera or upload from gallery" },
      { text: "Fully offline OCR-based data extraction using Google ML Kit" },
      { text: "Rule-based comparison against WHO/NIH standard medical ranges" },
      { text: "Bilingual results in Bangla and English with in-app language toggle" },
      { text: "Per-test detail: status badge (Normal/Low/High), reference range, explanation, and questions for doctor" },
      { text: "Automatic patient info extraction (name, gender, age) from report text" },
      { text: "Smart report type inference: CBC, Lipid Profile, LFT, KFT, Thyroid, Blood Sugar" },
      { text: "Abnormal findings summary section at the bottom of results" },
      { text: "Compare two reports side by side with percentage change indicators" },
      { text: "Bar chart visualization of value differences between reports" },
      { text: "Rule-based trend analysis showing improved, worsened, and notable changes" },
      { text: "Paginated report history" },
      { text: "Medicine reminder system with scheduled notifications" },
      { text: "User profile management (name, gender, age, contact)" },
      { text: "Dark mode and theme settings (light/dark/system)" },
    ],
    techStack: [
      { name: "Java", category: "frontend" },
      { name: "Android SDK", category: "frontend" },
      { name: "Google ML Kit", category: "tools" },
      { name: "Room Database", category: "backend" },
      { name: "SQLite", category: "backend" },
      { name: "MPAndroidChart", category: "tools" },
      { name: "ViewModel / LiveData", category: "tools" },
      { name: "AlarmManager", category: "tools" },
      { name: "Gson", category: "tools" },
    ],
    coverImage: "/images/project/medimind/Cover page.webp",
    mockupImage: "/images/project/medimind/Dark home analyze history.webp",
    screenshots: [
      { src: "/images/project/medimind/Login page.webp", alt: "Login page", caption: "User login" },
      { src: "/images/project/medimind/SignUp page.webp", alt: "Sign up page", caption: "Create new account" },
      { src: "/images/project/medimind/Dashboard page.webp", alt: "Home dashboard", caption: "Welcome dashboard" },
      { src: "/images/project/medimind/3 dot menu.webp", alt: "Navigation menu", caption: "Profile & settings menu" },
      { src: "/images/project/medimind/Analyze page.webp", alt: "Analyze report upload", caption: "Upload test report" },
      { src: "/images/project/medimind/Result page 1.webp", alt: "Report result summary", caption: "AI-generated summary" },
      { src: "/images/project/medimind/Result page 2.webp", alt: "Report result details", caption: "Detailed test breakdown" },
      { src: "/images/project/medimind/Result page 3.webp", alt: "Report abnormal findings", caption: "Abnormal findings alert" },
      { src: "/images/project/medimind/History page.webp", alt: "Report history list", caption: "Previous reports" },
      { src: "/images/project/medimind/Compare page.webp", alt: "Compare reports selection", caption: "Select reports to compare" },
      { src: "/images/project/medimind/Compare result 1.webp", alt: "Compare result table", caption: "Comparison table" },
      { src: "/images/project/medimind/Compare result 2.webp", alt: "Compare result chart", caption: "Value comparison chart" },
      { src: "/images/project/medimind/Compare result 3.webp", alt: "Compare result analysis", caption: "AI analysis summary" },
      { src: "/images/project/medimind/Remind page.webp", alt: "Reminders list", caption: "Medicine reminders" },
      { src: "/images/project/medimind/setting.webp", alt: "Settings page", caption: "App settings" },
      { src: "/images/project/medimind/Dark home analyze history.webp", alt: "Dark mode home, analyze, history", caption: "Dark mode support" },
      { src: "/images/project/medimind/Dark compare remind result setting.webp", alt: "Dark mode compare, remind, result, settings", caption: "Dark mode across app" },
    ],
    liveUrl: "",
    githubUrl: "https://github.com/mannan-sarder/medimind",
    myRole: "Android Developer",
    duration: "3 months",
    problem: [
      "Most people cannot understand the complex terminology, units, and numeric values in their medical test reports and fully depend on doctors even for basic interpretation.",
      "Getting a doctor's explanation for every report is time-consuming and not always accessible, especially in rural areas.",
      "There was no simple way to digitally store reports and track health changes over time by comparing past and present results.",
      "Existing medical apps are English-only, creating a language barrier for Bengali-speaking users.",
    ],
    solution: [
      "Built a fully offline Android app that scans medical reports using on-device OCR, extracts test values and patient information, and compares each value against a locally stored standard range dataset sourced from WHO and NIH. Results are shown in both Bangla and English, with per-test explanations, doctor questions for abnormal values, and a side-by-side report comparison feature with bar chart visualization — no internet connection or external API required.",
    ],
    userFlow: [
  "User opens the app and selects output language (Bangla or English)",
  "Scans report via camera or uploads from gallery",
  "OCR extracts all text on-device",
  "App parses test names, values, and patient info",
  "Each value is compared against the local dataset",
  "Results are displayed with Normal/Low/High status, reference range, explanation, and doctor questions for abnormal values",
  "Abnormal findings are summarized at the bottom",
  "Report is saved to history",
  "User can select any two saved reports and compare them side by side with a bar chart and trend analysis",
],
    appArchitecture: [
  "MVVM::Java-based Android app following MVVM pattern using ViewModel and LiveData.",
  "OCR::Google ML Kit Text Recognition handles fully on-device OCR.",
  "Parser::ReportParser structures the raw OCR text into patient info and test entries.",
  "Analyzer::ReportAnalyzer cross-references each entry against a local JSON dataset (dataset.json, sourced from WHO/NIH) to assign Normal/Low/High status, bilingual explanations, and doctor questions.",
  "Database::Room Database persists all reports locally with SQLite.",
  "Charts::CompareFragment builds side-by-side tables, computes percentage changes, and renders grouped bar charts using MPAndroidChart.",
  "Alarms::AlarmManager handles scheduled medicine reminder notifications.",
  "Settings::SharedPreferences stores user settings including theme mode and default language.",
  "Offline::Everything runs fully offline — no network calls, no API keys.",
],
    challenges: [
      "Parsing inconsistent report formats from different labs and correctly matching test names to the local dataset.",
      "Delivering bilingual output where explanation text, status labels, doctor questions, and reference sources all required separate Bangla and English versions in the dataset.",
      "Building a report comparison engine that correctly aligns test values across two reports that may not share the same set of tests.",
      "OCR accuracy on dense, small-text lab reports was poor at 1024px — resolved by raising the image cap to 2048px, which significantly improved recognition of rows like Differential Count, MPV, and RDW-CV.",
      "Handling Android 12's SCHEDULE_EXACT_ALARM permission change, which silently broke reminder scheduling without a proper canScheduleExactAlarms() check.",
    ],
    lessonsLearned: [
      "A well-structured local JSON dataset sourced from WHO/NIH can fully replace an external AI API for rule-based medical value analysis.",
      "OCR quality is highly dependent on image resolution — small improvements in pixel cap had a large impact on accuracy for dense lab report layouts.",
      "Bilingual support goes beyond translation — every piece of content in the dataset (explanations, doctor questions, status summaries) needs dedicated Bengali and English fields.",
      "Offline-first architecture improves both user trust and performance, especially for health-related apps where data privacy matters.",
    ],
    futureImprovements: [
      "Add an AI-powered chatbot for answering report-related health questions (originally planned with Google Gemini API).",
      "Support PDF report upload in addition to camera images.",
      "Add individual test trend graphs across multiple saved reports over time.",
      "Optional Firebase backend for cloud backup and multi-device sync.",
    ],
  },

  /*
 { 
  
    id: "",
    title: "",
    slug: "",
    type: "",
    subtitle: "",
    description: "",
    shortDescription: "",
    features: [
      { text: "" },
      { text: "" },
      { text: "" },
    ],
    techStack: [
      { name: "", category: "" },
      { name: "", category: "" },
      { name: "", category: "" },
      { name: "", category: "" },
    ],
    coverImage: "",
    liveUrl: "",
    githubUrl: "",
    myRole: "",
    duration: "",
    problem: [
      "",
      "",
    ],
    solution: [
      "",
    ],
    userFlow: [
      "",
    ],
    appArchitecture: [
      "",
    ],
    challenges: [
      "",
    ],
    lessonsLearned: [
      "",
    ],
    futureImprovements: [
      "",
      "",
    ],
}, 
*/

];
