import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { getPrivacy } from "@/content/privacy";
import { company } from "@/content/company";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

  const doc = getPrivacy(locale);

  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: `${company.siteUrl}/${locale}/privacy` },
    // No reason to spend crawl budget here, and no reason to compete with the
    // sales page for the brand query.
    robots: { index: false, follow: true },
  };
}

/**
 * Privacy policy.
 *
 * A plain document, on paper, with no hero and no motion — this page exists to
 * be read and trusted, and dressing it up would undermine both. It shares the
 * header and footer so a visitor who lands here from the form is one click
 * from where they left off.
 */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const t = getDictionary(typedLocale);
  const doc = getPrivacy(typedLocale);

  return (
    <>
      <Header t={t} locale={typedLocale} />

      <main id="main" className="bg-paper pt-[72px]">
        <article className="shell section-y">
          <div className="max-w-[68ch]">
            <h1 className="t-h2 text-ink">{doc.title}</h1>
            <p className="t-label mt-4 text-muted-soft">{doc.updated}</p>
            <p className="t-lead mt-6">{doc.intro}</p>

            <div className="mt-12 flex flex-col gap-10">
              {doc.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="t-h4 text-ink">{section.heading}</h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="t-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <Link
              href={`/${typedLocale}`}
              className="mt-14 inline-flex h-12 items-center gap-2 rounded-[10px] border border-rule-strong px-5 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path
                  d="M13.5 8h-11M7 3.5 2.5 8 7 12.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
              {doc.back}
            </Link>
          </div>
        </article>
      </main>

      <Footer t={t} locale={typedLocale} />
    </>
  );
}
