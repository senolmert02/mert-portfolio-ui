"use client";

import { RefObject, useEffect, useRef } from "react";
import type { HandPoint } from "../lib/useHandTracker";

type Props = {
  text: string;
  className?: string;
  pointsRef: RefObject<HandPoint[]>;
  active: boolean;
  maxWidth?: number;
  gradient?: boolean;
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

type CharData = {
  span: HTMLSpanElement;
  particles: Particle[];
  fade: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
};

const SAMPLE_STEP = 2;
const PUSH_RADIUS = 85;
const CHAR_PAD = 22;
const PUSH_STRENGTH = 1.9;
const SPRING = 0.09;
const DAMP = 0.82;
const JITTER = 0.18;
const REST_EPS = 0.4;
const CANVAS_PAD = 130;
const FADE_SPEED = 0.13;

function parseColor(s: string): { a: number } | null {
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  return { a: parts[3] === undefined ? 1 : parts[3] };
}

export default function SandText({
  text,
  className,
  pointsRef,
  active,
  maxWidth,
  gradient,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const charsRef = useRef<CharData[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1, pad: CANVAS_PAD });

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
      while (measure.firstChild) measure.removeChild(measure.firstChild);
      const chars: CharData[] = [];
      for (const ch of text) {
        const span = document.createElement("span");
        span.textContent = ch;
        measure.appendChild(span);
        chars.push({
          span,
          particles: [],
          fade: 0,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        });
      }

      const cs = window.getComputedStyle(measure);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const textW = Math.max(1, measure.offsetWidth);
      const textH = Math.max(1, measure.offsetHeight);
      const pad = CANVAS_PAD;
      const w = textW + pad * 2;
      const h = textH + pad * 2;
      sizeRef.current = { w, h, dpr, pad };

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.left = `-${pad}px`;
      canvas.style.top = `-${pad}px`;
      off.width = w * dpr;
      off.height = h * dpr;

      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        c.left = c.span.offsetLeft + pad;
        c.top = c.span.offsetTop + pad;
        c.right = c.left + c.span.offsetWidth;
        c.bottom = c.top + c.span.offsetHeight;
      }

      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.clearRect(0, 0, w, h);

      const fontPx = parseFloat(cs.fontSize);
      const lhComputed = cs.lineHeight;
      const lineHeight =
        lhComputed === "normal" || !lhComputed
          ? fontPx * 1.2
          : parseFloat(lhComputed);

      offCtx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      offCtx.textBaseline = "top";
      offCtx.textAlign = "left";

      const color = parseColor(cs.color);
      const useGradient = gradient || !color || color.a === 0;
      if (useGradient) {
        const grad = offCtx.createLinearGradient(pad, 0, pad + textW, 0);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.5, "#e5e7eb");
        grad.addColorStop(1, "#9ca3af");
        offCtx.fillStyle = grad;
      } else {
        offCtx.fillStyle = cs.color;
      }

      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        const yPad = (lineHeight - fontPx) / 2;
        offCtx.fillText(c.span.textContent || "", c.left, c.top + yPad);
      }

      const img = offCtx.getImageData(0, 0, w * dpr, h * dpr);
      const data = img.data;
      const step = SAMPLE_STEP * dpr;

      for (let y = 0; y < h * dpr; y += step) {
        for (let x = 0; x < w * dpr; x += step) {
          const i = (y * w * dpr + x) * 4;
          if (data[i + 3] > 128) {
            const px = x / dpr;
            const py = y / dpr;
            for (let ci = 0; ci < chars.length; ci++) {
              const c = chars[ci];
              if (
                px >= c.left &&
                px < c.right &&
                py >= c.top &&
                py < c.bottom
              ) {
                c.particles.push({
                  ox: px,
                  oy: py,
                  x: px,
                  y: py,
                  vx: 0,
                  vy: 0,
                  r: data[i],
                  g: data[i + 1],
                  b: data[i + 2],
                });
                break;
              }
            }
          }
        }
      }
      charsRef.current = chars;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(container);
    window.addEventListener("resize", rebuild);

    let rafId = 0;

    const render = () => {
      const { w, h, dpr } = sizeRef.current;
      const hands = active ? pointsRef.current : [];
      const canvasRect = canvas.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const localHands: { x: number; y: number }[] = [];
      for (let i = 0; i < hands.length; i++) {
        const hx = hands[i].x * vw - canvasRect.left;
        const hy = hands[i].y * vh - canvasRect.top;
        localHands.push({ x: hx, y: hy });
      }

      const chars = charsRef.current;
      const r2 = PUSH_RADIUS * PUSH_RADIUS;
      const ds = SAMPLE_STEP - 0.1;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (let ci = 0; ci < chars.length; ci++) {
        const c = chars[ci];
        if (c.particles.length === 0) continue;

        let nearHand = false;
        for (let j = 0; j < localHands.length; j++) {
          const lh = localHands[j];
          if (
            lh.x > c.left - CHAR_PAD &&
            lh.x < c.right + CHAR_PAD &&
            lh.y > c.top - CHAR_PAD &&
            lh.y < c.bottom + CHAR_PAD
          ) {
            nearHand = true;
            break;
          }
        }

        let displaced = false;
        for (let i = 0; i < c.particles.length; i += 6) {
          const p = c.particles[i];
          if (Math.abs(p.x - p.ox) + Math.abs(p.y - p.oy) > REST_EPS) {
            displaced = true;
            break;
          }
        }

        const target = nearHand || displaced ? 1 : 0;
        c.fade += (target - c.fade) * FADE_SPEED;
        if (Math.abs(target - c.fade) < 0.01) c.fade = target;
        c.span.style.opacity = (1 - c.fade).toFixed(3);

        if (c.fade < 0.01 && !nearHand && !displaced) continue;

        for (let i = 0; i < c.particles.length; i++) {
          const p = c.particles[i];
          if (nearHand || displaced) {
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
          }
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${c.fade.toFixed(3)})`;
          ctx.fillRect(p.x, p.y, ds, ds);
        }
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", rebuild);
    };
  }, [text, active, pointsRef, maxWidth, gradient]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      style={{ maxWidth: maxWidth ? `${maxWidth}px` : undefined }}
    >
      <span
        ref={measureRef}
        className={className}
        style={{
          whiteSpace: maxWidth ? "normal" : "nowrap",
          display: "inline-block",
          position: "relative",
          maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        }}
        aria-label={text}
      />
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        aria-hidden
      />
    </div>
  );
}
