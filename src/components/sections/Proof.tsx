import { company } from "@/content/company";
import type { Dictionary } from "@/content";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";

/**
 * Statistics + clients, in one band.
 *
 * The brief lists these as two sections. They are one here on purpose: both
 * answer "can I trust you", they sit next to each other in the page order, and
 * running them as two separate title-plus-grid blocks twenty seconds apart is
 * precisely the template rhythm the brief warns against. Merged, the numbers
 * and the names reinforce each other — scale, then who trusted it.
 *
 * CLIENT NAMES are set as type, not as logo files, because the business has no
 * logo assets for them. A wordmark set in the site's own face is honest and
 * looks deliberate; a screenshot of a logo scraped off a website looks like
 * exactly what it is.
 * TODO(client): supply real SVG logos and this becomes an image row.
 */
export function Proof({ t }: { t: Dictionary }) {
  return (
    <section
      id="about"
      className="section-y bg-paper"
      aria-labelledby="proof-heading"
    >
      <div className="shell">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <span className="t-label mb-5 block text-muted-soft">
                {t.stats.label}
              </span>
            </Reveal>
            <RevealLines
              as="h2"
              id="proof-heading"
              lines={[t.stats.heading]}
              className="t-h2 text-ink"
            />
          </div>
          <div className="col-span-12 mt-5 lg:col-span-5 lg:mt-0 lg:self-end">
            <Reveal>
              <p className="t-lead">{t.stats.lead}</p>
            </Reveal>
          </div>
        </div>

        {/* Numbers ---------------------------------------------------------- */}
        <Reveal
          stagger={0.1}
          className="mt-14 grid gap-x-8 gap-y-10 border-t border-rule pt-12 sm:grid-cols-3 md:mt-16"
        >
          {t.stats.items.map((item) => (
            <div key={item.caption} data-stagger className="flex flex-col">
              <span className="t-stat text-ink">
                <Counter
                  value={item.value}
                  suffix={item.suffix}
                  group={item.value >= 1000}
                />
              </span>
              <span className="t-body mt-3 max-w-[22ch] text-[0.9375rem]">
                {item.caption}
              </span>
            </div>
          ))}
        </Reveal>

        {/* Clients ---------------------------------------------------------- */}
        <div className="mt-16 border-t border-rule pt-12 md:mt-20">
          <Reveal>
            <h3 className="t-h4 text-ink">{t.clients.heading}</h3>
            <p className="t-small mt-2">{t.clients.note}</p>
          </Reveal>

          <Reveal
            stagger={0.07}
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-rule bg-rule sm:grid-cols-4"
          >
            {company.clients.map((client) => (
              <div
                key={client.slug}
                data-stagger
                className="flex min-h-[92px] items-center justify-center bg-paper px-4 py-6 text-center"
              >
                <span className="text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-muted transition-colors duration-300 hover:text-ink">
                  {client.name}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
