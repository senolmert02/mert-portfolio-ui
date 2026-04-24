"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CvButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="fixed top-6 right-24 z-50"
    >
      <Link
        href="/cv"
        className="inline-block bg-gray-900/80 md:bg-white/10 md:backdrop-blur-sm border border-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition"
      >
        CV
      </Link>
    </motion.div>
  );
}
