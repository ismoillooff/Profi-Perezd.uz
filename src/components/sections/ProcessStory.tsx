"use client";

import { useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { gsap, ScrollTrigger, useGSAP, registerGsap } from "@/lib/motion";
import { IMAGES } from "@/content/images";
import type { Dictionary } from "@/content";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";

/**
 * How it works.
 *
 * The page's one dark section, and it sits here on purpose: this is the point
 * where the visitor stops evaluating and starts imagining the day itself, and
 * dropping the ground out from under them marks that change of mode far more
 * cheaply than another heading would.
 *
 * Desktop is a sticky sequence — the visual holds while the four stages scroll
 * past it, so the steps read as one continuous day rather than four unrelated
 * blocks. Below `lg` it degrades to a plain numbered timeline: a sticky pane
 * on a phone eats the whole screen and leaves the text a 200px slot.
 *
 * The stage is driven by ScrollTrigger, NOT by pinning the section. Pinning
 * would take control of the scroll, and the brief rules that out — correctly,
 * since a visitor who cannot scroll past a section at their own speed reads
 * none of it.
 */
export function ProcessStory({ t }: { t: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const steps = t.process.steps;

  useGSAP(
    () => {
      registerGsap();
      if (!root.current) return;

      const mm = gsap.matchMedia();

      // Desktop only: below lg every step is already visible in full, so a
      // "current step" would be a lie the layout does not support.
      mm.add("(min-width: 1024px)", () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-step]",
          root.current!,
        );

        // Each stage reports when it owns the middle of the screen. Using the
        // viewport centre rather than the top means the active stage is always
        // the one the reader is actually looking at.
        const triggers = items.map((item, i) =>
          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          }),
        );

        return () => triggers.forEach((trigger) => trigger.kill());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="process"
      className="section-y bg-ink text-white"
      aria-labelledby="process-heading"
    >
      <div className="shell">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <span className="t-label mb-5 block text-white/45">
                {t.process.label}
              </span>
            </Reveal>
            <RevealLines
              as="h2"
              id="process-heading"
              lines={[t.process.heading]}
              className="t-h2 text-white"
            />
          </div>
          <div className="col-span-12 mt-5 lg:col-span-5 lg:mt-0 lg:self-end">
            <Reveal>
              <p className="t-lead text-white/65">{t.process.lead}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-0">
          {/* Sticky visual ------------------------------------------------- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[104px]">
              <div className="relative overflow-hidden rounded-[20px]">
                <Figure
                  slot={IMAGES.process}
                  alt={t.process.imageAlt}
                  className="aspect-[4/3] w-full lg:aspect-[4/5]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  pendingLabel="Процесс"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[rgba(12,9,7,0.78)] via-transparent to-transparent"
                />

                {/* The stage number, large, over the photograph. It is the
                    only thing on the sticky pane that changes. */}
                <div className="absolute inset-x-0 bottom-0 hidden p-7 lg:block">
                  <span
                    aria-hidden="true"
                    className="tnum block text-[4.5rem] font-bold leading-none tracking-[-0.05em] text-white"
                  >
                    {steps[active]?.index}
                  </span>
                  <span className="mt-2 block text-[1.125rem] font-semibold text-white/85">
                    {steps[active]?.title}
                  </span>
                </div>
              </div>

              {/* Progress: one segment per stage. Reads as a route, which is
                  the metaphor the section is already using. */}
              <div
                aria-hidden="true"
                className="mt-5 hidden gap-1.5 lg:flex"
              >
                {steps.map((step, i) => (
                  <span
                    key={step.index}
                    className="h-0.5 flex-1 overflow-hidden bg-white/15"
                  >
                    <span
                      className={cx(
                        "block h-full origin-left bg-clay transition-transform duration-500",
                        "[transition-timing-function:var(--ease-expo)]",
                        i <= active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stages -------------------------------------------------------- */}
          <ol className="lg:col-span-7 lg:pl-16 xl:pl-24">
            {steps.map((step, i) => (
              <li
                key={step.index}
                data-step
                className={cx(
                  "border-t border-rule-invert py-8 first:border-t-0 first:pt-0",
                  "lg:min-h-[42svh] lg:py-14",
                )}
              >
                <Reveal>
                  <div className="flex items-baseline gap-5">
                    <span
                      className={cx(
                        "t-index shrink-0 transition-colors duration-500",
                        "[transition-timing-function:var(--ease-expo)]",
                        i === active ? "text-clay" : "text-white/40",
                      )}
                    >
                      {step.index}
                    </span>
                    <h3 className="t-h3 text-white">{step.title}</h3>
                  </div>
                  <p className="t-lead mt-4 max-w-[46ch] pl-0 text-white/65 lg:pl-[3.125rem]">
                    {step.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
