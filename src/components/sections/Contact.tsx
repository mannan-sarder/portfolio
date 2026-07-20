"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { CONTACT_INFO } from "@/data/portfolio";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

// ─── Node Canvas Animation ────────────────────────────────────────────────────

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function NodeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);

  const initNodes = useCallback((w: number, h: number) => {
    nodesRef.current = Array.from({ length: 25 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNodes(canvas.width, canvas.height);
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => { mouseRef.current = { x: -9999, y: -9999 }; });

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Draw lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const mdx = (nodes[i].x + nodes[j].x) / 2 - mouse.x;
            const mdy = (nodes[i].y + nodes[j].y) / 2 - mouse.y;
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
            const bright = mouseDist < 100 ? 0.35 : 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139,92,246,${bright * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const glow = mouseDist < 80 ? 0.9 : 0.45;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${glow})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// ─── Live Clock with digit roll ───────────────────────────────────────────────

function RollingChar({ char, prevChar }: { char: string; prevChar: string }) {
  const changed = char !== prevChar && prevChar !== "";
  return (
    <span className="relative inline-block overflow-hidden" style={{ height: "1em", verticalAlign: "bottom" }}>
      {changed && (
        <motion.span
          key={`out-${prevChar}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-hidden="true"
        >
          {prevChar}
        </motion.span>
      )}
      <motion.span
        key={`in-${char}-${changed}`}
        className="flex items-center justify-center"
        initial={changed ? { y: 12, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {char}
      </motion.span>
    </span>
  );
}

function LiveClock() {
  const [time, setTime] = useState("");
  const [prevTime, setPrevTime] = useState("");

  useEffect(() => {
    const update = () => {
      const next = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime((prev) => {
        if (prev !== next) setPrevTime(prev);
        return next;
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <>
      {time.split("").map((char, i) => (
        <RollingChar key={i} char={char} prevChar={prevTime[i] ?? ""} />
      ))}
    </>
  );
}

// ─── Time/Location Card: Mouse Follow Light ───────────────────────────────────

function MouseFollowLight() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [inside, setInside] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const el = containerRef.current?.closest("[data-time-card]") as HTMLElement | null;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    };
    const onEnter = () => setInside(true);
    const onLeave = () => setInside(false);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08);
      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
      <div
        className="absolute rounded-full transition-opacity duration-500"
        style={{
          width: 250,
          height: 250,
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: inside ? 1 : 0,
        }}
      />
    </div>
  );
}

// ─── Time/Location Card: Ambient Glow (10s cycle) ─────────────────────────────

function AmbientFlowGlow({ pulseActive }: { pulseActive: boolean }) {
  // Top glow + bottom glow breathe together in 10s loop
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
      aria-hidden="true"
    >
      {/* Top blue glow */}
      <motion.div
        className="absolute left-0 right-0 top-0 h-[60%]"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.13) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          opacity: [0.15, 0.35, 0.35, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15],
          filter: [
            "blur(40px)",
            "blur(80px)",
            "blur(80px)",
            "blur(40px)",
            "blur(40px)",
            "blur(40px)",
            "blur(40px)",
            "blur(40px)",
            "blur(40px)",
            "blur(40px)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0] }}
      />
      {/* Bottom blue glow */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 h-[60%]"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          opacity: [0.15, 0.30, 0.30, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0] }}
      />
      {/* Pulse override from LocationPin */}
      {pulseActive && (
        <motion.div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 70% 50%, rgba(59,130,246,0.10), transparent 60%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <MouseFollowLight />
    </div>
  );
}

// ─── Time/Location Card: Divider Wave Particles (top↔bottom signal) ──────────

function DividerWaveSignal({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const waveDownRef = useRef<SVGCircleElement>(null);
  const waveUpRef = useRef<SVGCircleElement>(null);
  const rafRef = useRef<number>(0);
  const cycleStartRef = useRef<number>(0);

  useEffect(() => {
    cycleStartRef.current = performance.now();

    const tick = (now: number) => {
      const t = ((now - cycleStartRef.current) % 10000) / 10000;
      const h = containerRef.current?.offsetHeight ?? 100;

      // top → bottom wave (t 0.42–0.58)
      if (waveDownRef.current) {
        if (t >= 0.42 && t < 0.58) {
          const p = (t - 0.42) / 0.16;
          const y = p * h;
          const op = p < 0.15 ? p / 0.15 : p > 0.85 ? (1 - p) / 0.15 : 1;
          waveDownRef.current.setAttribute("cy", String(y));
          waveDownRef.current.setAttribute("opacity", String(op * 0.9));
          waveDownRef.current.setAttribute("r", String(2.5 + op * 1.5));
        } else {
          waveDownRef.current.setAttribute("opacity", "0");
        }
      }

      // bottom → top wave (t 0.48–0.64)
      if (waveUpRef.current) {
        if (t >= 0.48 && t < 0.64) {
          const p = (t - 0.48) / 0.16;
          const y = h - p * h;
          const op = p < 0.15 ? p / 0.15 : p > 0.85 ? (1 - p) / 0.15 : 1;
          waveUpRef.current.setAttribute("cy", String(y));
          waveUpRef.current.setAttribute("opacity", String(op * 0.7));
          waveUpRef.current.setAttribute("r", String(2 + op));
        } else {
          waveUpRef.current.setAttribute("opacity", "0");
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [containerRef]);

  return (
    <svg
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <circle ref={waveDownRef} cx="50%" cy="0" r="2.5" fill="#3B82F6" opacity={0} />
      <circle ref={waveUpRef} cx="50%" cy="0" r="2.5" fill="#3B82F6" opacity={0} />
    </svg>
  );
}

// ─── Time/Location Card: Animated Divider with center Plus ───────────────────

function AnimatedDivider() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative self-stretch mx-4 hidden sm:flex flex-col items-center justify-center" aria-hidden="true">
      {/* Divider line */}
      <motion.div
        className="absolute inset-y-0 w-px"
        style={{ background: "rgba(59,130,246,0.2)" }}
        animate={{
          opacity: [0.2, 0.2, 0.2, 0.8, 0.8, 0.2, 0.2, 0.2, 0.2, 0.2],
          boxShadow: [
            "none",
            "none",
            "none",
            "0 0 8px rgba(59,130,246,0.4)",
            "0 0 8px rgba(59,130,246,0.4)",
            "none",
            "none",
            "none",
            "none",
            "none",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", times: [0, 0.2, 0.35, 0.45, 0.6, 0.65, 0.7, 0.8, 0.9, 1.0] }}
      />
      {/* Wave signal particles */}
      <DividerWaveSignal containerRef={containerRef} />
      {/* Center Plus */}
      <motion.div
        className="relative z-10 text-[#3B82F6] select-none leading-none"
        style={{ fontSize: 18, fontWeight: 300, lineHeight: 1 }}
        animate={{
          scale: [1, 1, 1, 1.15, 1.15, 1, 1, 1, 1, 1],
          opacity: [0.4, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 0.4, 0.4, 0.4],
          filter: [
            "drop-shadow(0 0 0px rgba(59,130,246,0))",
            "drop-shadow(0 0 0px rgba(59,130,246,0))",
            "drop-shadow(0 0 0px rgba(59,130,246,0))",
            "drop-shadow(0 0 10px rgba(59,130,246,0.8))",
            "drop-shadow(0 0 25px rgba(59,130,246,0.6))",
            "drop-shadow(0 0 0px rgba(59,130,246,0))",
            "drop-shadow(0 0 0px rgba(59,130,246,0))",
            "drop-shadow(0 0 0px rgba(59,130,246,0))",
            "drop-shadow(0 0 0px rgba(59,130,246,0))",
            "drop-shadow(0 0 0px rgba(59,130,246,0))",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.35, 0.45, 0.55, 0.65, 0.7, 0.8, 0.9, 1.0] }}
      >
        +
      </motion.div>
    </div>
  );
}

// ─── Time/Location Card: Edge Dots Flow ──────────────────────────────────────

function EdgeDots({ side }: { side: "left" | "right" }) {
  const dotPositions = [25, 45, 65];
  return (
    <div
      className="pointer-events-none absolute top-0 bottom-0 flex flex-col justify-around"
      style={{ [side]: 8 }}
      aria-hidden="true"
    >
      {dotPositions.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 rounded-full"
          style={{ background: "rgba(59,130,246,0.5)" }}
          animate={{
            opacity: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4, 0.4, 0.1, 0.1],
            x: side === "left"
              ? [0, 0, 0, 0, 0, 0, -6, 6, 0, 0]
              : [0, 0, 0, 0, 0, 0, 6, -6, 0, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.2, 0.3, 0.4, 0.5, 0.55, 0.65, 0.75, 0.85, 1.0],
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

// ─── Time/Location Card: Border Travel Signal (glowing dot circling border) ──

function BorderTravelSignal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const cycleStartRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const card = canvas.closest("[data-time-card]") as HTMLElement | null;
    if (!card) return;

    const R = 24; // matches rounded-3xl border radius

    const resize = () => {
      canvas.width = card.offsetWidth;
      canvas.height = card.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const getPerimeter = (w: number, h: number) =>
      2 * (w - 2 * R) + 2 * (h - 2 * R) + 2 * Math.PI * R;

    const pointOnBorder = (t: number, w: number, h: number): [number, number] => {
      const perim = getPerimeter(w, h);
      let d = (((t % 1) + 1) % 1) * perim;
      const seg = [w - 2 * R, h - 2 * R, w - 2 * R, h - 2 * R];
      const arcLen = (Math.PI / 2) * R;

      if (d < seg[0]) return [R + d, 0];
      d -= seg[0];
      if (d < arcLen) {
        const a = -Math.PI / 2 + (d / arcLen) * (Math.PI / 2);
        return [w - R + Math.cos(a) * R, R + Math.sin(a) * R];
      }
      d -= arcLen;
      if (d < seg[1]) return [w, R + d];
      d -= seg[1];
      if (d < arcLen) {
        const a = (d / arcLen) * (Math.PI / 2);
        return [w - R + Math.cos(a) * R, h - R + Math.sin(a) * R];
      }
      d -= arcLen;
      if (d < seg[2]) return [w - R - d, h];
      d -= seg[2];
      if (d < arcLen) {
        const a = Math.PI / 2 + (d / arcLen) * (Math.PI / 2);
        return [R + Math.cos(a) * R, h - R + Math.sin(a) * R];
      }
      d -= arcLen;
      if (d < seg[3]) return [0, h - R - d];
      d -= seg[3];
      const a = Math.PI + (d / arcLen) * (Math.PI / 2);
      return [R + Math.cos(a) * R, R + Math.sin(a) * R];
    };

    cycleStartRef.current = performance.now();

    const draw = (now: number) => {
      const t = ((now - cycleStartRef.current) % 10000) / 10000;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (t >= 0.55 && t < 0.9) {
        const p = (t - 0.55) / 0.35;
        const tailLen = 0.18;
        const head = p;
        for (let i = 0; i <= 40; i++) {
          const tp = head - (i / 40) * tailLen;
          if (tp < 0) continue;
          const [px, py] = pointOnBorder(tp, w, h);
          const alpha = (1 - i / 40) * (p < 0.1 ? p / 0.1 : p > 0.9 ? (1 - p) / 0.1 : 1) * 0.85;
          const rad = (1 - i / 40) * 3;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.5, rad), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59,130,246,${alpha})`;
          ctx.fill();
        }
        const [hx, hy] = pointOnBorder(head, w, h);
        const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 10);
        const headAlpha = 0.5 * (p < 0.1 ? p / 0.1 : p > 0.9 ? (1 - p) / 0.1 : 1);
        grad.addColorStop(0, `rgba(59,130,246,${headAlpha})`);
        grad.addColorStop(1, "rgba(59,130,246,0)");
        ctx.beginPath();
        ctx.arc(hx, hy, 10, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full rounded-3xl"
      aria-hidden="true"
    />
  );
}

// ─── Location Pin with periodic pulse ─────────────────────────────────────────

function LocationPinIcon({ onPulse }: { onPulse: () => void }) {
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPulseKey((k) => k + 1);
      onPulse();
    }, 6000);
    return () => clearInterval(id);
  }, [onPulse]);

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <motion.div
        key={`bloom-${pulseKey}`}
        className="absolute w-16 h-16 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.5), transparent 70%)",
          filter: "blur(6px)",
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.15, 1.4], opacity: [0, 0.9, 0] }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />
      <div
        className="relative w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-violet-400 transition-transform duration-300 group-hover:scale-105"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 12px rgba(139,92,246,0.06)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 relative z-10" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
    </div>
  );
}

// ─── Social Link Item ─────────────────────────────────────────────────────────

function SocialItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex items-center gap-3 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg p-1"
    >
      <span
        className="text-[#A1A1AA] group-hover:text-violet-400 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-[15px] font-medium text-[#A1A1AA] group-hover:text-white transition-colors duration-300 font-geist">
        {label}
      </span>
    </a>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

function Card({
  children,
  className = "",
  index = 0,
  enhancedHover = false,
  "data-time-card": dataTimeCard,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  enhancedHover?: boolean;
  "data-time-card"?: true;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      whileHover={enhancedHover ? { y: -4, scale: 1.01 } : { y: -3 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl border border-[#2A2A2A] bg-[#111111] p-8 ${className}`}
      style={{ transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
      data-time-card={dataTimeCard ? "" : undefined}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = dataTimeCard ? "rgba(59,130,246,0.45)" : "rgba(139,92,246,0.45)";
        el.style.boxShadow = enhancedHover
          ? dataTimeCard
            ? "0 0 0 1px rgba(59,130,246,0.18), 0 24px 70px rgba(59,130,246,0.14)"
            : "0 0 0 1px rgba(139,92,246,0.18), 0 24px 70px rgba(139,92,246,0.14)"
          : "0 0 0 1px rgba(139,92,246,0.12), 0 20px 60px rgba(139,92,246,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "#2A2A2A";
        el.style.boxShadow = "none";
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [glowPulse, setGlowPulse] = useState(false);

  const triggerGlowPulse = useCallback(() => {
    const delayId = setTimeout(() => {
      setGlowPulse(true);
      setTimeout(() => setGlowPulse(false), 1100);
    }, 180);
    return () => clearTimeout(delayId);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-[40px]"
      aria-label="Contact"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/6 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8">

        {/* ── Row 1: Header + Time/Location ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-start"
        >
          {/* Section Header */}
          <div>
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" aria-hidden="true" />
              <span className="text-[14px] font-semibold tracking-[0.2em] uppercase text-violet-400 font-geist">
                CONTACT
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-satoshi text-[clamp(40px,5vw,64px)] font-bold leading-[1.1] tracking-tight text-white mb-5 max-w-[600px]"
            >
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                Together.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-[20px] font-normal leading-[1.8] text-[#A1A1AA] font-geist max-w-[480px]"
            >
              Whether it&apos;s a project, collaboration,
              <br />
              or just a conversation, feel free to reach out.
            </motion.p>
          </div>

          {/* Card: Time & Location */}
          <Card index={0} enhancedHover className="flex flex-col justify-center group" data-time-card>
            <AmbientFlowGlow pulseActive={glowPulse} />
            <BorderTravelSignal />
            <EdgeDots side="left" />
            <EdgeDots side="right" />
            <div className="relative z-10 flex items-start gap-0 h-full">
              {/* Local Time */}
              <div className="flex-1 flex flex-col items-start gap-4">
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#3B82F6] transition-transform duration-300 group-hover:scale-105"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 12px rgba(59,130,246,0.06)" }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-[13px] text-[#A1A1AA] font-geist mb-1">Local Time</p>
                  <p className="text-[28px] font-bold text-white font-satoshi leading-none mb-1" style={{ display: "flex", alignItems: "baseline" }}>
                    <LiveClock />
                  </p>
                  <p className="text-[13px] text-[#3B82F6] font-geist">{CONTACT_INFO.gmtOffset}</p>
                </div>
              </div>

              {/* Animated Divider with center Plus */}
              <AnimatedDivider />

              {/* Location */}
              <div className="flex-1 flex flex-col items-start gap-4">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <LocationPinIcon onPulse={triggerGlowPulse} />
                </motion.div>
                <div>
                  <p className="text-[13px] text-[#A1A1AA] font-geist mb-1">Location</p>
                  <p className="text-[28px] font-bold text-white font-satoshi leading-none mb-1">
                    {CONTACT_INFO.location}
                  </p>
                  <p className="text-[13px] text-[#3B82F6] font-geist">{CONTACT_INFO.city}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Row 2: CTA + Connect + Availability ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card: Main CTA */}
          <Card index={1} className="relative overflow-hidden min-h-[320px] flex flex-col justify-between">
            <NodeCanvas />
            <div className="relative z-10">
              {/* Paper plane icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mb-6 text-violet-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </div>
              <h3 className="font-satoshi text-[26px] font-bold text-white leading-[1.2] mb-3">
                Have a project<br />in mind?
              </h3>
              <p className="text-[15px] text-[#A1A1AA] font-geist leading-[1.7] mb-6">
                I&apos;m always open to discussing new ideas,<br />
                exciting projects, or opportunities<br />
                to be part of your vision.
              </p>
            </div>
            <div className="relative z-10">
              <a
                href={CONTACT_INFO.email}
                className="inline-flex items-center gap-2 h-[52px] px-7 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-[15px] font-semibold font-geist hover:opacity-90 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                aria-label="Get in touch via email"
              >
                Get In Touch
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </Card>

          {/* Card: Connect With Me */}
          <Card index={2}>
            <h3 className="font-satoshi text-[18px] font-semibold text-white mb-2">
              Connect With Me
            </h3>
            <div className="w-8 h-px bg-violet-500 mb-6" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <SocialItem
                href={CONTACT_INFO.email}
                label="Email"
                icon={<Image src="/icons/email.svg" alt="" width={24} height={24} />}
              />
              <SocialItem
                href={CONTACT_INFO.linkedin}
                label="LinkedIn"
                icon={<Image src="/icons/linkedin.svg" alt="" width={24} height={24} />}
              />
              <SocialItem
                href={CONTACT_INFO.github}
                label="GitHub"
                icon={<Image src="/icons/github.svg" alt="" width={24} height={24} />}
              />
              <SocialItem
                href={CONTACT_INFO.whatsapp}
                label="WhatsApp"
                icon={<Image src="/icons/whatsapp.svg" alt="" width={24} height={24} />}
              />
              <SocialItem
                href={CONTACT_INFO.telegram}
                label="Telegram"
                icon={<Image src="/icons/telegram.svg" alt="" width={24} height={24} />}
              />
            </div>
          </Card>

          {/* Card: Availability */}
          <Card index={3}>
            <h3 className="font-satoshi text-[18px] font-semibold text-white mb-2">
              Availability
            </h3>
            <div className="w-8 h-px bg-violet-500 mb-6" aria-hidden="true" />

            {/* Toggle — visual only */}
            <div
              className="flex items-center justify-between rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] px-5 py-4 mb-4"
              style={{ pointerEvents: "none", cursor: "default" }}
              aria-label="Open to Collaborations: ON"
            >
              <span className="text-[15px] font-medium text-white font-geist leading-tight">
                Open to<br />Collaborations
              </span>
              {/* Toggle pill */}
              <div className="relative w-12 h-7 rounded-full bg-emerald-500 flex-shrink-0" style={{ boxShadow: "0 0 12px rgba(16,185,129,0.5)" }}>
                <div className="absolute right-1 top-1 w-5 h-5 rounded-full bg-white" />
              </div>
            </div>

            {/* ON indicator */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }} aria-hidden="true" />
              <span className="text-[13px] font-semibold text-emerald-400 tracking-widest font-geist">ON</span>
            </div>

            <div className="w-full h-px bg-[#2A2A2A] mb-5" aria-hidden="true" />

            <p className="text-[15px] text-[#A1A1AA] font-geist leading-[1.7]">
              I&apos;m currently available for<br />
              new projects and opportunities.
            </p>
          </Card>

        </motion.div>
      </div>
    </section>
  );
}
