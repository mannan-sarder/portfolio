"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ── colour palette ── */
const PAL = [
  [34,  211, 238] as const,   // cyan
  [139,  92, 246] as const,   // purple
  [96,  165, 250] as const,   // blue
];

/* ── types ── */
interface Nd { x:number; y:number; sx:number; sy:number; tx:number; ty:number; ci:number; op:number; }
interface Ed { a:number; b:number; prog:number; op:number; }
interface Pu { ei:number; t:number; burstT:number; burst:boolean; trail:{x:number;y:number}[]; }

type Phase = "blank"|"appear"|"connect"|"pulse"|"disconnect"|"move";

const DUR = { blank:.5, appear:1.3, connect:1.4, pulse:0, disconnect:.9, move:2.2 };
const PULSES_PER_ROUND = 3;

/* ── ease ── */
const ease = (t:number) => t<.5 ? 2*t*t : -1+(4-2*t)*t;
const clamp = (t:number) => Math.max(0,Math.min(1,t));
const lerp  = (a:number,b:number,t:number) => a+(b-a)*t;

/**
 * Page-level neural-network background.
 *
 * One fixed layer sits behind every section (so sections can be transparent and
 * the page feels like one continuous space). It never captures pointer events.
 *
 * Performance notes
 *  - Every glow is painted ONCE into a small offscreen sprite and then blitted
 *    with drawImage (no createRadialGradient inside the frame loop).
 *  - The loop pauses while the tab is hidden.
 *  - The canvas is sized with 100lvh and only rebuilt when the WIDTH changes, so
 *    the mobile address bar showing/hiding while scrolling does not reset it.
 *  - Mobile: fewer nodes, DPR capped at 1, ~30fps.
 *  - prefers-reduced-motion: a single static frame, no animation loop.
 */
export default function NeuralAurora() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // non-nullable aliases so the hoisted helper functions below need no "!" assertions
    const cv: HTMLCanvasElement = canvas;
    const c2d: CanvasRenderingContext2D = ctx;

    let W = 0, H = 0, dpr = 1, isMobile = false;
    const PAD = 70;

    /* ── sprites (painted once, drawn many times) ── */
    const HALO_R = 14, CORE_R = 3.5, ORB_R = 40, TRAIL_R = 12;
    let halo: HTMLCanvasElement[] = [];
    let core: HTMLCanvasElement[] = [];
    let orb: HTMLCanvasElement | null = null;
    let trailSprite: HTMLCanvasElement | null = null;

    function makeSprite(radius: number, paint: (g: CanvasRenderingContext2D, r: number) => void) {
      const c = document.createElement("canvas");
      const size = Math.max(1, Math.ceil(radius * 2 * dpr));
      c.width = size; c.height = size;
      const g = c.getContext("2d");
      if (g) {
        g.scale(size / (radius * 2), size / (radius * 2));
        paint(g, radius);
      }
      return c;
    }

    function disc(g: CanvasRenderingContext2D, r: number, rad: number, stops: [number, string][]) {
      const grad = g.createRadialGradient(r, r, 0, r, r, rad);
      stops.forEach(([o, col]) => grad.addColorStop(o, col));
      g.beginPath(); g.arc(r, r, rad, 0, Math.PI * 2);
      g.fillStyle = grad; g.fill();
    }

    function buildSprites() {
      halo = PAL.map(([r, g, b]) =>
        makeSprite(HALO_R, (c, R) => disc(c, R, HALO_R, [
          [0,   `rgba(${r},${g},${b},.35)`],
          [.45, `rgba(${r},${g},${b},.08)`],
          [1,   `rgba(${r},${g},${b},0)`],
        ])),
      );
      core = PAL.map(([r, g, b]) =>
        makeSprite(CORE_R, (c, R) => disc(c, R, CORE_R, [
          [0,  `rgba(255,255,255,.8)`],
          [.5, `rgba(${r},${g},${b},.8)`],
          [1,  `rgba(${r},${g},${b},0)`],
        ])),
      );
      orb = makeSprite(ORB_R, (c, R) => {
        ([[40, .10], [24, .25], [13, .55]] as const).forEach(([rad, a]) =>
          disc(c, R, rad, [[0, `rgba(34,211,238,${a})`], [1, `rgba(34,211,238,0)`]]),
        );
        disc(c, R, 7, [[0, `rgba(255,255,255,1)`], [.6, `rgba(34,211,238,.9)`], [1, `rgba(34,211,238,0)`]]);
      });
      trailSprite = makeSprite(TRAIL_R, (c, R) =>
        disc(c, R, TRAIL_R, [[0, `rgba(34,211,238,.35)`], [1, `rgba(34,211,238,0)`]]),
      );
    }

    function blit(s: HTMLCanvasElement | null, x: number, y: number, radius: number, scale: number, alpha: number) {
      if (!s || alpha <= 0) return;
      const d = radius * scale * 2;
      c2d.globalAlpha = alpha;
      c2d.drawImage(s, x - d / 2, y - d / 2, d, d);
    }

    /* ── state ── */
    let nodes: Nd[] = [];
    let edges: Ed[] = [];
    let pulses: Pu[] = [];
    let pDone = 0;
    let phase: Phase = "blank";
    let phaseT = 0;

    const nodeCount = () => (W < 768 ? 28 : 60);

    function spawnNodes() {
      nodes = Array.from({ length: nodeCount() }, (_, i) => ({
        x: PAD + Math.random() * (W - 2 * PAD), y: PAD + Math.random() * (H - 2 * PAD),
        sx: 0, sy: 0, tx: 0, ty: 0,
        ci: i % PAL.length, op: 0,
      }));
    }

    function buildEdges() {
      const seen = new Set<string>();
      edges = [];
      nodes.forEach((n, i) => {
        nodes
          .map((o, j) => ({ j, d: Math.hypot(n.x - o.x, n.y - o.y) }))
          .filter(e => e.j !== i).sort((a, b) => a.d - b.d).slice(0, 2)
          .forEach(({ j }) => {
            const k = i < j ? `${i}-${j}` : `${j}-${i}`;
            if (!seen.has(k)) { seen.add(k); edges.push({ a: i, b: j, prog: 0, op: 0 }); }
          });
      });
    }

    function enter(p: Phase) {
      phase = p; phaseT = 0;
      if (p === "appear") nodes.forEach(n => n.op = 0);
      if (p === "connect") { buildEdges(); edges.forEach(e => { e.prog = 0; e.op = 0; }); }
      if (p === "pulse") { pDone = 0; pulses = []; }
      if (p === "move") nodes.forEach(n => {
        n.sx = n.x; n.sy = n.y;
        n.tx = PAD + Math.random() * (W - 2 * PAD);
        n.ty = PAD + Math.random() * (H - 2 * PAD);
      });
    }

    /* (re)size + (re)start. Called on mount and when the width really changes. */
    function setup() {
      const cap = window.innerWidth < 768 ? 1 : 1.5;
      dpr = Math.min(window.devicePixelRatio || 1, cap);
      W = cv.clientWidth;
      H = cv.clientHeight;
      isMobile = W < 768;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildSprites();
      spawnNodes();
      edges = []; pulses = []; pDone = 0;
      phase = "blank"; phaseT = 0;
    }

    /* ── draw helpers ── */
    function drawNode(n: Nd) {
      if (n.op <= 0) return;
      blit(halo[n.ci], n.x, n.y, HALO_R, 1, n.op);
      blit(core[n.ci], n.x, n.y, CORE_R, 1, n.op);
    }

    function drawEdge(e: Ed) {
      if (e.op <= 0 || e.prog <= 0) return;
      const { x: ax, y: ay } = nodes[e.a], { x: bx, y: by } = nodes[e.b];
      c2d.beginPath();
      c2d.moveTo(ax, ay);
      c2d.lineTo(lerp(ax, bx, e.prog), lerp(ay, by, e.prog));
      c2d.strokeStyle = `rgba(100,180,255,${e.op * .28})`;
      c2d.lineWidth = 1;
      c2d.stroke();
    }

    function getPulsePos(p: Pu) {
      const e = edges[p.ei];
      if (!e) return { x: 0, y: 0 };
      return {
        x: lerp(nodes[e.a].x, nodes[e.b].x, p.t),
        y: lerp(nodes[e.a].y, nodes[e.b].y, p.t),
      };
    }

    /* ── simulation step ── */
    function update(dt: number) {
      phaseT += dt;
      switch (phase) {
        case "blank":   if (phaseT > DUR.blank) enter("appear"); break;
        case "appear":
          nodes.forEach((n, i) => { n.op = clamp((phaseT - (i / nodes.length) * .7) / .4); });
          if (phaseT > DUR.appear) enter("connect");
          break;
        case "connect":
          edges.forEach((e, i) => {
            const d = (i / edges.length) * 1.0;
            const p = clamp((phaseT - d) / .5);
            e.prog = ease(p); e.op = p;
          });
          if (phaseT > DUR.connect) enter("pulse");
          break;
        case "pulse":
          if (pulses.filter(p => !p.burst || p.burstT < .6).length === 0 && pDone < PULSES_PER_ROUND) {
            if (edges.length > 0)
              pulses.push({ ei: Math.floor(Math.random() * edges.length), t: 0, burstT: 0, burst: false, trail: [] });
          }
          pulses.forEach(p => {
            if (p.burst) { p.burstT += dt; return; }
            const { x, y } = getPulsePos(p);
            p.trail.push({ x, y });
            if (p.trail.length > 10) p.trail.shift();
            p.t += dt * .5;
            if (p.t >= 1) { p.t = 1; p.burst = true; pDone++; }
          });
          if (pDone >= PULSES_PER_ROUND && pulses.every(p => p.burstT > .6))
            enter("disconnect");
          break;
        case "disconnect":
          edges.forEach(e => { e.op = clamp(1 - phaseT / DUR.disconnect); });
          if (phaseT > DUR.disconnect) enter("move");
          break;
        case "move": {
          const t = ease(clamp(phaseT / DUR.move));
          nodes.forEach(n => { n.x = lerp(n.sx, n.tx, t); n.y = lerp(n.sy, n.ty, t); });
          if (phaseT > DUR.move) enter("connect");
          break;
        }
      }
    }

    /* ── render (edges → pulses → nodes) ── */
    function render() {
      c2d.globalAlpha = 1;
      c2d.clearRect(0, 0, W, H);

      edges.forEach(drawEdge);

      pulses.forEach(p => {
        if (!edges[p.ei]) return;
        if (!p.burst) {
          p.trail.forEach(({ x, y }, i) => {
            const a = (i + 1) / p.trail.length;
            blit(trailSprite, x, y, TRAIL_R, a, a);
          });
          const { x, y } = getPulsePos(p);
          blit(orb, x, y, ORB_R, 1, 1);
        } else {
          const k = clamp(p.burstT / .6);
          const { x, y } = getPulsePos(p);
          blit(orb, x, y, ORB_R, 1 + k * 2.5, 1 - k);
        }
      });

      nodes.forEach(drawNode);
      c2d.globalAlpha = 1;
    }

    /* reduced motion → one calm, fully connected frame */
    function staticFrame() {
      nodes.forEach(n => { n.op = 1; });
      buildEdges();
      edges.forEach(e => { e.prog = 1; e.op = 1; });
      pulses = [];
      render();
    }

    /* ── loop ── */
    let raf = 0;
    let last = performance.now();
    let lastDraw = 0;

    function tick(now: number) {
      raf = 0;
      if (isMobile && now - lastDraw < 30) { raf = requestAnimationFrame(tick); return; } // ~30fps on phones
      const dt = Math.min((now - last) / 1000, .05);
      last = now; lastDraw = now;
      update(dt);
      render();
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (raf || reduced) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }

    setup();
    if (reduced) staticFrame(); else start();

    /* pause while the tab is hidden */
    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVisibility);

    /* rebuild only when the width really changes (ignores mobile address-bar resizes) */
    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (w === W && Math.abs(h - H) < 120) return;
        setup();
        if (reduced) staticFrame();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      window.clearTimeout(rt);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#060609]"
    >
      <div className="absolute inset-0 opacity-40">
        {/* soft aurora backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 72% 55% at 16% 26%, rgba(139,92,246,0.18) 0%,transparent 60%)",
              "radial-gradient(ellipse 55% 50% at 84% 18%, rgba(59,130,246,0.15) 0%,transparent 55%)",
              "radial-gradient(ellipse 62% 45% at 66% 80%, rgba(34,211,238,0.13) 0%,transparent 55%)",
              "radial-gradient(ellipse 48% 42% at 26% 84%, rgba(236,72,153,0.10) 0%,transparent 50%)",
            ].join(","),
          }}
        />
        {/* 100lvh keeps the buffer size constant while the mobile toolbar moves */}
        <canvas
          ref={cvs}
          className="absolute left-0 top-0 block h-full w-full"
          style={{ height: "100lvh" }}
        />
      </div>
    </div>
  );
}
