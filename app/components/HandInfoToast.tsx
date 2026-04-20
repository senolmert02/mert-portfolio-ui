"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "handInfoSeen_v1";

function readSeen(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return !!localStorage.getItem(KEY);
  } catch {
    return true;
  }
}

export default function HandInfoToast({ active }: { active: boolean }) {
  const [seen, setSeen] = useState<boolean>(readSeen);

  const dismiss = () => {
    setSeen(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  };

  const show = active && !seen;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-[200] max-w-sm"
        >
          <div className="relative bg-blue-950/90 border border-blue-600/40 rounded-2xl p-5 backdrop-blur-md shadow-[0_8px_40px_rgba(37,99,235,0.35)]">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-blue-100 font-semibold text-base">
                El ile kontrol
              </h3>
              <button
                onClick={dismiss}
                className="text-blue-300 hover:text-white transition text-lg leading-none"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>
            <ul className="text-sm text-blue-100/85 space-y-2.5 leading-relaxed">
              <li>
                <span className="text-blue-300 font-medium">İsmin üstünde el</span>{" "}
                — yazı kum gibi dağılır
              </li>
              <li>
                <span className="text-pink-300 font-medium">
                  Sadece işaret parmağı
                </span>{" "}
                — havaya çizim yap (5 sn sonra silinir)
              </li>
              <li>
                <span className="text-blue-300 font-medium">
                  Dört parmak yukarı kaydır
                </span>{" "}
                — sonraki bölüme geç
              </li>
            </ul>
            <p className="text-xs text-blue-300/70 mt-3 italic">
              Kamera sadece bu bölümde çalışır, yüz kaydedilmez.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
