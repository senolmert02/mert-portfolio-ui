"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TypeWriter from "./TypeWriter";
import Link from "next/link";
import { useLang } from "../lib/LanguageContext";

export default function Hero() {
  const { t } = useLang();
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-400 mb-4 tracking-widest uppercase"
        >
          {t.hero.greeting}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent text-center"
        >
          Şenol Mert Şar
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="text-2xl text-gray-400 mb-8"
        >
          <TypeWriter text={t.hero.title} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-8"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-lg text-center text-gray-500 mb-12 text-lg leading-relaxed"
        >
          {t.hero.description}
        </motion.p>
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
            {t.hero.projects}
          </Link>
          <a
            href="#iletisim"
            className="border border-gray-600 px-8 py-4 rounded-full font-medium hover:border-white transition hover:scale-105"
          >
            {t.hero.contact}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity }}
        className="absolute bottom-10 z-10"
      >
        <span className="text-gray-600 text-sm tracking-widest">{t.hero.scroll}</span>
      </motion.div>
    </section>
  );
}
