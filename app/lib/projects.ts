export const portalSubProjects = [
  "Satın Alma ve Organizasyon",
  "TYS Malzeme Portalı",
  "Araç Takip",
  "Topluluk Destek",
  "Dokümantasyon Gönderim",
  "Randevu Mail",
  "Değerlendirme Mail",
  "Mesai Talep",
  "Mesai Planlama",
  "Personel Yönetim",
  "Teknik Gezi",
  "Personel Kayıt",
  "Mesai Takip",
  "Bütçe Yönetim",
  "Dinamik Mail Gönderim",
  "İSG Risk Analiz",
  "Aylık Faaliyet Raporu",
] as const;

export const mainProjects = [
  "tys-mobile",
  "tys-web",
  "tys-backend",
  "kiosk",
  "portal",
  "touchless",
  "portfolio",
] as const;

export const totalProjectsCount =
  mainProjects.length + portalSubProjects.length;
