"use client";

import { RefObject, useEffect, useRef } from "react";
import type { GestureState } from "../lib/useGesture";

type Stroke = {
  points: { x: number; y: number }[];
  startTime: number;
};

const LIFETIME = 5000;
const FADE_DURATION = 1500;
const MIN_DIST = 0.002;
const GAP_MS = 200;

type Props = {
  gestureRef: RefObject<GestureState>;
  active: boolean;
};

export default function DrawingCanvas({ gestureRef, active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const strokes: Stroke[] = [];
    let currentStroke: Stroke | null = null;
    let lastDrawTime = 0;
    let rafId = 0;

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const now = performance.now();
      const state = gestureRef.current;

      if (state.mode === "draw" && state.indexPoint) {
        if (!currentStroke || now - lastDrawTime > GAP_MS) {
          currentStroke = { points: [], startTime: now };
          strokes.push(currentStroke);
        }
        const pts = currentStroke.points;
        const lastP = pts[pts.length - 1];
        if (
          !lastP ||
          Math.abs(state.indexPoint.x - lastP.x) +
            Math.abs(state.indexPoint.y - lastP.y) >
            MIN_DIST
        ) {
          pts.push({ x: state.indexPoint.x, y: state.indexPoint.y });
          lastDrawTime = now;
        }
      } else {
        currentStroke = null;
      }

      for (let i = strokes.length - 1; i >= 0; i--) {
        const age = now - strokes[i].startTime;
        if (age > LIFETIME + FADE_DURATION) strokes.splice(i, 1);
      }

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 6;
      ctx.shadowColor = "rgba(59, 130, 246, 0.6)";
      ctx.shadowBlur = 10;
      for (const s of strokes) {
        const age = now - s.startTime;
        let alpha = 1;
        if (age > LIFETIME) {
          alpha = 1 - (age - LIFETIME) / FADE_DURATION;
        }
        if (alpha <= 0) continue;
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.beginPath();
        for (let i = 0; i < s.points.length; i++) {
          const p = s.points[i];
          if (i === 0) ctx.moveTo(p.x * w, p.y * h);
          else ctx.lineTo(p.x * w, p.y * h);
        }
        ctx.stroke();
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [active, gestureRef]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      aria-hidden
    />
  );
}
