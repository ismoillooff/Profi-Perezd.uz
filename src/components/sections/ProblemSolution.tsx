"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGsap, MOTION, MQ } from "@/lib/motion";
import { IMAGES } from "@/content/images";
import type { Dictionary } from "@/content";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";

/**
 * Problem → solution.
 *
 * This is the section that earns the rest of the page: before a visitor cares
 * what we sell, they have to recognise their own situation in it. So the left
 * column is their week, written as the questions they are actually asking
 * themselves, and the right column is the same list with us in it.
 *
 * The brief's separate "before / after" block is folded in here rather than
 * repeated later. Two sections making the same argument twenty seconds apart
 * is the template rhythm the brief rules out — and the argument is stronger
 * made once, with the photography attached to it.
 *
 * MOTION — the one piece of literal storytelling on the page: the left-hand
 * items settle out of scattered offsets into alignment as they enter. Chaos
 * becoming order, in the section about chaos becoming order. Every other
 * reveal on the site is plain, which is what lets this one mean something.
 */
export function ProblemSolution({ t }: { t: Dictionary }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current) return;

      const items = gsap.utils.toArray<HTMLElement>(
        "[data-pain]",
        root.current,
      );
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add(MQ.motionOk, () => {
        // Fixed, hand-picked offsets rather than Math.random(): a random
        // scatter re-rolls on every hot reload and cannot be reviewed, and one
        // unlucky seed puts two items on top of each other.
        const scatter = [
          { x: -26, rotate: -1.6 },
          { x: 18, rotate: 1.1 },
          { x: -12, rotate: 0.8 },
          { x: 24, rotate: -0.9 },
          { x: -20, rotate: 1.4 },
          { x: 10, rotate: -1.2 },
        ];

        items.forEach((item, i) => {
          const from = scatter[i % scatter.length];
          gsap.set(item, { ...from, opacity: 0 });
        });

        const tween = gsap.to(items, {
          x: 0,
          rotate: 0,
          opacity: 1,
          duration: MOTION.dur.section,
          ease: MOTION.ease.expo,
          stagger: MOTION.stagger.cards,
          scrollTrigger: {
            trigger: root.current,
            start: MOTION.trigger.start,
            toggleActions: "play none none none",
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(items, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="problem"
      className="section-y bg-paper"
      aria-labelledby="problem-heading"
    >
      <div className="shell">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <span className="t-label mb-5 block text-muted-soft">
                {t.problem.label}
              </span>
            </Reveal>
            <RevealLines
              as="h2"
              id="problem-heading"
              lines={[t.problem.heading]}
              className="t-h2 text-ink"
            />
            <Reveal>
              <p className="t-lead mt-5">{t.problem.lead}</p>
            </Reveal>
          </div>
        </div>

        {/* The comparison. Two columns at lg, stacked below — and stacked is
            the honest order: problem first, then answer. */}
        <div className="mt-14 grid gap-10 md:mt-16 lg:grid-cols-2 lg:gap-0">
          {/* Before -------------------------------------------------------- */}
          <div className="lg:pr-12 xl:pr-16">
            <Reveal variant="clip" className="mb-8 block">
              <Figure
                slot={IMAGES.chaos}
                alt={t.problem.beforeAlt}
                className="aspect-[4/3] w-full rounded-[16px]"
                imageClassName="saturate-[0.72]"
                sizes="(min-width: 1024px) 46vw, 100vw"
                pendingLabel="До"
              />
            </Reveal>

            <h3 className="t-label mb-6 text-muted-soft">
              {t.problem.painsLabel}
            </h3>

            <ul className="flex flex-col">
              {t.problem.pains.map((pain) => (
                <li
                  key={pain}
                  data-pain
                  className="flex items-start gap-3 border-b border-rule py-3.5 last:border-b-0"
                >
                  <svg
                    viewBox="0 0 14 14"
                    width="14"
                    height="14"
                    aria-hidden="true"
                    className="mt-1.5 shrink-0 text-muted-soft"
                  >
                    <path
                      d="M3.5 3.5l7 7M10.5 3.5l-7 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-[1.0625rem] leading-snug text-muted">
                    {pain}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* After. The hairline is the divider — no card, no filled panel. */}
          <div className="lg:border-l lg:border-rule lg:pl-12 xl:pl-16">
            <Reveal variant="clip" delay={0.1} className="mb-8 block">
              <Figure
                slot={IMAGES.order}
                alt={t.problem.afterAlt}
                className="aspect-[4/3] w-full rounded-[16px]"
                sizes="(min-width: 1024px) 46vw, 100vw"
                pendingLabel="После"
              />
            </Reveal>

            <h3 className="t-label mb-6 text-clay">
              {t.problem.solutionLabel}
            </h3>

            <Reveal stagger={0.07}>
              <ul className="flex flex-col">
                {t.problem.solutions.map((solution) => (
                  <li
                    key={solution}
                    data-stagger
                    className="flex items-start gap-3 border-b border-rule py-3.5 last:border-b-0"
                  >
                    <svg
                      viewBox="0 0 14 14"
                      width="14"
                      height="14"
                      aria-hidden="true"
                      className="mt-1.5 shrink-0 text-clay"
                    >
                      <path
                        d="M2.5 7.4 5.6 10.5 11.5 3.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[1.0625rem] leading-snug text-ink">
                      {solution}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* The bridge. One line, given a whole band of whitespace, because it
            is the sentence the entire section exists to deliver. */}
        <Reveal className="mt-16 border-t border-rule pt-10 md:mt-20 md:pt-12">
          <RevealLines
            as="p"
            lines={[t.problem.bridge]}
            className="t-h3 max-w-[22ch] text-ink"
          />
        </Reveal>
      </div>
    </section>
  );
}
