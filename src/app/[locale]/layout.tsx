import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import {
  defaultLocale,
  getDictionary,
  htmlLang,
  isLocale,
  locales,
  type Locale,
} from "@/content";
import { company } from "@/content/company";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

/**
 * There is no `src/app/layout.tsx`: with every route nested under `[locale]`,
 * this file IS the root layout. That is what lets `<html lang>` be correct per
 * language instead of hardcoded — which also drives the per-language hero type
 * scale in globals.css (`:root:lang(ru)`).
 */

/**
 * Manrope: a geometric humanist with a genuinely well-drawn Cyrillic, which
 * most "supports Cyrillic" faces do not have — the site is majority Russian
 * and a face whose Cyrillic is an afterthought shows immediately at display
 * sizes.
 */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/** JetBrains Mono covers Cyrillic, which most monospace faces do not. Every
 *  label, index numeral and eyebrow on the site is set in it. */
const techMono = JetBrains_Mono({
  variable: "--font-tech-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = getDictionary(locale);
  const url = `${company.siteUrl}/${locale}`;

  return {
    metadataBase: new URL(company.siteUrl),
    title: {
      default: t.meta.title,
      template: `%s — ${company.name}`,
    },
    description: t.meta.description,
    applicationName: company.name,
    authors: [{ name: company.name }],
    creator: company.name,
    keywords: [
      "квартирный переезд Ташкент",
      "офисный переезд Ташкент",
      "услуги грузчиков Ташкент",
      "грузоперевозки Ташкент",
      "разборка мебели",
      "сборка мебели",
      "переезд под ключ",
    ],
    alternates: {
      canonical: url,
      languages: {
        "ru-RU": `${company.siteUrl}/ru`,
        "uz-UZ": `${company.siteUrl}/uz`,
        "x-default": `${company.siteUrl}/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: company.name,
      title: t.meta.title,
      description: t.meta.description,
      url,
      locale: locale === "ru" ? "ru_RU" : "uz_UZ",
      alternateLocale: locale === "ru" ? ["uz_UZ"] : ["ru_RU"],
      // The OG image comes from the co-located `opengraph-image.tsx`, which
      // Next wires into this metadata automatically.
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#17130f" },
  ],
  width: "device-width",
  initialScale: 1,
  // NOT maximum-scale=1: locking zoom on a page aimed at people arranging a
  // stressful move — many of whom are not twenty-five — is a real barrier.
  viewportFit: "cover" as const,
};

/**
 * Adds `.motion-ready` before first paint, but only when motion is actually
 * wanted. CSS hides reveal targets behind that class, so a visitor with JS
 * disabled or reduced motion enabled never meets a blank page.
 */
const MOTION_READY_SCRIPT = `
(function(){try{
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.classList.add('motion-ready');
  }
}catch(e){}})();
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale as Locale);

  return (
    <html
      lang={htmlLang[locale]}
      className={`${manrope.variable} ${techMono.variable} antialiased`}
      // The head script below adds `.motion-ready` to this element before React
      // hydrates — deliberately, so reveal targets are hidden from the first
      // paint. React would otherwise report the extra class as a mismatch on
      // every page load and bury real warnings.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_READY_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:text-white"
        >
          {t.nav.skipToContent}
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
