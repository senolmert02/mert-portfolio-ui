"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import Footer from "../components/Footer";
import MouseGlow from "../components/MouseGlow";
import LangToggle from "../components/LangToggle";
import { useLang } from "../lib/LanguageContext";

export default function ProjelerPage() {
  const { t } = useLang();

  return (
    <div className="bg-black text-white min-h-screen">
      <MouseGlow />
      <LangToggle />
      <div className="fixed top-0 w-full z-50 py-5">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="text-gray-400 hover:text-white transition">
            {t.projectsPage.back}
          </Link>
        </div>
      </div>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="text-5xl font-bold mb-4">{t.projectsPage.title}</h1>
            <p className="text-gray-400 text-lg mb-16">{t.projectsPage.subtitle}</p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-6 text-gray-300">{t.projectsPage.categories.tys}</h2>
          </ScrollReveal>

          <div className="flex flex-col gap-8 mb-16">
            <ScrollReveal>
              <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group flex flex-col md:flex-row">
                <div className="h-48 md:h-auto md:w-64 relative overflow-hidden">
                  <Image src="/projects/tys-mobil.png" alt="Kapsül TYS Mobil" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2">{t.projectsPage.tysMobile.title}</h3>
                  <p className="text-gray-400 mb-4 leading-7">{t.projectsPage.tysMobile.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">React Native</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Expo</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">TypeScript</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Tailwind CSS</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Redux</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group flex flex-col md:flex-row">
                <div className="h-48 md:h-auto md:w-64 relative overflow-hidden">
                  <Image src="/projects/tys-web.png" alt="Kapsül TYS Web" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2">{t.projectsPage.tysWeb.title}</h3>
                  <p className="text-gray-400 mb-4 leading-7">{t.projectsPage.tysWeb.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">React</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">TypeScript</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Tailwind CSS</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Zustand</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Axios</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group flex flex-col md:flex-row">
                <div className="h-48 md:h-auto md:w-64 bg-gradient-to-br from-yellow-900/50 to-yellow-600/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="text-5xl">⚡</span>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2">{t.projectsPage.tysBackend.title}</h3>
                  <p className="text-gray-400 mb-4 leading-7">{t.projectsPage.tysBackend.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Node.js</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Express.js</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">TypeScript</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">MongoDB</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Typegoose</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-6 text-gray-300">{t.projectsPage.categories.kiosk}</h2>
          </ScrollReveal>

          <div className="flex flex-col gap-8 mb-16">
            <ScrollReveal>
              <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group flex flex-col md:flex-row">
                <div className="h-48 md:h-auto md:w-64 relative overflow-hidden">
                  <Image src="/projects/kiosk.png" alt="Kiosk Sistemi" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2">{t.projectsPage.kioskSystem.title}</h3>
                  <p className="text-gray-400 mb-4 leading-7">{t.projectsPage.kioskSystem.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Node.js</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Microservice</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">REST API</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-6 text-gray-300">{t.projectsPage.categories.portal}</h2>
          </ScrollReveal>

          <div className="flex flex-col gap-8 mb-16">
            <ScrollReveal>
              <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group flex flex-col md:flex-row">
                <div className="h-48 md:h-auto md:w-64 relative overflow-hidden">
                  <Image src="/projects/kapsul-portal.png" alt="Kapsül Portal" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2">{t.projectsPage.portalProject.title}</h3>
                  <p className="text-gray-400 mb-4 leading-7">{t.projectsPage.portalProject.description}</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Apps Script</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Google Sites</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">JavaScript</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">HTML/CSS</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{t.projectsPage.portalProject.subProjects}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Satın Alma ve Organizasyon</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">TYS Malzeme Portalı</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Araç Takip</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Topluluk Destek</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Dokümantasyon Gönderim</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Randevu Mail</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Değerlendirme Mail</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Mesai Talep</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Mesai Planlama</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Personel Yönetim</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Teknik Gezi</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Personel Kayıt</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Mesai Takip</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Bütçe Yönetim</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Dinamik Mail Gönderim</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">İSG Risk Analiz</span>
                    <span className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded-full">Aylık Faaliyet Raporu</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-6 text-gray-300">{t.projectsPage.categories.personal}</h2>
          </ScrollReveal>

          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group flex flex-col md:flex-row">
                <div className="h-48 md:h-auto md:w-64 bg-gradient-to-br from-purple-900/50 to-purple-600/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="text-5xl">▲</span>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2">{t.projectsPage.portfolio.title}</h3>
                  <p className="text-gray-400 mb-4 leading-7">{t.projectsPage.portfolio.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Next.js</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Tailwind CSS</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">TypeScript</span>
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Framer Motion</span>
                  </div>
                  <a
                    href="https://github.com/senolmert02"
                    target="_blank"
                    className="mt-4 inline-block text-sm text-gray-500 border border-gray-700 px-4 py-2 rounded-full hover:text-white hover:border-white transition"
                  >
                    {t.projectsPage.viewCode}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
