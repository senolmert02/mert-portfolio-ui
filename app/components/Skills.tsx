"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "../lib/LanguageContext";

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="yetenekler" className="min-h-screen flex flex-col items-center justify-center px-6">
      <ScrollReveal>
        <h2 className="text-4xl font-bold mb-16 text-center">{t.skills.title}</h2>
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3 p-6 border border-gray-800 rounded-xl hover:border-gray-600 hover:scale-105 transition-all duration-300">
            <span className="text-4xl">📱</span>
            <p className="font-medium">React Native</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3 p-6 border border-gray-800 rounded-xl hover:border-gray-600 hover:scale-105 transition-all duration-300">
            <span className="text-4xl">🟨</span>
            <p className="font-medium">JavaScript</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3 p-6 border border-gray-800 rounded-xl hover:border-gray-600 hover:scale-105 transition-all duration-300">
            <span className="text-4xl">🌐</span>
            <p className="font-medium">HTML / CSS</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3 p-6 border border-gray-800 rounded-xl hover:border-gray-600 hover:scale-105 transition-all duration-300">
            <span className="text-4xl">🟢</span>
            <p className="font-medium">Node.js</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3 p-6 border border-gray-800 rounded-xl hover:border-gray-600 hover:scale-105 transition-all duration-300">
            <span className="text-4xl">📝</span>
            <p className="font-medium">Apps Script</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3 p-6 border border-gray-800 rounded-xl hover:border-gray-600 hover:scale-105 transition-all duration-300">
            <span className="text-4xl">☁️</span>
            <p className="font-medium">Google Workspace</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3 p-6 border border-gray-800 rounded-xl hover:border-gray-600 hover:scale-105 transition-all duration-300">
            <span className="text-4xl">▲</span>
            <p className="font-medium">Next.js</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3 p-6 border border-gray-800 rounded-xl hover:border-gray-600 hover:scale-105 transition-all duration-300">
            <span className="text-4xl">🐙</span>
            <p className="font-medium">Git</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
