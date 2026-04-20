"use client";

import { useEffect, useRef, useState } from "react";
import type { HandLandmarker, NormalizedLandmark } from "@mediapipe/tasks-vision";

export type HandPoint = { x: number; y: number };
export type HandLandmark = { x: number; y: number; z: number };

const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task";

const FINGERTIPS = [4, 8, 12, 16, 20];
const SMOOTH = 0.45;

export function useHandTracker(active: boolean) {
  const [enabled, setEnabled] = useState(false);
  const pointsRef = useRef<HandPoint[]>([]);
  const handsRef = useRef<HandLandmark[][]>([]);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;
    if (!navigator.mediaDevices?.getUserMedia) return;

    let cancelled = false;
    let stream: MediaStream | null = null;
    let video: HTMLVideoElement | null = null;
    let rafId = 0;
    let landmarker: HandLandmarker | null = null;

    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: "user" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        video = document.createElement("video");
        video.srcObject = stream;
        video.playsInline = true;
        video.muted = true;
        await video.play();

        const vision = await import("@mediapipe/tasks-vision");
        const fileset = await vision.FilesetResolver.forVisionTasks(WASM_URL);
        landmarker = await vision.HandLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
          runningMode: "VIDEO",
          numHands: 2,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        if (cancelled) return;
        setEnabled(true);

        let lastTs = -1;
        const loop = () => {
          if (cancelled || !video || !landmarker) return;
          const ts = performance.now();
          if (video.readyState >= 2 && ts !== lastTs) {
            lastTs = ts;
            const res = landmarker.detectForVideo(video, ts);
            const rawHands: HandLandmark[][] = [];
            if (res.landmarks) {
              for (const hand of res.landmarks) {
                rawHands.push(
                  hand.map((lm: NormalizedLandmark) => ({
                    x: 1 - lm.x,
                    y: lm.y,
                    z: lm.z,
                  })),
                );
              }
            }
            const prev = handsRef.current;
            const smoothed: HandLandmark[][] = rawHands.map((hand, hi) => {
              const prevHand = prev[hi];
              if (!prevHand) return hand;
              return hand.map((lm, li) => {
                const pl = prevHand[li];
                if (!pl) return lm;
                return {
                  x: pl.x + (lm.x - pl.x) * SMOOTH,
                  y: pl.y + (lm.y - pl.y) * SMOOTH,
                  z: pl.z + (lm.z - pl.z) * SMOOTH,
                };
              });
            });
            handsRef.current = smoothed;
            const pts: HandPoint[] = [];
            for (const hand of smoothed) {
              for (const i of FINGERTIPS) {
                const lm = hand[i];
                if (lm) pts.push({ x: lm.x, y: lm.y });
              }
            }
            pointsRef.current = pts;
          }
          rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
      } catch {
        setEnabled(false);
      }
    };

    start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (landmarker) landmarker.close();
      if (video) {
        video.pause();
        video.srcObject = null;
      }
      if (stream) stream.getTracks().forEach((t) => t.stop());
      setEnabled(false);
      pointsRef.current = [];
      handsRef.current = [];
    };
  }, [active]);

  return { enabled, pointsRef, handsRef };
}
