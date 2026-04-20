"use client";

import { RefObject, useEffect, useRef } from "react";
import type { HandLandmark } from "./useHandTracker";

export type GestureMode = "idle" | "draw" | "fourUp";

export type GestureState = {
  mode: GestureMode;
  indexPoint: { x: number; y: number } | null;
};

function extended(hand: HandLandmark[], tip: number, pip: number): boolean {
  return hand[tip].y < hand[pip].y - 0.02;
}

function folded(hand: HandLandmark[], tip: number, pip: number): boolean {
  return hand[tip].y > hand[pip].y;
}

function isDrawPose(hand: HandLandmark[]): boolean {
  return (
    extended(hand, 8, 6) &&
    folded(hand, 12, 10) &&
    folded(hand, 16, 14) &&
    folded(hand, 20, 18)
  );
}

function isFourUpPose(hand: HandLandmark[]): boolean {
  if (
    !(
      extended(hand, 8, 6) &&
      extended(hand, 12, 10) &&
      extended(hand, 16, 14) &&
      extended(hand, 20, 18)
    )
  ) {
    return false;
  }
  // thumb folded: thumb tip y > thumb ip y (landmark 4 vs 3)
  // also thumb tip x should be near the palm (between index_mcp and pinky_mcp)
  const thumbTip = hand[4];
  const indexMcp = hand[5];
  const pinkyMcp = hand[17];
  const minX = Math.min(indexMcp.x, pinkyMcp.x);
  const maxX = Math.max(indexMcp.x, pinkyMcp.x);
  return thumbTip.x >= minX - 0.03 && thumbTip.x <= maxX + 0.03;
}

export function useGesture(
  handsRef: RefObject<HandLandmark[][]>,
  active: boolean,
  onSwipeUp: () => void,
) {
  const stateRef = useRef<GestureState>({ mode: "idle", indexPoint: null });
  const onSwipeUpRef = useRef(onSwipeUp);

  useEffect(() => {
    onSwipeUpRef.current = onSwipeUp;
  }, [onSwipeUp]);

  useEffect(() => {
    if (!active) {
      stateRef.current = { mode: "idle", indexPoint: null };
      return;
    }

    let rafId = 0;
    const yHistory: { t: number; y: number }[] = [];
    let lastSwipeTime = 0;

    const loop = () => {
      const hands = handsRef.current;
      if (hands.length === 0) {
        stateRef.current = { mode: "idle", indexPoint: null };
        yHistory.length = 0;
      } else {
        const hand = hands[0];
        const now = performance.now();

        if (isDrawPose(hand)) {
          stateRef.current = {
            mode: "draw",
            indexPoint: { x: hand[8].x, y: hand[8].y },
          };
          yHistory.length = 0;
        } else if (isFourUpPose(hand)) {
          const wristY = hand[0].y;
          yHistory.push({ t: now, y: wristY });
          while (yHistory.length > 0 && now - yHistory[0].t > 500) {
            yHistory.shift();
          }
          if (yHistory.length >= 2) {
            const dy =
              yHistory[yHistory.length - 1].y - yHistory[0].y;
            if (dy < -0.22 && now - lastSwipeTime > 1500) {
              lastSwipeTime = now;
              onSwipeUpRef.current();
              yHistory.length = 0;
            }
          }
          stateRef.current = { mode: "fourUp", indexPoint: null };
        } else {
          stateRef.current = { mode: "idle", indexPoint: null };
          yHistory.length = 0;
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, [active, handsRef]);

  return stateRef;
}
