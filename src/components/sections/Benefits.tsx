import type { Dictionary } from "@/content";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";

/**
 * Guarantees.
 *
 * Every item names a specific thing we do and the specific worry it removes —
 * "фиксируем стоимость заранее / чтобы не появились доплаты" — because
 * "высокое качество" and "индивидуальный подход" are claims a visitor has read
 * on every competitor's site and has learned to skip.
 *
 * Laid out as a numbered editorial list rather than as icon cards. Six cards
 * with six invented icons is decoration standing in for an argument, and the
 * icons would each need to mean something the words already say.
 */
export function Benefits({ t }: { t: Dictionary }) {
  return (
    <section
      id="benefits"
      className="section-y bg-paper"
      aria-labelledby="benefits-heading"
    >
      <div className="shell">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <span className="t-label mb-5 block text-muted-soft">
                {t.benefits.label}
              </span>
            </Reveal>
            <RevealLines
              as="h2"
              id="benefits-heading"
              lines={[t.benefits.heading]}
              className="t-h2 text-ink"
            />
          </div>
        </div>

        <Reveal
          stagger={0.08}
          className="mt-12 grid gap-x-10 gap-y-0 border-t border-rule md:mt-16 md:grid-cols-2 xl:grid-cols-3"
        >
          {t.benefits.items.map((item, i) => (
            <div
              key={item.title}
              data-stagger
              className="border-b border-rule py-8 md:py-9"
            >
              <span className="t-index mb-4 block text-clay">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h4 text-ink">{item.title}</h3>
              <p className="t-body mt-3 max-w-[38ch] text-[0.9375rem]">
                {item.text}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
