import type { ExperienceItem } from "@/types";

export const roboTechValley2: ExperienceItem = {
  id: "robo-tech-valley2-industrial-trainee",
  type: "work",
  featured: false,
  role: "Industrial Trainee (AI & Computer Vision)",
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
    "Developed a real-time fruit freshness detection system using YOLOv8 and computer vision",
    "Engineered the model training pipeline, including dataset processing and preparation",
    "Deployed real-time inference with object tracking and a Streamlit dashboard for monitoring predictions",
    "Achieved 97%+ detection accuracy",
  ],
};

export default roboTechValley2;
