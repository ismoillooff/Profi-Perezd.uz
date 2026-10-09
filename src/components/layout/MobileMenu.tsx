"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cx } from "@/lib/cx";
import { track } from "@/lib/analytics";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { company } from "@/content/company";
import type { Dictionary, Locale } from "@/content";
import { locales, localeLabel } from "@/content";
import { getChannels, linkProps } from "@/components/contact/channels";
import { LogoMark } from "@/components/brand/LogoMark";

/**
 * Full-screen mobile navigation.
 *
 * Not a slide-in drawer: at 375px a drawer leaves a useless 40px strip of dead
 * page behind it, and the contact actions — the whole reason the menu exists —
 * end up cramped. Taking the full screen lets every target be 56px tall.
 */
export function MobileMenu({
  open,
  onClose,
  t,
  locale,
  links,
}: {
  open: boolean;
  onClose: () => void;
  t: Dictionary;
  locale: Locale;
  links: { href: string; label: string }[];
}) {
  const panel = useRef<HTMLDivElement>(null);
  const channels = getChannels(t);

  useEffect(() => {
    if (!open) return;

    lockScroll();
    // Move focus into the panel so the next Tab lands inside it rather than
    // continuing down the page behind the overlay.
    panel.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;

      // Minimal focus trap. The panel's contents are a short, flat list, so a
      // full trap library would be more code than the thing it guards.
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [open, onClose]);

  return (
    <div
      // Kept mounted so the close transition can play, and so the links stay
      // in the DOM for crawlers that do not run the menu's open state.
      className={cx(
        "fixed inset-0 z-[70] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cx(
          "absolute inset-0 bg-ink/40 transition-opacity duration-300",
          "[transition-timing-function:var(--ease-expo)]",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        className={cx(
          "absolute inset-x-0 top-0 flex max-h-dvh flex-col overflow-y-auto",
          "bg-paper outline-none transition-transform duration-[420ms]",
          "[transition-timing-function:var(--ease-expo)]",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-rule px-5">
          <LogoMark className="text-ink" />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.nav.close}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-[10px] text-ink transition-colors hover:bg-mist"
          >
            <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-5 py-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-rule py-4 text-[1.375rem] font-semibold tracking-[-0.02em] text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2 px-5 pb-5 pt-3">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              {...linkProps(channel)}
              onClick={() => {
                track(channel.event, { placement: "mobile_menu" });
                onClose();
              }}
              className="flex h-14 items-center gap-3 rounded-[10px] border border-rule-strong px-4 text-[0.9375rem] font-semibold text-ink"
            >
              <channel.Icon className="shrink-0 text-clay" />
              <span>{channel.label}</span>
              <span className="tnum ml-auto text-sm font-medium text-muted">
                {channel.display}
              </span>
            </a>
          ))}

          <a
            href="#price"
            onClick={() => {
              track("sticky_mobile_cta", { placement: "mobile_menu" });
              onClose();
            }}
            className="mt-1 flex h-14 items-center justify-center rounded-[10px] bg-clay px-4 text-[0.9375rem] font-semibold text-white"
          >
            {t.nav.cta}
          </a>

          <div className="mt-4 flex items-center gap-1 border-t border-rule pt-4">
            <span className="t-label mr-2 text-muted-soft">
              {t.nav.langLabel}
            </span>
            {locales.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                onClick={onClose}
                aria-current={code === locale ? "true" : undefined}
                className={cx(
                  // A 44px control: this is a touch-only surface, and the
                  // language pair is the smallest thing on it.
                  "t-label flex h-11 items-center rounded-md px-3.5 transition-colors",
                  code === locale
                    ? "bg-ink text-white"
                    : "text-muted hover:text-ink",
                )}
              >
                {localeLabel[code]}
              </Link>
            ))}
          </div>

          <p className="t-small mt-4 text-muted-soft">
            {t.footer.hoursLabel}: {company.hours.display}
          </p>
        </div>
      </div>
    </div>
  );
}
