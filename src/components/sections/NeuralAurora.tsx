"use client";

import { useEffect, useRef } from "react";

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

export default function NeuralAurora() {
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let W=0, H=0;
    let ctx: CanvasRenderingContext2D;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      const context = canvas.getContext("2d");
      if (!context) return;
      ctx = context;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const N  = () => (W < 768 ? 35 : 60);
    const PAD = 70;

    /* state */
    let nodes: Nd[] = [];
    let edges: Ed[] = [];
    let pulses: Pu[] = [];
    let pDone = 0;
    let phase: Phase = "blank";
    let phaseT = 0;

    function spawnNodes() {
      nodes = Array.from({ length: N() }, (_,i) => ({
        x: PAD+Math.random()*(W-2*PAD), y: PAD+Math.random()*(H-2*PAD),
        sx:0, sy:0, tx:0, ty:0,
        ci: i % PAL.length, op: 0,
      }));
    }

    function buildEdges() {
      const seen = new Set<string>();
      edges = [];
      nodes.forEach((n,i) => {
        nodes
          .map((o,j)=>({j,d:Math.hypot(n.x-o.x,n.y-o.y)}))
          .filter(e=>e.j!==i).sort((a,b)=>a.d-b.d).slice(0,2)
          .forEach(({j})=>{
            const k=i<j?`${i}-${j}`:`${j}-${i}`;
            if(!seen.has(k)){seen.add(k);edges.push({a:i,b:j,prog:0,op:0});}
          });
      });
    }

    function enter(p:Phase){
      phase=p; phaseT=0;
      if(p==="appear") nodes.forEach(n=>n.op=0);
      if(p==="connect"){ buildEdges(); edges.forEach(e=>{e.prog=0;e.op=0;}); }
      if(p==="pulse"){ pDone=0; pulses=[]; }
      if(p==="move") nodes.forEach(n=>{
        n.sx=n.x; n.sy=n.y;
        n.tx=PAD+Math.random()*(W-2*PAD);
        n.ty=PAD+Math.random()*(H-2*PAD);
      });
    }

    /* ── draw helpers ── */
    function drawNode(n:Nd) {
      if(n.op<=0) return;
      const [r,g,b]=PAL[n.ci];
      // outer halo
      const go=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,14);
      go.addColorStop(0,  `rgba(${r},${g},${b},${n.op*.35})`);
      go.addColorStop(.45,`rgba(${r},${g},${b},${n.op*.08})`);
      go.addColorStop(1,  `rgba(${r},${g},${b},0)`);
      ctx.beginPath(); ctx.arc(n.x,n.y,14,0,Math.PI*2);
      ctx.fillStyle=go; ctx.fill();
      // bright core
      const gc=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,3.5);
      gc.addColorStop(0, `rgba(255,255,255,${n.op*.8})`);
      gc.addColorStop(.5,`rgba(${r},${g},${b},${n.op*.8})`);
      gc.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath(); ctx.arc(n.x,n.y,3.5,0,Math.PI*2);
      ctx.fillStyle=gc; ctx.fill();
    }

    function drawEdge(e:Ed) {
      if(e.op<=0||e.prog<=0) return;
      const {x:ax,y:ay}=nodes[e.a], {x:bx,y:by}=nodes[e.b];
      // glow line (draw twice: soft thick + sharp thin)
      [[3, .008],[1, .28]].forEach(([lw,a])=>{
        ctx.beginPath();
        ctx.moveTo(ax,ay);
        ctx.lineTo(lerp(ax,bx,e.prog),lerp(ay,by,e.prog));
        ctx.strokeStyle=`rgba(100,180,255,${e.op*(a as number)})`;
        ctx.lineWidth=lw as number;
        ctx.stroke();
      });
    }

    function drawOrb(x:number,y:number,op:number,scale=1){
      // layered glow
      [[40,.10],[24,.25],[13,.55]].forEach(([rad,a])=>{
        const g=ctx.createRadialGradient(x,y,0,x,y,(rad as number)*scale);
        g.addColorStop(0,`rgba(34,211,238,${(a as number)*op})`);
        g.addColorStop(1,`rgba(34,211,238,0)`);
        ctx.beginPath(); ctx.arc(x,y,(rad as number)*scale,0,Math.PI*2);
        ctx.fillStyle=g; ctx.fill();
      });
      // white-hot core
      const gc=ctx.createRadialGradient(x,y,0,x,y,7*scale);
      gc.addColorStop(0,`rgba(255,255,255,${op})`);
      gc.addColorStop(.6,`rgba(34,211,238,${op*.9})`);
      gc.addColorStop(1,`rgba(34,211,238,0)`);
      ctx.beginPath(); ctx.arc(x,y,7*scale,0,Math.PI*2);
      ctx.fillStyle=gc; ctx.fill();
    }

    function getPulsePos(p:Pu){
      const e=edges[p.ei];
      if(!e) return {x:0,y:0};
      return {
        x: lerp(nodes[e.a].x, nodes[e.b].x, p.t),
        y: lerp(nodes[e.a].y, nodes[e.b].y, p.t),
      };
    }

    /* ── tick ── */
    let last=performance.now(), raf=0;

    function tick(now:number){
      const dt=Math.min((now-last)/1000,.05);
      last=now; phaseT+=dt;
      ctx.clearRect(0,0,W,H);

      /* phase transitions */
      switch(phase){
        case "blank":   if(phaseT>DUR.blank)   enter("appear");     break;
        case "appear":
          nodes.forEach((n,i)=>{ n.op=clamp((phaseT-(i/nodes.length)*.7)/.4); });
          if(phaseT>DUR.appear) enter("connect");
          break;
        case "connect":
          edges.forEach((e,i)=>{
            const d=(i/edges.length)*1.0;
            const p=clamp((phaseT-d)/.5);
            e.prog=ease(p); e.op=p;
          });
          if(phaseT>DUR.connect) enter("pulse");
          break;
        case "pulse":
          // spawn one pulse at a time
          if(pulses.filter(p=>!p.burst||p.burstT<.6).length===0 && pDone<PULSES_PER_ROUND){
            if(edges.length>0)
              pulses.push({ ei:Math.floor(Math.random()*edges.length), t:0, burstT:0, burst:false, trail:[] });
          }
          pulses.forEach(p=>{
            if(p.burst){ p.burstT+=dt; return; }
            const {x,y}=getPulsePos(p);
            p.trail.push({x,y});
            if(p.trail.length>10) p.trail.shift();
            p.t+=dt*.5;
            if(p.t>=1){ p.t=1; p.burst=true; pDone++; }
          });
          if(pDone>=PULSES_PER_ROUND && pulses.every(p=>p.burstT>.6))
            enter("disconnect");
          break;
        case "disconnect":
          edges.forEach(e=>{ e.op=clamp(1-phaseT/DUR.disconnect); });
          if(phaseT>DUR.disconnect) enter("move");
          break;
        case "move":{
          const t=ease(clamp(phaseT/DUR.move));
          nodes.forEach(n=>{ n.x=lerp(n.sx,n.tx,t); n.y=lerp(n.sy,n.ty,t); });
          if(phaseT>DUR.move) enter("connect");
          break;
        }
      }

      /* draw order: edges → pulses → nodes */
      edges.forEach(drawEdge);

      pulses.forEach(p=>{
        if(!edges[p.ei]) return;

        if(!p.burst){
          // trail
          p.trail.forEach(({x,y},i)=>{
            const a=((i+1)/p.trail.length);
            const g=ctx.createRadialGradient(x,y,0,x,y,12*a);
            g.addColorStop(0,`rgba(34,211,238,${a*.35})`);
            g.addColorStop(1,`rgba(34,211,238,0)`);
            ctx.beginPath(); ctx.arc(x,y,12*a,0,Math.PI*2);
            ctx.fillStyle=g; ctx.fill();
          });
          // orb
          const {x,y}=getPulsePos(p);
          drawOrb(x,y,1);
        } else {
          // destination burst: expand + fade
          const k=clamp(p.burstT/.6);
          const {x,y}=getPulsePos(p);
          drawOrb(x,y,1-k, 1+k*2.5);
        }
      });

      nodes.forEach(drawNode);

      raf=requestAnimationFrame(tick);
    }

    spawnNodes();
    raf=requestAnimationFrame(tick);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, []);

  return (
    <>
      {/* soft aurora backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:[
            "radial-gradient(ellipse 72% 55% at 16% 26%, rgba(139,92,246,0.18) 0%,transparent 60%)",
            "radial-gradient(ellipse 55% 50% at 84% 18%, rgba(59,130,246,0.15) 0%,transparent 55%)",
            "radial-gradient(ellipse 62% 45% at 66% 80%, rgba(34,211,238,0.13) 0%,transparent 55%)",
            "radial-gradient(ellipse 48% 42% at 26% 84%, rgba(236,72,153,0.10) 0%,transparent 50%)",
          ].join(","),
        }}
      />
      <canvas
        ref={cvs}
        style={{ position:"absolute",inset:0,width:"100%",height:"100%",display:"block",pointerEvents:"none" }}
      />
    </>
  );
}
