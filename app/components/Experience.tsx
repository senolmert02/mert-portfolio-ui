"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "../lib/LanguageContext";

export default function Experience() {
  const { t } = useLang();

  return (
    <section id="deneyim" className="min-h-screen flex flex-col items-center justify-center px-6">
      <ScrollReveal>
        <h2 className="text-4xl font-bold mb-16 text-center">{t.experience.title}</h2>
      </ScrollReveal>
      <div className="max-w-2xl w-full relative">
        <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gray-800" />

        <ScrollReveal>
          <div className="pl-12 pb-12 relative">
            <div className="absolute left-[11px] top-1 w-3 h-3 rounded-full bg-white" />
            <p className="text-sm text-gray-500 mb-1">{t.experience.kapsul.date}</p>
            <h3 className="text-xl font-bold mb-1">{t.experience.kapsul.role}</h3>
            <p className="text-gray-400 font-medium mb-2">{t.experience.kapsul.company}</p>
            <p className="text-gray-500 leading-7">{t.experience.kapsul.description}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="pl-12 pb-12 relative">
            <div className="absolute left-[11px] top-1 w-3 h-3 rounded-full bg-gray-600" />
            <p className="text-sm text-gray-500 mb-1">{t.experience.cmn.date}</p>
            <h3 className="text-xl font-bold mb-1">{t.experience.cmn.role}</h3>
            <p className="text-gray-400 font-medium mb-2">{t.experience.cmn.company}</p>
            <p className="text-gray-500 leading-7">{t.experience.cmn.description}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="pl-12 relative">
            <div className="absolute left-[11px] top-1 w-3 h-3 rounded-full bg-gray-600" />
            <p className="text-sm text-gray-500 mb-1">{t.experience.chip.date}</p>
            <h3 className="text-xl font-bold mb-1">{t.experience.chip.role}</h3>
            <p className="text-gray-400 font-medium mb-2">{t.experience.chip.company}</p>
            <p className="text-gray-500 leading-7">{t.experience.chip.description}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
