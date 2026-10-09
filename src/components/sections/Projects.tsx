"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";
import { IMAGES, type ImageSlot } from "@/content/images";
import type { Dictionary } from "@/content";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";

const PROJECT_IMAGE: ImageSlot[] = [
  IMAGES.project1,
  IMAGES.project2,
  IMAGES.project3,
  IMAGES.project4,
  IMAGES.project5,
  IMAGES.project6,
];

type Filter = "all" | "apartment" | "office" | "freight" | "furniture";

/**
 * Real work.
 *
 * Proof that the operation exists, which is a different job from the reviews:
 * a review says we were pleasant, a photograph of a loaded van says we own a
 * van. The layout is deliberately irregular — the first item spans two columns
 * — so it reads as an edited selection rather than as a stock grid.
 *
 * FACTS: `route`, `duration`, `team` and `vehicles` render only when the
 * content layer actually has them. They ship empty on purpose (see
 * `ru.ts → projects.items`): a fabricated "4 часа · 3 специалиста" in a section
 * headed "наши работы" is a lie of exactly the kind this page cannot afford.
 * Fill them in and the metric row appears by itself.
 */
export function Projects({ t }: { t: Dictionary }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.projects.filters.all },
    { id: "apartment", label: t.projects.filters.apartment },
    { id: "office", label: t.projects.filters.office },
    { id: "freight", label: t.projects.filters.freight },
    { id: "furniture", label: t.projects.filters.furniture },
  ];

  const visible = t.projects.items
    .map((item, i) => ({ item, slot: PROJECT_IMAGE[i] }))
    .filter(({ item }) => filter === "all" || item.category === filter);

  return (
    <section
      id="projects"
      className="section-y bg-paper"
      aria-labelledby="projects-heading"
    >
      <div className="shell">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <span className="t-label mb-5 block text-muted-soft">
                {t.projects.label}
              </span>
            </Reveal>
            <RevealLines
              as="h2"
              id="projects-heading"
              lines={[t.projects.heading]}
              className="t-h2 text-ink"
            />
            <Reveal>
              <p className="t-lead mt-5">{t.projects.lead}</p>
            </Reveal>
          </div>

          {/* Filters. A horizontal scroller on mobile rather than a wrapped
              three-row block, which would push the first photo off-screen. */}
          <div className="col-span-12 mt-8 lg:col-span-6 lg:mt-0">
            <Reveal>
              <div className="-mx-[var(--shell-pad)] overflow-x-auto px-[var(--shell-pad)] lg:mx-0 lg:px-0">
                <div
                  role="tablist"
                  aria-label={t.projects.label}
                  className="flex gap-2 lg:justify-end"
                >
                  {filters.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={filter === f.id}
                      onClick={() => setFilter(f.id)}
                      className={cx(
                        // h-11: these are the only filter controls on the page
                        // and they are thumb-operated on every mobile width.
                        "h-11 shrink-0 rounded-full border px-4 text-[0.875rem] font-medium transition-colors duration-200",
                        filter === f.id
                          ? "border-ink bg-ink text-white"
                          : "border-rule-strong text-muted hover:border-ink hover:text-ink",
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ item, slot }, i) => (
            <Reveal
              key={item.id}
              variant="clip"
              delay={(i % 3) * 0.08}
              className={cx(
                "group flex flex-col",
                // The lead item takes the full width of the first row when
                // nothing is filtered — the irregularity is what stops this
                // reading as a stock gallery.
                filter === "all" && i === 0 && "md:col-span-2 lg:col-span-2",
              )}
            >
              <Figure
                slot={slot}
                alt={item.title}
                className={cx(
                  "w-full rounded-[16px]",
                  filter === "all" && i === 0
                    ? "aspect-[16/10]"
                    : "aspect-[4/3]",
                )}
                imageClassName="transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                pendingLabel={t.projects.filters[item.category as Filter]}
              />

              <div className="mt-5">
                <span className="t-label text-clay">
                  {t.projects.filters[item.category as Filter]}
                </span>
                <h3 className="t-h4 mt-2 text-ink">{item.title}</h3>
                <p className="t-small mt-2 max-w-[42ch]">{item.note}</p>

                {(item.route ||
                  item.duration ||
                  item.team ||
                  item.vehicles) && (
                  <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-rule pt-4">
                    {item.route && (
                      <div className="t-label text-muted">{item.route}</div>
                    )}
                    {item.duration && (
                      <div className="t-label tnum text-muted">
                        {item.duration} {t.projects.durationLabel}
                      </div>
                    )}
                    {item.team && (
                      <div className="t-label tnum text-muted">
                        {item.team} {t.projects.teamLabel}
                      </div>
                    )}
                    {item.vehicles && (
                      <div className="t-label tnum text-muted">
                        {item.vehicles} {t.projects.vehicleLabel}
                      </div>
                    )}
                  </dl>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
