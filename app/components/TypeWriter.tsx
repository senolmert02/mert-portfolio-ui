"use client";

import { motion } from "framer-motion";

export default function TypeWriter({ text }: { text: string }) {
  return (
    <span>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: i * 0.08 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
