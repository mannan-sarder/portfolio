"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honours the visitor's "reduce motion" system setting for every Framer Motion
 * animation (transforms and layout animations are skipped; opacity still fades).
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
