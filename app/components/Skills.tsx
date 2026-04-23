"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "../lib/LanguageContext";
import { skills, type Skill } from "../lib/skills";

function SkillCard({ name, Icon, color }: Skill) {
  return (
    <div
      className="group relative flex flex-col items-center gap-4 p-6 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-transparent hover:-translate-y-2"
      style={
        {
          "--skill-color": color,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}25, transparent 70%)`,
        }}
      />
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${color}, transparent)`,
          padding: "1px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          className="p-4 rounded-xl bg-gray-900/50 group-hover:scale-110 transition-transform duration-500"
          style={{
            boxShadow: `0 0 0 1px ${color}20`,
          }}
        >
          <Icon size={44} style={{ color }} />
        </div>
        <p className="font-semibold text-sm tracking-wide">{name}</p>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="yetenekler" className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <ScrollReveal>
        <h2 className="text-4xl font-bold mb-16 text-center">{t.skills.title}</h2>
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl w-full">
        {skills.map((skill) => (
          <ScrollReveal key={skill.name}>
            <SkillCard {...skill} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
