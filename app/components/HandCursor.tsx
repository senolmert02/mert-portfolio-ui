"use client";

import { RefObject, useEffect, useRef } from "react";
import type { HandLandmark } from "../lib/useHandTracker";
import type { GestureState } from "../lib/useGesture";

const FINGERTIPS = [4, 8, 12, 16, 20];
const INDEX = 8;

type Props = {
  handsRef: RefObject<HandLandmark[][]>;
  gestureRef: RefObject<GestureState>;
  active: boolean;
};

export default function HandCursor({ handsRef, gestureRef, active }: Props) {
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

    let rafId = 0;
    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const hands = handsRef.current;
      const mode = gestureRef.current.mode;
      const isDraw = mode === "draw";

      for (const hand of hands) {
        for (const idx of FINGERTIPS) {
          const lm = hand[idx];
          if (!lm) continue;
          const x = lm.x * w;
          const y = lm.y * h;
          const isIndex = idx === INDEX;
          const pink = isDraw && isIndex;
          const size = pink ? 36 : 26;
          const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
          if (pink) {
            grad.addColorStop(0, "rgba(249, 168, 212, 0.98)");
            grad.addColorStop(0.4, "rgba(236, 72, 153, 0.55)");
            grad.addColorStop(1, "rgba(219, 39, 119, 0)");
          } else {
            grad.addColorStop(0, "rgba(147, 197, 253, 0.95)");
            grad.addColorStop(0.4, "rgba(96, 165, 250, 0.45)");
            grad.addColorStop(1, "rgba(59, 130, 246, 0)");
          }
          ctx.fillStyle = grad;
          ctx.fillRect(x - size, y - size, size * 2, size * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.beginPath();
          ctx.arc(x, y, pink ? 5 : 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [active, handsRef, gestureRef]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      aria-hidden
    />
  );
}
