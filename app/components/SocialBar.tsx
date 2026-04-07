"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SocialBar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="fixed left-8 bottom-0 z-50 hidden md:flex flex-col items-center gap-6"
    >
      <a href="https://github.com/senolmert02" target="_blank" className="text-gray-500 hover:text-white transition hover:scale-125">
        <FaGithub size={20} />
      </a>
      <a href="https://www.linkedin.com/in/%C5%9Fenol-mert-%C5%9Far-86140a261" target="_blank" className="text-gray-500 hover:text-white transition hover:scale-125">
        <FaLinkedin size={20} />
      </a>
      <a href="mailto:sarsenolmert@gmail.com" className="text-gray-500 hover:text-white transition hover:scale-125">
        <FaEnvelope size={20} />
      </a>
      <div className="w-[1px] h-24 bg-gray-700" />
    </motion.div>
  );
}
