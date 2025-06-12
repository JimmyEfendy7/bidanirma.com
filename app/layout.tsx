import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import ClientScripts from "../components/ClientScripts";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Bidan Irma | Homecare dan Konselor Laktasi",
  description: "Praktik Bidan Irma - Pelayanan Ibu dan Anak dengan Perawatan Profesional dan Ramah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <meta name="theme-color" content="#FAAFBE" />
        <link rel="icon" href="/assets/img/Bidan_Irma_Logo.png" type="image/x-icon" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" rel="stylesheet" />
      </head>
      <body 
        className={`${inter.variable} ${oswald.variable} font-inter bg-white text-primary-white`}
        suppressHydrationWarning={true}
      >
        <ClientScripts />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
 
