import type { Dictionary } from "@/content";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The strip directly under the hero.
 *
 * Deliberately quiet and only ~140px tall: its job is to catch the visitor at
 * the moment they leave the photograph and confirm the company is real, then
 * hand them straight to the problem story. A full statistics section here
 * would spend the page's strongest scroll position on numbers the visitor has
 * no reason to care about yet — those live further down, after the work has
 * been shown.
 */
export function TrustBar({ t }: { t: Dictionary }) {
  return (
    <section className="border-b border-rule bg-paper">
      <div className="shell">
        <Reveal
          stagger={0.07}
          className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:py-12"
        >
          {t.trustBar.items.map((item) => (
            <div
              key={item.caption}
              data-stagger
              className="flex flex-col gap-1.5 border-l border-rule pl-4 md:pl-5"
            >
              <span className="flex items-baseline gap-1">
                <span className="tnum text-[1.75rem] font-bold leading-none tracking-[-0.03em] text-ink md:text-[2rem]">
                  {item.value}
                </span>
                <span className="text-[0.9375rem] font-semibold text-clay">
                  {item.unit}
                </span>
              </span>
              <span className="text-[0.8125rem] leading-snug text-muted">
                {item.caption}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
