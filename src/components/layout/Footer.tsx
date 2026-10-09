import Link from "next/link";
import { company } from "@/content/company";
import type { Dictionary, Locale } from "@/content";
import { LogoMark } from "@/components/brand/LogoMark";

/**
 * Footer.
 *
 * Continues the closing section's dark ground rather than introducing a third
 * surface, so the page ends on one uninterrupted block instead of a stripe.
 *
 * Carries the full NAP (name, address, phone) that the LocalBusiness
 * structured data claims. Search engines cross-check the two, and a footer
 * that disagrees with the JSON-LD is worse than no markup at all.
 */
export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();

  const serviceLinks = t.services.items.slice(0, 5).map((service) => ({
    href: "#services",
    label: service.name,
  }));

  const companyLinks = [
    { href: "#process", label: t.nav.process },
    { href: "#projects", label: t.nav.projects },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <footer
      className="bg-ink text-white"
      style={{ paddingBottom: "var(--action-bar-h)" }}
    >
      <div className="shell">
        <div className="grid gap-10 border-t border-rule-invert py-14 md:grid-cols-2 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-4">
            <LogoMark className="text-white" />
            <p className="t-body mt-5 max-w-[34ch] text-[0.9375rem] text-white/55">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label={t.footer.servicesTitle}>
            <h2 className="t-label mb-5 text-white/40">
              {t.footer.servicesTitle}
            </h2>
            <ul className="flex flex-col">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label={t.footer.companyTitle}>
            <h2 className="t-label mb-5 text-white/40">
              {t.footer.companyTitle}
            </h2>
            <ul className="flex flex-col">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="t-label mb-5 text-white/40">
              {t.footer.contactTitle}
            </h2>

            {/* The phone and email here are real primary actions — a visitor
                who scrolled this far without converting often calls from the
                footer — so they get full 44px targets, unlike the navigation
                links above, which are secondary and rely on 2.5.8's spacing
                allowance instead. */}
            <address className="flex flex-col not-italic">
              <a
                href={company.phone.href}
                className="tnum inline-flex min-h-11 items-center text-[1.0625rem] font-semibold text-white transition-colors hover:text-clay"
              >
                {company.phone.display}
              </a>
              <a
                href={company.phoneSecondary.href}
                className="tnum inline-flex min-h-11 items-center text-[0.9375rem] text-white/70 transition-colors hover:text-white"
              >
                {company.phoneSecondary.display}
              </a>
              <a
                href={company.email.href}
                className="inline-flex min-h-11 items-center text-[0.9375rem] text-white/70 transition-colors hover:text-white"
              >
                {company.email.display}
              </a>

              <p className="mt-2 text-[0.9375rem] text-white/55">
                {t.footer.cityLabel}: {company.address.city}
                {company.address.street ? `, ${company.address.street}` : ""}
              </p>
              <p className="text-[0.9375rem] text-white/55">
                {t.footer.hoursLabel}: {company.hours.display}
              </p>
            </address>

            {/* Wraps: at 1024 the contact column is only ~230px wide and three
                un-wrapped chips pushed the page 53px past the viewport. */}
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={company.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label inline-flex h-11 items-center rounded-md border border-rule-invert-strong px-3.5 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                Telegram
              </a>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label inline-flex h-11 items-center rounded-md border border-rule-invert-strong px-3.5 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                Instagram
              </a>
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label inline-flex h-11 items-center rounded-md border border-rule-invert-strong px-3.5 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-rule-invert py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label text-white/40">
            © {year} {company.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={`/${locale}/privacy`}
              className="t-label inline-flex min-h-11 items-center text-white/40 transition-colors hover:text-white"
            >
              {t.footer.privacy}
            </Link>
            <a
              href="#top"
              className="t-label inline-flex min-h-11 items-center text-white/40 transition-colors hover:text-white"
            >
              {t.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
