"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let x = 0;
    let y = 0;

    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(30, 60, 150, 0.25), transparent 80%)`;
          }
          rafId = 0;
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-40 hidden md:block"
    />
  );
}
