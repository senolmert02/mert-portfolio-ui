import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mert-portfolio-ui.vercel.app"),
  title: "Şenol Mert Şar",
  description: "Şenol Mert Şar tarafından geliştirilen kişisel portföy sitesi.",
  icons: {
    icon: "/senol-mert-sar.svg",
    apple: "/senol-mert-sar.svg",
  },
  openGraph: {
    title: "Şenol Mert Şar",
    description: "Şenol Mert Şar tarafından geliştirilen kişisel portföy sitesi.",
    url: "https://mert-portfolio-ui.vercel.app",
    siteName: "Şenol Mert Şar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Şenol Mert Şar - Portföy",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Şenol Mert Şar",
    description: "Şenol Mert Şar tarafından geliştirilen kişisel portföy sitesi.",
    images: ["/og-image.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
