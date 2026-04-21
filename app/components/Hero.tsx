"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import TypeWriter from "./TypeWriter";
import SandText from "./SandText";
import HandCursor from "./HandCursor";
import DrawingCanvas from "./DrawingCanvas";
import HandInfoToast from "./HandInfoToast";
import Link from "next/link";
import { useLang } from "../lib/LanguageContext";
import { useHandTracker } from "../lib/useHandTracker";
import { useGesture } from "../lib/useGesture";

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { enabled: handEnabled, pointsRef, handsRef } = useHandTracker(
    isDesktop && inView,
  );

  const onSwipeUp = useCallback(() => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  const gestureRef = useGesture(handsRef, handEnabled && inView, onSwipeUp);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-black to-black" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-800/15 rounded-full blur-3xl hidden md:block" />

      <motion.div
        style={
          isDesktop
            ? { y, opacity, scale, willChange: "transform, opacity", transform: "translateZ(0)" }
            : undefined
        }
        className="flex flex-col items-center relative z-10"
      >
        {handEnabled ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <SandText
              text={t.hero.greeting}
              className="text-lg tracking-widest uppercase"
              pointsRef={pointsRef}
              active={handEnabled}
            />
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-400 mb-4 tracking-widest uppercase"
          >
            {t.hero.greeting}
          </motion.p>
        )}
        {handEnabled ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6"
          >
            <SandText
              text="Şenol Mert Şar"
              className="text-5xl md:text-7xl font-bold text-white"
              pointsRef={pointsRef}
              active={handEnabled}
              gradient
            />
          </motion.div>
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent text-center"
          >
            Şenol Mert Şar
          </motion.h1>
        )}
        {handEnabled ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="mb-8"
          >
            <SandText
              text={t.hero.title}
              className="text-2xl"
              pointsRef={pointsRef}
              active={handEnabled}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="text-2xl text-gray-400 mb-8"
          >
            <TypeWriter text={t.hero.title} />
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-8"
        />
        {handEnabled ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-12"
          >
            <SandText
              text={t.hero.description}
              className="text-lg leading-relaxed text-center"
              pointsRef={pointsRef}
              active={handEnabled}
              maxWidth={512}
            />
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-lg text-center text-gray-500 mb-12 text-lg leading-relaxed"
          >
            {t.hero.description}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex gap-4"
        >
          <Link
            href="/projeler"
            className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition hover:scale-105"
          >
            {handEnabled ? (
              <SandText
                text={t.hero.projects}
                className="font-medium text-black"
                pointsRef={pointsRef}
                active={handEnabled}
              />
            ) : (
              t.hero.projects
            )}
          </Link>
          <a
            href="#iletisim"
            className="border border-gray-600 px-8 py-4 rounded-full font-medium hover:border-white transition hover:scale-105"
          >
            {handEnabled ? (
              <SandText
                text={t.hero.contact}
                className="font-medium text-white"
                pointsRef={pointsRef}
                active={handEnabled}
              />
            ) : (
              t.hero.contact
            )}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity }}
        className="absolute bottom-10 z-10"
      >
        <span className="text-gray-600 text-2xl">↓</span>
      </motion.div>

      <DrawingCanvas gestureRef={gestureRef} active={handEnabled && inView} />
      <HandCursor
        handsRef={handsRef}
        gestureRef={gestureRef}
        active={handEnabled && inView}
      />
      <HandInfoToast active={handEnabled && inView} />
    </section>
  );
}
