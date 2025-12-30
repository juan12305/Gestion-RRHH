import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EyD Group SAS - Sistema de Gestión de Talento Humano",
  description:
    "Digitaliza tu proceso de contratación, gestión documental y seguimiento de empleados en una sola plataforma moderna y segura.",
  keywords: [
    "gestión de talento humano",
    "RRHH",
    "onboarding digital",
    "gestión documental",
    "recursos humanos",
    "EyD Group",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
