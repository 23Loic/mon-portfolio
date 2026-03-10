import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from '@/components/Navbar';
import { ThemeProvider } from 'next-themes';
// --- AJOUTS ICI ---
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
// ------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loïc Bouvil | Portfolio",
  description: "Portfolio de développeur",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  // 1. Validation de la langue
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 2. Récupération des messages de traduction pour le client
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 3. On enveloppe avec le Provider pour que la Navbar ait accès au contexte */}
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}