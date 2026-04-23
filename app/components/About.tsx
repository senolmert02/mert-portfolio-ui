"use client";

import ScrollReveal from "./ScrollReveal";
import Counter from "./Counter";
import { useLang } from "../lib/LanguageContext";
import { totalProjectsCount } from "../lib/projects";
import { skills } from "../lib/skills";

export default function About() {
  const { t } = useLang();

  return (
    <section id="hakkimda" className="min-h-screen flex flex-col items-center justify-center px-6">
      <ScrollReveal>
        <h2 className="text-4xl font-bold mb-8 text-center">{t.about.title}</h2>
      </ScrollReveal>
      <ScrollReveal>
        <div className="max-w-2xl text-center">
          <p className="text-gray-400 text-lg leading-8">
            {t.about.description}
          </p>
        </div>
      </ScrollReveal>
      <div className="flex gap-16 mt-16">
        <Counter target={totalProjectsCount} label={t.about.projects} />
        <Counter target={skills.length} label={t.about.technologies} />
        <Counter target={1} label={t.about.experience} />
      </div>
    </section>
  );
}
