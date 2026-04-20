"use client";

import { RefObject, useEffect, useRef } from "react";
import type { HandPoint } from "../lib/useHandTracker";

type Props = {
  text: string;
  className?: string;
  pointsRef: RefObject<HandPoint[]>;
  active: boolean;
};

type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
};

const SAMPLE_STEP = 2;
const PUSH_RADIUS = 95;
const ACTIVATE_PAD = 90;
const PUSH_STRENGTH = 1.9;
const SPRING = 0.07;
const DAMP = 0.85;
const JITTER = 0.2;
const REST_EPS = 0.4;

export default function SandText({ text, className, pointsRef, active }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    const canvas = canvasRef.current;
    if (!container || !measure || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");
    if (!offCtx) return;

    const rebuild = () => {
      const rect = measure.getBoundingClientRect();
      const cs = window.getComputedStyle(measure);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.ceil(rect.width));
      const h = Math.max(1, Math.ceil(rect.height));
      sizeRef.current = { w, h, dpr };

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      off.width = w * dpr;
      off.height = h * dpr;

      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.clearRect(0, 0, w, h);
      const grad = offCtx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.5, "#e5e7eb");
      grad.addColorStop(1, "#9ca3af");
      offCtx.fillStyle = grad;
      offCtx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      offCtx.textBaseline = "alphabetic";
      offCtx.textAlign = "center";
      const fontPx = parseFloat(cs.fontSize);
      const baseline = h - (h - fontPx) / 2;
      offCtx.fillText(text, w / 2, baseline);

      const img = offCtx.getImageData(0, 0, w * dpr, h * dpr);
      const data = img.data;
      const step = SAMPLE_STEP * dpr;
      const parts: Particle[] = [];
      for (let y = 0; y < h * dpr; y += step) {
        for (let x = 0; x < w * dpr; x += step) {
          const i = (y * w * dpr + x) * 4;
          if (data[i + 3] > 128) {
            parts.push({
              ox: x / dpr,
              oy: y / dpr,
              x: x / dpr,
              y: y / dpr,
              vx: 0,
              vy: 0,
              r: data[i],
              g: data[i + 1],
              b: data[i + 2],
            });
          }
        }
      }
      particlesRef.current = parts;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(off, 0, 0);
    };

    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(container);
    window.addEventListener("resize", rebuild);

    let rafId = 0;
    let wasRest = true;

    const render = () => {
      const { w, h, dpr } = sizeRef.current;
      const hands = active ? pointsRef.current : [];
      const canvasRect = canvas.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let nearHand = false;
      const localHands: { x: number; y: number }[] = [];
      for (let i = 0; i < hands.length; i++) {
        const hx = hands[i].x * vw;
        const hy = hands[i].y * vh;
        if (
          hx > canvasRect.left - ACTIVATE_PAD &&
          hx < canvasRect.right + ACTIVATE_PAD &&
          hy > canvasRect.top - ACTIVATE_PAD &&
          hy < canvasRect.bottom + ACTIVATE_PAD
        ) {
          nearHand = true;
        }
        localHands.push({ x: hx - canvasRect.left, y: hy - canvasRect.top });
      }

      const parts = particlesRef.current;
      let displaced = false;
      for (let i = 0; i < parts.length; i += 30) {
        const p = parts[i];
        if (Math.abs(p.x - p.ox) + Math.abs(p.y - p.oy) > REST_EPS) {
          displaced = true;
          break;
        }
      }

      if (nearHand || displaced) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const r2 = PUSH_RADIUS * PUSH_RADIUS;
        const ds = SAMPLE_STEP - 0.1;
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i];
          for (let j = 0; j < localHands.length; j++) {
            const dx = p.x - localHands[j].x;
            const dy = p.y - localHands[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / PUSH_RADIUS) * PUSH_STRENGTH;
              p.vx += (dx / d) * f;
              p.vy += (dy / d) * f;
            }
          }
          p.vx += (p.ox - p.x) * SPRING + (Math.random() - 0.5) * JITTER;
          p.vy += (p.oy - p.y) * SPRING + (Math.random() - 0.5) * JITTER;
          p.vx *= DAMP;
          p.vy *= DAMP;
          p.x += p.vx;
          p.y += p.vy;
          ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
          ctx.fillRect(p.x, p.y, ds, ds);
        }
        wasRest = false;
      } else if (!wasRest) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(off, 0, 0);
        wasRest = true;
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", rebuild);
    };
  }, [text, active, pointsRef]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <span
        ref={measureRef}
        className={className}
        style={{ visibility: "hidden", whiteSpace: "nowrap" }}
        aria-hidden
      >
        {text}
      </span>
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 pointer-events-none"
        aria-label={text}
      />
    </div>
  );
}
