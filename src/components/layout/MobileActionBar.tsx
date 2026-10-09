"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import { track } from "@/lib/analytics";
import { company } from "@/content/company";
import type { Dictionary } from "@/content";
import { PhoneIcon, TelegramIcon } from "@/components/contact/channels";

/**
 * Mobile action bar.
 *
 * Three actions, because three is what fits at 375px while every target still
 * clears 44px: call, calculate, Telegram. WhatsApp deliberately does NOT get a
 * fourth slot even when configured — it lives in the menu and the closing CTA.
 * Four 90px buttons on a small phone is a toolbar, not a decision.
 *
 * Appears only after the hero. Padded for the iOS home indicator via
 * env(safe-area-inset-bottom), which is the difference between a tappable bar
 * and one whose bottom third is under the system gesture area.
 */
export function MobileActionBar({ t }: { t: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>("[data-hero-end]");
    let frame = 0;

    const measure = () => {
      frame = 0;
      setVisible(
        sentinel
          ? sentinel.getBoundingClientRect().top < 0
          : window.scrollY > 400,
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

  const itemClass =
    "flex h-full flex-1 flex-col items-center justify-center gap-1 text-[0.6875rem] font-semibold tracking-[0.01em]";

  return (
    <div
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 lg:hidden",
        "border-t border-rule bg-paper/97 backdrop-blur-md",
        "transition-transform duration-[420ms]",
        "[transition-timing-function:var(--ease-expo)]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex" style={{ height: "var(--action-bar-h)" }}>
        <a
          href={company.phone.href}
          onClick={() =>
            track("phone_click", { placement: "sticky_mobile_cta" })
          }
          className={cx(itemClass, "text-ink")}
        >
          <PhoneIcon className="text-clay" />
          {t.common.call}
        </a>

        <span aria-hidden="true" className="my-3 w-px bg-rule" />

        <a
          href="#price"
          onClick={() =>
            track("sticky_mobile_cta", { placement: "mobile_bar" })
          }
          className={cx(itemClass, "bg-clay text-white")}
        >
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" fill="none">
            <path
              d="M4.5 2.5h11v15h-11zM7 6h6M7 9.5h2.5M7 13h2.5M13 9.5v3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t.common.calculate}
        </a>

        <span aria-hidden="true" className="my-3 w-px bg-rule" />

        <a
          href={company.telegram.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("telegram_click", { placement: "sticky_mobile_cta" })
          }
          className={cx(itemClass, "text-ink")}
        >
          <TelegramIcon className="text-clay" />
          {t.common.telegram}
        </a>
      </div>
    </div>
  );
}
