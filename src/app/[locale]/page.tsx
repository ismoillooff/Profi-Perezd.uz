import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/content";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyContact } from "@/components/layout/StickyContact";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { StructuredData } from "@/components/seo/StructuredData";

import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { ServiceExplorer } from "@/components/sections/ServiceExplorer";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { Benefits } from "@/components/sections/Benefits";
import { PriceCalculator } from "@/components/sections/PriceCalculator";
import { Projects } from "@/components/sections/Projects";
import { Proof } from "@/components/sections/Proof";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * The sales narrative, in order. Each section answers exactly one question the
 * visitor is asking at that point, and the order is the argument:
 *
 *   Hero            Что вы делаете?
 *   TrustBar        Вы вообще настоящие?
 *   ProblemSolution Почему мне это нужно? / Как вы это решаете?
 *   ServiceExplorer Что конкретно можно заказать?
 *   ProcessStory    Что будет после заявки?
 *   Benefits        Почему с вами спокойнее?
 *   PriceCalculator Сколько это стоит?          ← the lead magnet
 *   Projects        Вы действительно это делаете?
 *   Proof           Можно ли вам доверять?
 *   Reviews         Что говорят другие?
 *   Faq             А если…?
 *   FinalCta        Что мне делать сейчас?
 *
 * The calculator sits BEFORE the proof sections rather than after them, which
 * is the one deliberate departure from the brief's suggested order: a visitor
 * who has just read what the process involves is at peak intent, and moving
 * the price question behind three more scroll-lengths of proof spends that
 * intent instead of capturing it. Everything after it exists to convert the
 * visitors who scrolled past — which is what the closing CTA is for.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const t = getDictionary(typedLocale);

  return (
    <>
      <StructuredData t={t} locale={typedLocale} />

      <span id="top" aria-hidden="true" />
      <Header t={t} locale={typedLocale} />

      <main id="main">
        <Hero t={t} locale={typedLocale} />
        <TrustBar t={t} />
        <ProblemSolution t={t} />
        <ServiceExplorer t={t} />
        <ProcessStory t={t} />
        <Benefits t={t} />
        <PriceCalculator t={t} locale={typedLocale} />
        <Projects t={t} />
        <Proof t={t} />
        <Reviews t={t} />
        <Faq t={t} />
        <FinalCta t={t} locale={typedLocale} />
      </main>

      <Footer t={t} locale={typedLocale} />

      <StickyContact t={t} />
      <MobileActionBar t={t} />
    </>
  );
}
