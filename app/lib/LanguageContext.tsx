"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Lang } from "./translations";

const LanguageContext = createContext<{
  lang: Lang;
  t: typeof translations.tr;
  toggleLang: () => void;
}>({
  lang: "tr",
  t: translations.tr,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");

  const toggleLang = () => {
    setLang(lang === "tr" ? "en" : "tr");
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
