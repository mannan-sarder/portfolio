"use client";

import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import Image from "next/image";
import Link from "next/link";
import NeuralAurora from "@/components/sections/NeuralAurora";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// ─── 3D Scene ─────────────────────────────────────────────────────────────────

function GlassCube() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    // Use r3f pointer (normalized -1..1)
    targetRef.current.x += (pointer.x - targetRef.current.x) * 0.04;
    targetRef.current.y += (pointer.y - targetRef.current.y) * 0.04;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.18;
      groupRef.current.rotation.x = t * 0.12 + targetRef.current.y * 0.35;
      groupRef.current.rotation.y = t * 0.18 + targetRef.current.x * 0.35;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = t * -0.22;
      innerRef.current.rotation.y = t * 0.28;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer wireframe cube */}
      <mesh>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Glass outer cube */}
      <mesh>
        <boxGeometry args={[20.2, 20.2, 20.2]} />
        <meshStandardMaterial
          color="#3B82F6"
          transparent
          opacity={0.06}
          roughness={0}
          metalness={1}
          side={2}
        />
      </mesh>

      {/* Inner rotating cube — glowing */}
      <mesh ref={innerRef} scale={0.6}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial
          color="#8B5CF6"
          transparent
          opacity={0.18}
          roughness={0}
          metalness={1}
          emissive="#6D28D9"
          emissiveIntensity={1.2}
          side={2}
        />
      </mesh>
      <mesh ref={innerRef} scale={0.6}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Center bright core */}
      <mesh scale={0.12}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#BFABFF"
          emissiveIntensity={4}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Floating orbs */}
      {([
        { pos: [-1.6, 1.2, 0.4] as [number,number,number], s: 0.09, spd: 1.1, c: "#60A5FA" },
        { pos: [1.7, -0.8, 0.6] as [number,number,number], s: 0.07, spd: 0.8, c: "#A78BFA" },
        { pos: [0.5, 1.9, -0.3] as [number,number,number], s: 0.055, spd: 1.4, c: "#818CF8" },
        { pos: [-0.8, -1.7, 0.2] as [number,number,number], s: 0.075, spd: 1.0, c: "#7C3AED" },
        { pos: [1.3, 1.5, -0.8] as [number,number,number], s: 0.05, spd: 1.6, c: "#3B82F6" },
      ]).map(({ pos, s, c }, i) => (
        <mesh key={i} position={pos} scale={s}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={c}
            transparent
            opacity={0.85}
            roughness={0.1}
            metalness={0.9}
            emissive={c}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[2.8, 0.008, 8, 120]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 3.5, -0.6, 0.4]}>
        <torusGeometry args={[3.1, 0.005, 8, 120]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 8]} intensity={3} color="#3B82F6" />
      <pointLight position={[-6, -4, 4]} intensity={2} color="#8B5CF6" />
      <pointLight position={[0, 0, 6]} intensity={1} color="#FFFFFF" />
      <GlassCube />
    </>
  );
}


const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const canvasVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

// ─── Social Data ──────────────────────────────────────────────────────────────

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} className="w-5 h-5" /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} className="w-5 h-5" /> },
  { label: "Email", href: "mailto:hello@mannan.dev", icon: <Image src="/icons/email.svg" alt="Email" width={20} height={20} className="w-5 h-5" /> },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#060609] flex items-center"
      aria-label="Hero section"
    >
      {/* ── Background glow blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-violet-800/8 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-700/6 blur-[90px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Neural Aurora animation */}
        <div className="absolute inset-0 opacity-40">
          <NeuralAurora />
        </div>
      </div>

      {/* ── Main content wrapper ── */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="relative z-10 mx-auto w-full max-w-[1200px] px-8 pt-[80px] lg:pt-[140px] pb-0"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">

          {/* ── Left column ── */}
          <motion.div
            className="flex-1 min-w-0 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: yParallax }}
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-emerald-400 uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(40px,4.5vw,64px)] font-extrabold leading-[1.08] tracking-tight text-white font-display mb-1"
            >
              MD Mannan Sarder
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="mt-2 text-[clamp(22px,2.8vw,36px)] font-semibold leading-[1.3] tracking-normal text-white"
            >
              Software Engineer &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">
                Full Stack Developer
              </span>
            </motion.p>

            
            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-[560px] text-[16px] font-normal leading-[28px] text-[#A1A1AA]"
            >
              I build modern web applications and enjoy turning ideas into useful digital products.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl px-7 h-12 text-[15px] font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.55)] hover:-translate-y-0.5"
                style={{ background: "linear-gradient(180deg, #3B82F6, #8B5CF6)" }}
              >
                <DownloadIcon />
                Resume
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#2A2A2A] bg-transparent px-7 h-12 text-[15px] font-semibold text-white transition-all duration-300 hover:border-[#3B82F6]/50 hover:-translate-y-0.5"
              >
                Contact Me
                <ArrowRightIcon />
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="mt-5 flex items-center gap-2.5"
            >
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2A2A2A] text-white/60 transition-all duration-250 hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/10 hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </motion.div>

          </motion.div>

          {/* ── Right column — 3D canvas ── */}
          <motion.div
            className="relative flex-shrink-0 mt-12 lg:mt-0 w-full lg:w-[300px] xl:w-[336px] h-[228px] sm:h-[264px] lg:h-[336px]"
            style={{ x: -40 }}
            variants={canvasVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Blue glow behind canvas */}
            <div
              className="pointer-events-none absolute inset-0 blur-[90px] opacity-25"
              style={{ background: "radial-gradient(ellipse at center, #3B82F6 0%, #8B5CF6 40%, transparent 70%)" }}
              aria-hidden="true"
            />

            <Canvas
              camera={{ position: [0, 0, 6], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
              className="!absolute inset-0"
              aria-label="Animated 3D glass cube"
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-violet-400/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}