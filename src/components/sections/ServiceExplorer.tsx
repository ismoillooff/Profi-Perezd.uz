"use client";

import { useCallback, useId, useState } from "react";
import { cx } from "@/lib/cx";
import { track } from "@/lib/analytics";
import { IMAGES, type ImageSlot } from "@/content/images";
import type { Dictionary } from "@/content";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";

/** Service id → image slot. Kept beside the section that uses it. */
const SERVICE_IMAGE: Record<string, ImageSlot> = {
  apartment: IMAGES.svcApartment,
  office: IMAGES.svcOffice,
  movers: IMAGES.svcMovers,
  freight: IMAGES.svcFreight,
  furniture: IMAGES.svcFurniture,
  packing: IMAGES.svcPacking,
  fragile: IMAGES.svcFragile,
};

type Service = Dictionary["services"]["items"][number];

/**
 * Services.
 *
 * A large editorial index, not seven identical cards. Seven cards is the exact
 * pattern the brief rules out, and it also flattens the offer: a grid says all
 * seven matter equally, when in practice most visitors want "квартирный
 * переезд" and are scanning for it.
 *
 * Desktop: the list is the interface. Hovering or focusing a row swaps a large
 * preview beside it, so the visitor browses the whole offer without a single
 * page load.
 * Mobile: the same data as an accordion, because a hover preview on a
 * touchscreen is a preview nobody can trigger.
 *
 * IMAGE LOADING — preview frames mount as they are first activated and then
 * stay mounted. Rendering all seven upfront would pull seven full-size images
 * into a section most visitors scroll past; remounting on every hover would
 * flash an empty box each time. Mounting on demand and keeping them costs one
 * load per service the visitor actually looked at.
 */
export function ServiceExplorer({ t }: { t: Dictionary }) {
  const services = t.services.items;
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const [openId, setOpenId] = useState<string | null>(null);
  const panelId = useId();

  const activate = useCallback((index: number) => {
    setActive(index);
    setSeen((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }, []);

  const current = services[active];

  return (
    <section
      id="services"
      className="section-y bg-paper"
      aria-labelledby="services-heading"
    >
      <div className="shell">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <span className="t-label mb-5 block text-muted-soft">
                {t.services.label}
              </span>
            </Reveal>
            <RevealLines
              as="h2"
              id="services-heading"
              lines={[t.services.heading]}
              className="t-h2 text-ink"
            />
          </div>
          <div className="col-span-12 mt-5 lg:col-span-5 lg:mt-0 lg:self-end">
            <Reveal>
              <p className="t-lead">{t.services.lead}</p>
            </Reveal>
          </div>
        </div>

        {/* ── Desktop: index + sticky preview ────────────────────────────── */}
        <div className="mt-14 hidden gap-0 lg:grid lg:grid-cols-12">
          <ul
            className="col-span-7 border-t border-rule"
            onMouseLeave={() => activate(active)}
          >
            {services.map((service, i) => (
              <li key={service.id} className="border-b border-rule">
                <button
                  type="button"
                  onMouseEnter={() => activate(i)}
                  onFocus={() => activate(i)}
                  onClick={() => {
                    activate(i);
                    document
                      .getElementById("price")
                      ?.scrollIntoView({ block: "start" });
                    track("service_cta", { service: service.id });
                  }}
                  aria-describedby={panelId}
                  className={cx(
                    "group flex w-full items-baseline gap-6 py-6 text-left transition-colors duration-300",
                    "[transition-timing-function:var(--ease-expo)]",
                  )}
                >
                  <span
                    className={cx(
                      "t-index w-8 shrink-0 transition-colors duration-300",
                      i === active ? "text-clay" : "text-muted-soft",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={cx(
                      "t-h3 transition-[color,transform] duration-300",
                      "[transition-timing-function:var(--ease-expo)]",
                      i === active
                        ? "translate-x-1 text-ink"
                        : "text-muted-soft group-hover:text-ink",
                    )}
                  >
                    {service.name}
                  </span>

                  <svg
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    aria-hidden="true"
                    className={cx(
                      "ml-auto shrink-0 self-center transition-[opacity,transform] duration-300",
                      "[transition-timing-function:var(--ease-expo)]",
                      i === active
                        ? "translate-x-0 text-clay opacity-100"
                        : "-translate-x-2 opacity-0",
                    )}
                  >
                    <path
                      d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="square"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* Preview. Sticky so it stays beside whichever row is hovered. */}
          <div className="col-span-5 pl-12 xl:pl-16">
            <div
              id={panelId}
              aria-live="polite"
              className="sticky top-[104px] flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-surface">
                {services.map((service, i) =>
                  seen.has(i) ? (
                    <div
                      key={service.id}
                      className={cx(
                        "absolute inset-0 transition-opacity duration-500",
                        "[transition-timing-function:var(--ease-expo)]",
                        i === active ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <Figure
                        slot={SERVICE_IMAGE[service.id]}
                        alt={service.imageAlt}
                        className="h-full w-full"
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        pendingLabel={service.name}
                      />
                    </div>
                  ) : null,
                )}
              </div>

              <ServiceDetail service={current} t={t} className="mt-7" />
            </div>
          </div>
        </div>

        {/* ── Mobile / tablet: accordion ─────────────────────────────────── */}
        <ul className="mt-12 border-t border-rule lg:hidden">
          {services.map((service, i) => {
            const open = openId === service.id;
            return (
              <li key={service.id} className="border-b border-rule">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : service.id)}
                    aria-expanded={open}
                    aria-controls={`${panelId}-${service.id}`}
                    className="flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="t-index w-7 shrink-0 text-clay">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="t-h4 flex-1 text-ink">{service.name}</span>
                    <span
                      aria-hidden="true"
                      className={cx(
                        "relative h-5 w-5 shrink-0 text-muted transition-transform duration-300",
                        "[transition-timing-function:var(--ease-expo)]",
                        open && "rotate-45",
                      )}
                    >
                      <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-current" />
                      <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-current" />
                    </span>
                  </button>
                </h3>

                {/* Grid-rows animation: transitions height without measuring,
                    and without the jump `height: auto` would cause. */}
                <div
                  id={`${panelId}-${service.id}`}
                  className={cx(
                    "grid transition-[grid-template-rows] duration-[420ms]",
                    "[transition-timing-function:var(--ease-expo)]",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8">
                      <Figure
                        slot={SERVICE_IMAGE[service.id]}
                        alt={service.imageAlt}
                        className="mb-6 aspect-[3/2] w-full rounded-[14px]"
                        sizes="100vw"
                        pendingLabel={service.name}
                      />
                      <ServiceDetail service={service} t={t} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * The product-like body of a service: what it is, who it is for, what is
 * included, what moves the price, and what the client is left with.
 *
 * Shared between the desktop preview and the mobile accordion so the two can
 * never answer the same question differently.
 */
function ServiceDetail({
  service,
  t,
  className,
}: {
  service: Service;
  t: Dictionary;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[1.0625rem] font-medium leading-snug text-ink">
        {service.summary}
      </p>
      <p className="t-small mt-2">{service.forWhom}</p>

      <h4 className="t-label mt-6 text-muted-soft">
        {t.services.detailsLabel}
      </h4>
      <ul className="mt-3 flex flex-col gap-1.5">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <svg
              viewBox="0 0 12 12"
              width="12"
              height="12"
              aria-hidden="true"
              className="mt-[0.4rem] shrink-0 text-signal"
            >
              <path
                d="M2 6.3 4.6 9 10 3.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[0.9375rem] leading-snug text-muted">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <h4 className="t-label mt-6 text-muted-soft">
        {t.services.factorsLabel}
      </h4>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {service.factors.map((factor) => (
          <li
            key={factor}
            className="rounded-md bg-mist px-2.5 py-1.5 text-[0.8125rem] leading-snug text-muted"
          >
            {factor}
          </li>
        ))}
      </ul>

      <p className="mt-6 border-l-2 border-clay pl-4 text-[0.9375rem] leading-snug text-ink">
        {service.result}
      </p>

      <a
        href="#price"
        onClick={() => track("service_cta", { service: service.id })}
        className={cx(
          "mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-[10px]",
          "border border-rule-strong px-5 text-[0.9375rem] font-semibold text-ink",
          "transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white",
        )}
      >
        {t.services.cta}
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path
            d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </svg>
      </a>
    </div>
  );
}
