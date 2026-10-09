"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";
import type { Dictionary } from "@/content";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";

/**
 * Reviews.
 *
 * One large review at a time with the rest as a selectable list, rather than a
 * grid of six equal cards. A grid makes every review look like filler; giving
 * one the full width makes it look like something a person actually wrote —
 * which these were.
 *
 * All eight are real, collected from the company's own review page during the
 * redesign audit, with names and dates intact and no wording improved. That
 * includes one review written in Uzbek, which stays in Uzbek on both locales:
 * translating a testimonial is the point at which it stops being one.
 */
export function Reviews({ t }: { t: Dictionary }) {
  const items = t.reviews.items;
  const [active, setActive] = useState(0);
  const current = items[active];

  const go = (delta: number) =>
    setActive((prev) => (prev + delta + items.length) % items.length);

  return (
    <section
      id="reviews"
      className="section-y bg-mist"
      aria-labelledby="reviews-heading"
    >
      <div className="shell">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <span className="t-label mb-5 block text-muted-soft">
                {t.reviews.label}
              </span>
            </Reveal>
            <RevealLines
              as="h2"
              id="reviews-heading"
              lines={[t.reviews.heading]}
              className="t-h2 text-ink"
            />
            <Reveal>
              <p className="t-lead mt-5">{t.reviews.lead}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-0">
          {/* Active review ------------------------------------------------- */}
          <Reveal variant="fade" className="lg:col-span-7 lg:pr-14">
            <figure
              // Announced as a unit so a screen reader hears the whole review
              // after the arrows change it, not a stream of fragments.
              aria-live="polite"
              className="flex h-full flex-col"
            >
              <Stars label={t.reviews.ratingLabel} />

              <blockquote className="mt-6">
                <p className="t-h3 text-ink">{current.title}</p>
                <p className="t-lead mt-4 max-w-none">{current.text}</p>
              </blockquote>

              <figcaption className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-rule pt-5">
                <span className="text-[0.9375rem] font-semibold text-ink">
                  {current.author}
                </span>
                <span aria-hidden="true" className="text-muted-soft">
                  ·
                </span>
                <span className="t-label text-muted">{current.service}</span>
                <span aria-hidden="true" className="text-muted-soft">
                  ·
                </span>
                <span className="t-label tnum text-muted-soft">
                  {current.date}
                </span>
              </figcaption>

              <div className="mt-7 flex items-center gap-2">
                <NavButton label={t.reviews.prev} onClick={() => go(-1)}>
                  <path
                    d="M11 3.5 6.5 8 11 12.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                </NavButton>
                <NavButton label={t.reviews.next} onClick={() => go(1)}>
                  <path
                    d="M6 3.5 10.5 8 6 12.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                </NavButton>
                <span className="t-label tnum ml-2 text-muted-soft">
                  {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </figure>
          </Reveal>

          {/* Selector ------------------------------------------------------ */}
          <div className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-14">
            <ul className="flex flex-col">
              {items.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active ? "true" : undefined}
                    className={cx(
                      "flex w-full items-start gap-4 border-b border-rule py-4 text-left transition-colors duration-300",
                      "[transition-timing-function:var(--ease-expo)]",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        "mt-2 h-px w-6 shrink-0 transition-colors duration-300",
                        i === active ? "bg-clay" : "bg-rule-strong",
                      )}
                    />
                    <span className="flex-1">
                      <span
                        className={cx(
                          "block text-[0.9375rem] font-semibold transition-colors duration-300",
                          i === active ? "text-ink" : "text-muted",
                        )}
                      >
                        {item.author}
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-[0.8125rem] text-muted-soft">
                        {item.title}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-hidden="true"
          className="text-clay"
        >
          <path
            d="M8 1.4 10 5.6l4.6.6-3.3 3.2.8 4.6L8 11.8l-4.1 2.2.8-4.6L1.4 6.2l4.6-.6z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-rule-strong text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
    >
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}
