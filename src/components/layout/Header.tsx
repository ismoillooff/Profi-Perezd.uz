"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cx } from "@/lib/cx";
import { track } from "@/lib/analytics";
import { company } from "@/content/company";
import { locales, localeLabel, type Dictionary, type Locale } from "@/content";
import { LogoMark } from "@/components/brand/LogoMark";
import { MobileMenu } from "./MobileMenu";
import { PhoneIcon } from "@/components/contact/channels";

export const HEADER_HEIGHT = 72;

/**
 * Site header.
 *
 * Two states, and only colour separates them: transparent while it sits over
 * the hero photograph, solid paper once it has left it. It never becomes a
 * floating glass card — a blurred panel over the footage is the single most
 * template-looking thing a header can do.
 *
 * The over-hero state is derived from a sentinel the hero renders at its own
 * bottom edge, not from a hardcoded `100vh` guess: the hero's real height
 * changes with the browser chrome on mobile, and a guess leaves the header
 * white-on-white for the last 60px of scroll.
 */
export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [overHero, setOverHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /**
   * `wide` links appear only from 1280px up.
   *
   * At exactly 1024 — where the desktop bar replaces the hamburger — the logo,
   * six links, the phone, the language pair and the CTA measure ~1050px inside
   * a 928px content box, and the CTA was pushed off the right edge. Dropping
   * the two least-load-bearing links between 1024 and 1279 is what keeps the
   * bar honest at every width without demoting a whole tier of laptops and
   * landscape tablets back to a hamburger.
   */
  const links = [
    { href: "#services", label: t.nav.services, wide: false },
    { href: "#process", label: t.nav.process, wide: true },
    { href: "#price", label: t.nav.price, wide: false },
    { href: "#projects", label: t.nav.projects, wide: false },
    { href: "#reviews", label: t.nav.reviews, wide: false },
    { href: "#faq", label: t.nav.faq, wide: true },
  ];

  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>("[data-hero-end]");
    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      // No hero on the page (a future sub-page) → the solid header is correct
      // from the first pixel.
      setOverHero(
        sentinel
          ? sentinel.getBoundingClientRect().top > HEADER_HEIGHT * 0.6
          : false,
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    // Return focus to the control that opened it, or the keyboard user is
    // dropped back at the top of the document.
    toggleRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-[60]",
          overHero && !menuOpen && "nav-over-hero",
        )}
        data-nav-bar
      >
        {/* Scrim: a gradient, not a panel. It guarantees contrast for the nav
            over an unknown photograph without putting a box on the design. */}
        <div
          aria-hidden="true"
          className={cx(
            "pointer-events-none absolute inset-x-0 top-0 h-[132px]",
            "bg-gradient-to-b from-[rgba(12,9,7,0.55)] to-transparent",
            "transition-opacity duration-500 [transition-timing-function:var(--ease-expo)]",
            overHero && !menuOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cx(
            "absolute inset-0 border-b transition-[background-color,border-color] duration-500",
            "[transition-timing-function:var(--ease-expo)]",
            overHero || menuOpen
              ? "border-transparent bg-transparent"
              : cx(
                  "border-rule bg-paper/92 backdrop-blur-md",
                  scrolled && "shadow-[0_1px_0_0_rgba(23,19,15,0.04)]",
                ),
          )}
        />

        <div className="shell relative">
          <div
            className="flex items-center justify-between gap-6"
            style={{ height: HEADER_HEIGHT }}
          >
            <Link
              href={`/${locale}`}
              data-nav-tint
              className="flex h-11 items-center text-ink transition-colors"
              aria-label={company.name}
            >
              <LogoMark />
            </Link>

            <nav
              className="hidden items-center gap-6 lg:flex xl:gap-7"
              aria-label={t.nav.menu}
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-nav-link
                  className={cx(
                    // py-2 takes the target from 23px to 39px tall — over the
                    // 24px WCAG 2.5.8 AA minimum, which the bare text was
                    // missing by a single pixel.
                    "py-2 text-[0.9375rem] font-medium text-muted transition-colors hover:text-ink",
                    link.wide && "hidden xl:block",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 lg:gap-3">
              <a
                href={company.phone.href}
                onClick={() => track("phone_click", { placement: "header" })}
                data-nav-tint
                // py-2 clears the 24px WCAG 2.5.8 minimum, which the bare
                // 23px text line missed by a pixel.
                className="tnum hidden py-2 text-[0.9375rem] font-semibold text-ink transition-colors xl:block"
              >
                {company.phone.display}
              </a>

              {/* Below xl the number is an icon button: the full string pushes
                  the CTA off a 1024px viewport. */}
              <a
                href={company.phone.href}
                onClick={() => track("phone_click", { placement: "header" })}
                aria-label={`${t.common.call}: ${company.phone.display}`}
                data-nav-outline
                className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-rule-strong text-ink transition-colors hover:border-ink xl:hidden"
              >
                <PhoneIcon />
              </a>

              <div className="hidden items-center gap-0.5 lg:flex">
                {locales.map((code) => (
                  <Link
                    key={code}
                    href={`/${code}`}
                    hrefLang={code}
                    aria-current={code === locale ? "true" : undefined}
                    data-nav-link
                    className={cx(
                      // h-11: the language pair is the smallest control in the
                      // bar and the one most often hit on a touchscreen laptop.
                      "t-label flex h-11 items-center rounded-md px-2 transition-colors",
                      code === locale
                        ? "text-ink"
                        : "text-muted-soft hover:text-ink",
                    )}
                  >
                    {localeLabel[code]}
                  </Link>
                ))}
              </div>

              <a
                href="#price"
                onClick={() => track("service_cta", { placement: "header" })}
                className="hidden h-11 items-center rounded-[10px] bg-clay px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-clay-deep lg:inline-flex"
              >
                {t.nav.cta}
              </a>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t.nav.openMenu}
                aria-expanded={menuOpen}
                data-nav-outline
                className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-rule-strong text-ink transition-colors hover:border-ink lg:hidden"
              >
                <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                  <path
                    d="M3 6h14M3 12h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        t={t}
        locale={locale}
        links={links}
      />
    </>
  );
}
