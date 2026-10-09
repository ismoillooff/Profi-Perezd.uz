import Link from "next/link";
import "./globals.css";
import { defaultLocale } from "@/content";
import { company } from "@/content/company";

/**
 * Root 404.
 *
 * Lives at the app root rather than under `[locale]` because the routes that
 * 404 hardest are the ones with no valid locale segment at all — an old
 * WordPress permalink from the previous site, for instance.
 *
 * It answers in the default language and, more importantly, still shows the
 * phone number: someone who reached a dead URL while looking for a mover
 * should not have to go back to Google to find one.
 */
export default function NotFound() {
  return (
    <html lang="ru">
      <body className="bg-paper">
        <main className="flex min-h-[100svh] items-center">
          <div className="shell">
            <p className="t-label text-clay">404</p>
            <h1 className="t-h2 mt-5 max-w-[16ch] text-ink">
              Такой страницы нет
            </h1>
            <p className="t-lead mt-5">
              Возможно, ссылка устарела. Вернитесь на главную — или просто
              позвоните, мы ответим быстрее, чем вы её найдёте.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${defaultLocale}`}
                className="inline-flex h-[52px] items-center justify-center rounded-[10px] bg-clay px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-clay-deep"
              >
                На главную
              </Link>
              <a
                href={company.phone.href}
                className="tnum inline-flex h-[52px] items-center justify-center rounded-[10px] border border-rule-strong px-6 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink"
              >
                {company.phone.display}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
