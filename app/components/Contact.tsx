"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "../lib/LanguageContext";

export default function Contact() {
  const { t } = useLang();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const reveal = (delay: number, x = 0, y = 0) =>
    isDesktop
      ? {
          initial: { opacity: 0, x, y },
          whileInView: { opacity: 1, x: 0, y: 0 },
          transition: { duration: 0.6, delay },
          viewport: { once: true },
        }
      : {};

  return (
    <section
      id="iletisim"
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <motion.h2 {...reveal(0, 0, 20)} className="text-4xl font-bold mb-4 text-center">
        {t.contact.title}
      </motion.h2>
      <div className="mb-16" />

      <div className="flex flex-col items-center gap-8">
        <motion.div {...reveal(0.4, -100)}>
          <a href="https://github.com/senolmert02" target="_blank" className="flex items-center gap-4 text-lg text-gray-400 hover:text-white transition">
            <FaGithub size={28} />
            <span>github.com/senolmert02</span>
          </a>
        </motion.div>

        <motion.div {...reveal(0.6, -100)}>
          <a href="https://www.linkedin.com/in/%C5%9Fenol-mert-%C5%9Far-86140a261" target="_blank" className="flex items-center gap-4 text-lg text-gray-400 hover:text-white transition">
            <FaLinkedin size={28} />
            <span>Şenol Mert Şar</span>
          </a>
        </motion.div>

        <motion.div {...reveal(0.8, -100)}>
          <a href="mailto:sarsenolmert@gmail.com" className="flex items-center gap-4 text-lg text-gray-400 hover:text-white transition">
            <FaEnvelope size={28} />
            <span>sarsenolmert@gmail.com</span>
          </a>
        </motion.div>
      </div>

      {isDesktop ? (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="w-48 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-16 origin-center"
        />
      ) : (
        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-16" />
      )}
      <div className="mt-8">
        <img src="/senol-mert-sar.svg" alt="Şenol Mert Şar" className="h-12 opacity-50" />
      </div>
    </section>
  );
}
