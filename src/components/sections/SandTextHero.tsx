"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WordConfig {
  text: string;
  colors: [string, string];
  colors2?: [string, string];
  dual?: boolean;
}

interface Grain {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  delay: number;
  dur: number;
  wobble: number;
  phase: number;
  t: number;
  colorGroup: number | null;
}

interface FallingGrain {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface SampledWord {
  cells: number[];
  cellMeta: number[] | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface SandTextHeroProps {
  /** Words to animate through. Defaults to MS / Mannan Sarder / Full Stack Developer */
  words?: WordConfig[];
  /** Canvas width in px. Default 420 */
  width?: number;
  /** Canvas height in px. Default 130 */
  height?: number;
  className?: string;
}

const DEFAULT_WORDS: WordConfig[] = [
  {
    text: "MS",
    colors: ["#60A5FA", "#3B82F6"],
    colors2: ["#C084FC", "#8B5CF6"],
    dual: true,
  },
  { text: "Mannan Sarder", colors: ["#A78BFA", "#8B5CF6"], dual: false },
  {
    text: "Full Stack Developer",
    colors: ["#22D3EE", "#06B6D4"],
    dual: false,
  },
];

export default function SandTextHero({
  words = DEFAULT_WORDS,
  width = 420,
  height = 130,
  className = "",
}: SandTextHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let cancelled = false;

    const W = width;
    const H = height;
    const GRAIN = 3;
    const cols = Math.floor(W / GRAIN);
    const rows = Math.floor(H / GRAIN);
    const PILE_COLOR: [number, number, number] = [194, 149, 108]; // desert sand warm

    const WORDS = words;
    let wordIndex = 0;

    const hexToRgb = (hex: string): [number, number, number] => {
      const v = parseInt(hex.slice(1), 16);
      return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
    };

    const colorFor = (colors: [string, string], t: number): string => {
      const c1 = hexToRgb(colors[0]);
      const c2 = hexToRgb(colors[1]);
      return (
        "rgb(" +
        Math.round(c1[0] + (c2[0] - c1[0]) * t) +
        "," +
        Math.round(c1[1] + (c2[1] - c1[1]) * t) +
        "," +
        Math.round(c1[2] + (c2[2] - c1[2]) * t) +
        ")"
      );
    };

    const pileColor = (): string => {
      const jit = Math.random() * 14 - 7;
      return (
        "rgb(" +
        Math.round(PILE_COLOR[0] + jit) +
        "," +
        Math.round(PILE_COLOR[1] + jit) +
        "," +
        Math.round(PILE_COLOR[2] + jit) +
        ")"
      );
    };

    const sampleWord = (item: WordConfig): SampledWord => {
      if (item.dual && item.text === "MS") {
        const fontSize = 130;
        const offM = document.createElement("canvas");
        offM.width = W;
        offM.height = H;
        const mctx = offM.getContext("2d");
        if (!mctx) return { cells: [], cellMeta: null };
        mctx.textAlign = "center";
        mctx.textBaseline = "middle";
        mctx.font = "800 " + fontSize + "px Georgia, serif";
        mctx.fillStyle = "#fff";
        mctx.fillText("M", W / 2 - 29, H / 2 + 6);
        const dataM = mctx.getImageData(0, 0, W, H).data;

        const offS = document.createElement("canvas");
        offS.width = W;
        offS.height = H;
        const sctx = offS.getContext("2d");
        if (!sctx) return { cells: [], cellMeta: null };
        sctx.textAlign = "center";
        sctx.textBaseline = "middle";
        sctx.font = "800 " + fontSize + "px Georgia, serif";
        sctx.fillStyle = "#fff";
        sctx.fillText("S", W / 2 + 29, H / 2 + 14);
        const dataS = sctx.getImageData(0, 0, W, H).data;

        const cells: number[] = [];
        const cellMeta: number[] = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = Math.floor(c * GRAIN + GRAIN / 2);
            const y = Math.floor(r * GRAIN + GRAIN / 2);
            const idx = (y * W + x) * 4;
            if (dataM[idx + 3] > 40) {
              cells.push(r * cols + c);
              cellMeta.push(0);
            } else if (dataS[idx + 3] > 40) {
              cells.push(r * cols + c);
              cellMeta.push(1);
            }
          }
        }
        return { cells, cellMeta };
      } else {
        const text = item.text;
        const fontSize = text.length > 16 ? 32 : 44;
        const off = document.createElement("canvas");
        off.width = W;
        off.height = H;
        const octx = off.getContext("2d");
        if (!octx) return { cells: [], cellMeta: null };
        octx.textAlign = "center";
        octx.textBaseline = "middle";
        octx.font = "800 " + fontSize + "px system-ui, sans-serif";
        try {
          octx.letterSpacing = "5px";
        } catch {
          /* noop */
        }
        octx.fillStyle = "#fff";
        const wordsArr = text.split(" ");
        if (wordsArr.length > 1) {
          const mid = Math.ceil(wordsArr.length / 2);
          const line1 = wordsArr.slice(0, mid).join(" ");
          const line2 = wordsArr.slice(mid).join(" ");
          const lineH = fontSize * 1.3;
          octx.fillText(line1, W / 2, H / 2 - lineH * 0.55);
          octx.fillText(line2, W / 2, H / 2 + lineH * 0.55);
        } else {
          octx.fillText(text, W / 2, H / 2);
        }
        const data = octx.getImageData(0, 0, W, H).data;
        const cells: number[] = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = Math.floor(c * GRAIN + GRAIN / 2);
            const y = Math.floor(r * GRAIN + GRAIN / 2);
            if (data[(y * W + x) * 4 + 3] > 40) cells.push(r * cols + c);
          }
        }
        return { cells, cellMeta: null };
      }
    };

    let currentData: SampledWord = { cells: [], cellMeta: null };
    const mask = new Uint8Array(cols * rows);
    const pileMask = new Uint8Array(cols * rows);
    let grains: Grain[] = [];
    let phase: "reform" | "reforming" | "holding" | "eroding" = "reform";
    let phaseTime = 0;
    let currentColors: [string, string] = WORDS[0].colors;
    let currentColors2: [string, string] | null = WORDS[0].colors2 || null;
    let queue: number[] = [];
    const fallingGrains: FallingGrain[] = [];

    const cellIndex = (c: number, r: number): number => {
      return r * cols + c;
    };

    const isPileSolid = (c: number, r: number): boolean => {
      if (c < 0 || c >= cols || r >= rows) return r >= rows;
      return pileMask[cellIndex(c, r)] === 1;
    };

    const beginReform = (data: SampledWord, item: WordConfig) => {
      grains = [];
      currentColors = item.colors;
      currentColors2 = item.colors2 || null;
      const targetCells = data.cells;
      const pileCells: number[] = [];
      for (let i = 0; i < pileMask.length; i++)
        if (pileMask[i] === 1) pileCells.push(i);
      pileCells.sort((a, b) => Math.floor(b / cols) - Math.floor(a / cols));
      const sortedTargets = targetCells
        .slice()
        .sort((a, b) => Math.floor(b / cols) - Math.floor(a / cols));

      const n = Math.max(pileCells.length, sortedTargets.length);
      for (let i = 0; i < n; i++) {
        const fromIdx = pileCells[i % Math.max(pileCells.length, 1)];
        const tIdx = sortedTargets[i % sortedTargets.length];
        const tr = Math.floor(tIdx / cols);
        const tc = tIdx % cols;
        let sx: number, sy: number;
        if (pileCells.length > 0 && fromIdx !== undefined) {
          sx = (fromIdx % cols) * GRAIN;
          sy = Math.floor(fromIdx / cols) * GRAIN;
          pileMask[fromIdx] = 0;
        } else {
          sx = Math.random() * W;
          sy = H + Math.random() * 40;
        }
        const meta = data.cellMeta ? data.cellMeta[i % data.cells.length] : null;
        grains.push({
          sx,
          sy,
          tx: tc * GRAIN + GRAIN / 2,
          ty: tr * GRAIN + GRAIN / 2,
          delay: Math.random() * 0.5,
          dur: 0.9 + Math.random() * 0.4,
          wobble: (Math.random() - 0.5) * 30,
          phase: Math.random() * Math.PI * 2,
          t: 0,
          colorGroup: meta,
        });
      }
      pileMask.fill(0);
      phase = "reforming";
      phaseTime = 0;
    };

    const beginErode = () => {
      mask.fill(0);
      currentData.cells.forEach((i) => (mask[i] = 1));
      queue = currentData.cells.slice();
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
      phase = "eroding";
      phaseTime = 0;
    };

    const settleGrain = (g: FallingGrain) => {
      let c = Math.round(g.x / GRAIN);
      let r = Math.round(g.y / GRAIN);
      r = Math.min(r, rows - 1);
      while (r > 0 && !isPileSolid(c, r + 1)) r++;
      if (!isPileSolid(c - 1, r) && Math.random() > 0.5) c = c - 1;
      else if (!isPileSolid(c + 1, r) && Math.random() > 0.5) c = c + 1;
      c = Math.max(0, Math.min(cols - 1, c));
      while (r > 0 && isPileSolid(c, r)) r--;
      pileMask[cellIndex(c, r)] = 1;
    };


    const relaxPile = () => {
      for (let pass = 0; pass < 3; pass++) {
        const ltr = pass % 2 === 0;
        for (let r = rows - 2; r >= 0; r--) {
          for (let ci = 0; ci < cols; ci++) {
            const c = ltr ? ci : cols - 1 - ci;
            const idx = cellIndex(c, r);
            if (pileMask[idx] !== 1) continue;
            if (!isPileSolid(c, r + 1)) {
              pileMask[cellIndex(c, r + 1)] = 1;
              pileMask[idx] = 0;
              continue;
            }
            const pl = Math.random() > 0.5;
            const f = pl ? c - 1 : c + 1;
            const s = pl ? c + 1 : c - 1;
            if (f >= 0 && f < cols && !isPileSolid(f, r + 1)) {
              pileMask[cellIndex(f, r + 1)] = 1;
              pileMask[idx] = 0;
            } else if (s >= 0 && s < cols && !isPileSolid(s, r + 1)) {
              pileMask[cellIndex(s, r + 1)] = 1;
              pileMask[idx] = 0;
            }
          }
        }
      }
    };

    const drawSolidText = (item: WordConfig) => {
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (item.dual && item.text === "MS") {
        const fontSize = 130;
        ctx.font = "800 " + fontSize + "px Georgia, serif";

        ctx.shadowBlur = 40;
        ctx.shadowColor = item.colors[1];
        ctx.globalAlpha = 0.25;
        const gradM = ctx.createLinearGradient(
          W / 2 - 110,
          H / 2 - 65,
          W / 2 - 10,
          H / 2 + 65
        );
        gradM.addColorStop(0, item.colors[0]);
        gradM.addColorStop(1, item.colors[1]);
        ctx.fillStyle = gradM;
        ctx.fillText("M", W / 2 - 29, H / 2 + 6);

        const colors2 = item.colors2 || item.colors;
        ctx.shadowColor = colors2[1];
        const gradS = ctx.createLinearGradient(
          W / 2 + 10,
          H / 2 - 65,
          W / 2 + 110,
          H / 2 + 65
        );
        gradS.addColorStop(0, colors2[0]);
        gradS.addColorStop(1, colors2[1]);
        ctx.fillStyle = gradS;
        ctx.fillText("S", W / 2 + 29, H / 2 + 14);

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        ctx.fillStyle = gradM;
        ctx.fillText("M", W / 2 - 29, H / 2 + 6);
        ctx.fillStyle = gradS;
        ctx.fillText("S", W / 2 + 29, H / 2 + 14);
      } else {
        const text = item.text;
        const fontSize = text.length > 16 ? 32 : 44;
        ctx.font = "800 " + fontSize + "px system-ui, sans-serif";
        try {
          ctx.letterSpacing = "5px";
        } catch {
          /* noop */
        }

        const grad = ctx.createLinearGradient(0, H / 2 - fontSize, W, H / 2 + fontSize);
        grad.addColorStop(0, item.colors[0]);
        grad.addColorStop(1, item.colors[1]);
        ctx.fillStyle = grad;

        const wordsArr = text.split(" ");
        if (wordsArr.length > 1) {
          const mid = Math.ceil(wordsArr.length / 2);
          const line1 = wordsArr.slice(0, mid).join(" ");
          const line2 = wordsArr.slice(mid).join(" ");
          const lineH = fontSize * 1.3;

          ctx.shadowBlur = 28;
          ctx.shadowColor = item.colors[1];
          ctx.globalAlpha = 0.3;
          ctx.fillText(line1, W / 2, H / 2 - lineH * 0.55);
          ctx.fillText(line2, W / 2, H / 2 + lineH * 0.55);
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
          ctx.fillText(line1, W / 2, H / 2 - lineH * 0.55);
          ctx.fillText(line2, W / 2, H / 2 + lineH * 0.55);
        } else {
          ctx.shadowBlur = 28;
          ctx.shadowColor = item.colors[1];
          ctx.globalAlpha = 0.3;
          ctx.fillText(text, W / 2, H / 2);
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
          ctx.fillText(text, W / 2, H / 2);
        }
      }
      ctx.restore();
    };

    const ease = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };


    let last = performance.now();

    const frame = (now: number) => {
      if (cancelled) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      phaseTime += dt;
      ctx.clearRect(0, 0, W, H);

      if (phase === "reforming") {
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++) {
            if (pileMask[cellIndex(c, r)] === 1) {
              ctx.fillStyle = pileColor();
              ctx.fillRect(c * GRAIN, r * GRAIN, 2.4, 2.4);
            }
          }
        let allDone = true;
        for (const g of grains) {
          const lt = phaseTime - g.delay;
          if (lt <= 0) {
            allDone = false;
            continue;
          }
          const t = Math.min(lt / g.dur, 1);
          const e = ease(t);
          const arc = Math.sin(e * Math.PI);
          const x = g.sx + (g.tx - g.sx) * e + Math.sin(e * Math.PI * 2 + g.phase) * g.wobble * arc;
          const y = g.sy + (g.ty - g.sy) * e - arc * 60;
          const col =
            g.colorGroup === 1 && currentColors2
              ? colorFor(currentColors2, t)
              : colorFor(currentColors, t);
          ctx.fillStyle = col;
          ctx.fillRect(x, y, 2.4, 2.4);
          if (t < 1) allDone = false;
        }
        if (allDone) {
          phase = "holding";
          phaseTime = 0;
        }
      } else if (phase === "holding") {
        drawSolidText(WORDS[wordIndex]);
        if (phaseTime > 1.6) beginErode();
      } else if (phase === "eroding") {
        for (let i = 0; i < currentData.cells.length; i++) {
          const idx = currentData.cells[i];
          if (mask[idx] === 0) continue;
          const r = Math.floor(idx / cols);
          const c = idx % cols;
          const col =
            currentData.cellMeta && currentData.cellMeta[i] === 1 && currentColors2
              ? colorFor(currentColors2, 0.5 + Math.sin(idx * 0.3) * 0.15)
              : colorFor(currentColors, 0.5 + Math.sin(idx * 0.3) * 0.15);
          ctx.fillStyle = col;
          ctx.fillRect(c * GRAIN, r * GRAIN, 2.4, 2.4);
        }
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++) {
            if (pileMask[cellIndex(c, r)] === 1) {
              ctx.fillStyle = pileColor();
              ctx.fillRect(c * GRAIN, r * GRAIN, 2.4, 2.4);
            }
          }
        for (const g of fallingGrains) {
          ctx.fillStyle = colorFor(currentColors, 0.7);
          ctx.fillRect(g.x, g.y, 2.4, 2.4);
        }
        for (let i = 0; i < 400 && queue.length > 0; i++) {
          const qi = Math.floor(Math.random() * queue.length);
          const cellIdx = queue[qi];
          if (mask[cellIdx] === 0) {
            queue.splice(qi, 1);
            continue;
          }
          if (Math.random() < 0.05) {
            mask[cellIdx] = 0;
            const r = Math.floor(cellIdx / cols);
            const c = cellIdx % cols;
            fallingGrains.push({ x: c * GRAIN, y: r * GRAIN, vx: (Math.random() - 0.5) * 40, vy: 0 });
            queue.splice(qi, 1);
          }
        }
        relaxPile();
        for (let i = fallingGrains.length - 1; i >= 0; i--) {
          const g = fallingGrains[i];
          g.vy += 900 * dt;
          g.x += g.vx * dt;
          g.y += g.vy * dt;
          const c = Math.floor(g.x / GRAIN);
          const nr = Math.floor((g.y + GRAIN) / GRAIN);
          if (nr >= rows || isPileSolid(c, nr)) {
            settleGrain(g);
            fallingGrains.splice(i, 1);
          }
        }
        if (queue.length === 0 && fallingGrains.length === 0) {
          wordIndex = (wordIndex + 1) % WORDS.length;
          currentData = sampleWord(WORDS[wordIndex]);
          beginReform(currentData, WORDS[wordIndex]);
        }
      }
      rafId = requestAnimationFrame(frame);
    };

    currentData = sampleWord(WORDS[0]);
    beginReform(currentData, WORDS[0]);
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{ width, height, background: "transparent" }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0"
        aria-hidden="true"
      />
    </div>
  );
}
