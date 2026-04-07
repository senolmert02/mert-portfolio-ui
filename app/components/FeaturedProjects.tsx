"use client";

import ScrollReveal from "./ScrollReveal";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "../lib/LanguageContext";

export default function FeaturedProjects() {
  const { t } = useLang();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      <ScrollReveal>
        <h2 className="text-4xl font-bold mb-12 text-center">{t.featuredProjects.title}</h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <ScrollReveal>
          <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group">
            <div className="h-48 relative overflow-hidden">
              <Image src="/projects/tys-mobil.png" alt="Kapsül TYS Mobil" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Kapsül Mobil Uygulama</h3>
              <p className="text-gray-400 mb-4">{t.featuredProjects.kapsulMobile}</p>
              <div className="flex gap-2">
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">React Native</span>
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">JavaScript</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group">
            <div className="h-48 relative overflow-hidden">
              <Image src="/projects/kapsul-portal.png" alt="Kapsül Portal" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Google Workspace Otomasyonları</h3>
              <p className="text-gray-400 mb-4">{t.featuredProjects.kapsulPortal}</p>
              <div className="flex gap-2">
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Apps Script</span>
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Google Sites</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <ScrollReveal>
        <Link
          href="/projeler"
          className="mt-12 inline-block border border-gray-600 px-8 py-4 rounded-full font-medium hover:border-white hover:scale-105 transition"
        >
          {t.featuredProjects.viewAll}
        </Link>
      </ScrollReveal>
    </section>
  );
}
