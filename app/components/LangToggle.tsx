"use client";

import { useLang } from "../lib/LanguageContext";
import { motion } from "framer-motion";

export default function LangToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      onClick={toggleLang}
      className="fixed top-6 right-8 z-50 bg-gray-900/80 md:bg-white/10 md:backdrop-blur-sm border border-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition cursor-pointer"
    >
      {lang === "tr" ? "EN" : "TR"}
    </motion.button>
  );
}
