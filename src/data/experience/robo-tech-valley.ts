import type { ExperienceItem } from "@/types";

export const roboTechValley: ExperienceItem = {
  id: "robo-tech-valley-industrial-trainee",
  type: "work",
  featured: true,
  role: "Industrial Trainee — AI & Computer Vision",
  organization: "Robo Tech Valley",
  employmentType: "Internship",
  period: "Feb 2026 – Apr 2026",
  duration: "3 months",
  location: "Dhaka, Bangladesh",
  workMode: "On-site",
  image: "/images/experience/robo tech valley - logo.webp",

  images: [
    "/images/experience/robo tech valley - certificate.webp",
    "/images/experience/robo tech valley - internship appointment letter.webp",
    "/images/experience/robo tech valley - token of appreciation.webp",
  ],
  points: [
    "Built a fruit freshness detection system using YOLOv8 and computer vision, achieving 97%+ detection accuracy.",
    "Developed the model training pipeline, including dataset processing and preparation.",
    "Implemented real-time inference with object tracking.",
    "Built a Streamlit dashboard to monitor and visualize model predictions.",
  ],
};

export default roboTechValley;
