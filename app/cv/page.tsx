"use client";

import Link from "next/link";
import MouseGlow from "../components/MouseGlow";
import LangToggle from "../components/LangToggle";
import { useLang } from "../lib/LanguageContext";

const EMBED_URL =
  "https://www.canva.com/design/DAHHq20WqKg/lJdKi6dCxca8hgTPhtccpg/view?embed";

export default function CvPage() {
  const { t } = useLang();

  return (
    <div className="bg-black text-white min-h-screen">
      <MouseGlow />
      <LangToggle />

      <div className="fixed top-0 w-full z-50 py-5">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="text-gray-400 hover:text-white transition">
            {t.cv.back}
          </Link>
        </div>
      </div>

      <section className="pt-28 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {t.cv.title}
            </h1>
            <p className="text-gray-400 text-base md:text-lg">
              {t.cv.subtitle}
            </p>
          </div>

          <div
            className="relative w-full rounded-xl overflow-hidden border border-gray-800 bg-gray-950"
            style={{ paddingTop: "141.42%" }}
          >
            <iframe
              loading="lazy"
              src={EMBED_URL}
              allow="fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              title={t.cv.title}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
