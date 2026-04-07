"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLang } from "../lib/LanguageContext";

export default function Contact() {
  const { t } = useLang();

  return (
    <section
      id="iletisim"
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-4 text-center"
      >
        {t.contact.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-gray-400 mb-16 text-center max-w-md"
      >
        {t.contact.description}
      </motion.p>

      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a href="https://github.com/senolmert02" target="_blank" className="flex items-center gap-4 text-lg text-gray-400 hover:text-white transition">
            <FaGithub size={28} />
            <span>github.com/senolmert02</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a href="https://www.linkedin.com/in/%C5%9Fenol-mert-%C5%9Far-86140a261" target="_blank" className="flex items-center gap-4 text-lg text-gray-400 hover:text-white transition">
            <FaLinkedin size={28} />
            <span>Şenol Mert Şar</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <a href="mailto:sarsenolmert@gmail.com" className="flex items-center gap-4 text-lg text-gray-400 hover:text-white transition">
            <FaEnvelope size={28} />
            <span>sarsenolmert@gmail.com</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true }}
        className="w-48 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-16 origin-center"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <img src="/senol-mert-sar.svg" alt="Şenol Mert Şar" className="h-12 opacity-50" />
      </motion.div>
    </section>
  );
}
