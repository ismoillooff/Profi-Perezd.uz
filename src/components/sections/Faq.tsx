"use client";

import { useId, useState } from "react";
import { cx } from "@/lib/cx";
import type { Dictionary } from "@/content";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";

/**
 * Objection handling.
 *
 * Framed as "что обычно волнует перед переездом", not as an FAQ, because these
 * are the last things standing between the visitor and a phone call: damage,
 * price changing on the day, whether we pack, whether we can take the piano.
 * Each answer names what we actually do rather than reassuring in general.
 *
 * Built on real buttons with `aria-expanded` rather than `<details>`: the
 * grid-rows height transition below cannot be applied to a `<details>` element
 * without fighting the browser's own open/close behaviour, and the accessible
 * semantics here are equivalent.
 *
 * The answers are also rendered into the markup on the server (they are only
 * visually collapsed), so search engines index every one of them — which is
 * most of the point of having them.
 */
export function Faq({ t }: { t: Dictionary }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-y bg-paper"
      aria-labelledby="faq-heading"
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-5 lg:pr-12">
            <div className="lg:sticky lg:top-[104px]">
              <Reveal>
                <span className="t-label mb-5 block text-muted-soft">
                  {t.faq.label}
                </span>
              </Reveal>
              <RevealLines
                as="h2"
                id="faq-heading"
                lines={[t.faq.heading]}
                className="t-h2 text-ink"
              />
              <Reveal>
                <p className="t-lead mt-5">{t.faq.lead}</p>
              </Reveal>
            </div>
          </div>

          <ul className="border-t border-rule lg:col-span-7">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-rule">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`${uid}-${i}`}
                      className="flex w-full items-start gap-5 py-5 text-left"
                    >
                      <span
                        className={cx(
                          "t-h4 flex-1 transition-colors duration-300",
                          isOpen ? "text-ink" : "text-ink/85",
                        )}
                      >
                        {item.q}
                      </span>

                      <span
                        aria-hidden="true"
                        className={cx(
                          "relative mt-1 h-5 w-5 shrink-0 transition-[transform,color] duration-300",
                          "[transition-timing-function:var(--ease-expo)]",
                          isOpen ? "rotate-45 text-clay" : "text-muted",
                        )}
                      >
                        <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-current" />
                        <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-current" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`${uid}-${i}`}
                    className={cx(
                      "grid transition-[grid-template-rows] duration-[420ms]",
                      "[transition-timing-function:var(--ease-expo)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="t-body max-w-[62ch] pb-6 pr-10">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
