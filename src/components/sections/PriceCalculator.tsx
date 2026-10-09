"use client";

import { useMemo, useState } from "react";
import { cx } from "@/lib/cx";
import { track } from "@/lib/analytics";
import { estimate, formatSum, type MoveType } from "@/content/pricing";
import type { Dictionary, Locale } from "@/content";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";
import { LeadForm } from "@/components/forms/LeadForm";

const STEPS = ["type", "volume", "route", "extras", "contact"] as const;
type Step = (typeof STEPS)[number];

/**
 * Price configurator.
 *
 * The page's main lead magnet, and it is built around one idea: ask for the
 * phone number LAST. A visitor who has already answered four easy questions
 * has invested something, and finishes; the same visitor shown a phone field
 * first simply leaves. Nothing before the final step is a form.
 *
 * ON NOT SHOWING A PRICE — see `content/pricing.ts`. While the company has not
 * supplied real rates the last step collects the configuration and asks for a
 * callback. Inventing a number here would be the most damaging thing on the
 * whole page: a visitor quoted one figure by the site and a different one by
 * the manager stops believing anything else it said. The moment real rates are
 * filled in, this component shows a range instead, with no change here.
 */
export function PriceCalculator({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) {
  const c = t.calculator;

  const [step, setStep] = useState<Step>("type");
  const [moveType, setMoveType] = useState<MoveType | null>(null);
  const [volume, setVolume] = useState<string | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [floorFrom, setFloorFrom] = useState("");
  const [floorTo, setFloorTo] = useState("");
  const [liftFrom, setLiftFrom] = useState(true);
  const [liftTo, setLiftTo] = useState(true);
  const [extras, setExtras] = useState<string[]>([]);

  const index = STEPS.indexOf(step);
  const isFreight = moveType === "freight";
  const volumeOptions = moveType
    ? c.steps.volume.optionsByType[moveType]
    : c.steps.volume.optionsByType.apartment;

  const quote = useMemo(
    () =>
      estimate({
        volume,
        floorFrom: floorFrom ? Number(floorFrom) : null,
        floorTo: floorTo ? Number(floorTo) : null,
        liftFrom,
        liftTo,
        extras,
      }),
    [volume, floorFrom, floorTo, liftFrom, liftTo, extras],
  );

  /** Human-readable configuration, sent with the lead so a manager can quote. */
  const summary = useMemo(() => {
    const typeLabel = c.steps.type.options.find((o) => o.id === moveType)?.label;
    const volumeLabel = volumeOptions.find((o) => o.id === volume)?.label;
    const extraLabels = c.steps.extras.options
      .filter((o) => extras.includes(o.id))
      .map((o) => o.label);

    const route = [
      from && `${c.steps.route.fromLabel}: ${from}${floorFrom ? `, ${floorFrom} эт.${liftFrom ? "" : ", без лифта"}` : ""}`,
      to && `${c.steps.route.toLabel}: ${to}${floorTo ? `, ${floorTo} эт.${liftTo ? "" : ", без лифта"}` : ""}`,
    ]
      .filter(Boolean)
      .join(" → ");

    return [
      typeLabel && `${c.summary.typeLabel}: ${typeLabel}`,
      volumeLabel && `${c.summary.volumeLabel}: ${volumeLabel}`,
      route && `${c.summary.routeLabel}: ${route}`,
      extraLabels.length
        ? `${c.summary.extrasLabel}: ${extraLabels.join(", ")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");
  }, [
    c,
    moveType,
    volume,
    volumeOptions,
    extras,
    from,
    to,
    floorFrom,
    floorTo,
    liftFrom,
    liftTo,
  ]);

  const canAdvance =
    (step === "type" && moveType !== null) ||
    (step === "volume" && volume !== null) ||
    step === "route" ||
    step === "extras";

  const goNext = () => {
    const next = STEPS[Math.min(index + 1, STEPS.length - 1)];
    if (next === "contact") {
      track("price_calculator", {
        step: "reached_contact",
        move_type: moveType ?? "",
      });
    }
    setStep(next);
  };

  const goBack = () => setStep(STEPS[Math.max(index - 1, 0)]);

  const toggleExtra = (id: string) =>
    setExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <section
      id="price"
      className="section-y scroll-mt-24 bg-mist"
      aria-labelledby="price-heading"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Pitch ---------------------------------------------------------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="t-label mb-5 block text-muted-soft">
                {c.label}
              </span>
            </Reveal>
            <RevealLines
              as="h2"
              id="price-heading"
              lines={[c.heading]}
              className="t-h2 text-ink"
            />
            <Reveal>
              <p className="t-lead mt-5">{c.lead}</p>
            </Reveal>

            <Reveal className="mt-8 hidden lg:block">
              <ul className="flex flex-col gap-3 border-t border-rule pt-8">
                {t.hero.trust.map((item) => (
                  <li
                    key={item}
                    className="t-label flex items-center gap-2.5 text-muted"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      width="12"
                      height="12"
                      aria-hidden="true"
                      className="shrink-0 text-clay"
                    >
                      <path
                        d="M2 6.3 4.6 9 10 3.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Configurator --------------------------------------------------- */}
          <Reveal variant="scale" className="lg:col-span-7">
            <div className="rounded-[20px] border border-rule bg-paper p-6 md:p-9">
              {/* Progress. Segments, not a percentage — the visitor needs to
                  see that there are only a few questions left. */}
              <div className="mb-8 flex items-center gap-4">
                <div aria-hidden="true" className="flex flex-1 gap-1.5">
                  {STEPS.map((s, i) => (
                    <span
                      key={s}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-surface"
                    >
                      <span
                        className={cx(
                          "block h-full origin-left rounded-full bg-clay transition-transform duration-500",
                          "[transition-timing-function:var(--ease-expo)]",
                          i <= index ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </span>
                  ))}
                </div>
                <span className="t-label tnum shrink-0 text-muted-soft">
                  {c.stepLabel} {index + 1} {c.of} {STEPS.length}
                </span>
              </div>

              {/* Step 1 — what is moving */}
              {step === "type" && (
                <Fieldset legend={c.steps.type.title}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {c.steps.type.options.map((option) => (
                      <Choice
                        key={option.id}
                        selected={moveType === option.id}
                        onClick={() => {
                          setMoveType(option.id as MoveType);
                          // Volumes differ per type; a stale value would send
                          // "3 комнаты" with "Офис".
                          setVolume(null);
                        }}
                      >
                        {option.label}
                      </Choice>
                    ))}
                  </div>
                </Fieldset>
              )}

              {/* Step 2 — volume */}
              {step === "volume" && (
                <Fieldset legend={c.steps.volume.title} hint={c.steps.volume.hint}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {volumeOptions.map((option) => (
                      <Choice
                        key={option.id}
                        selected={volume === option.id}
                        onClick={() => setVolume(option.id)}
                      >
                        {option.label}
                      </Choice>
                    ))}
                  </div>
                </Fieldset>
              )}

              {/* Step 3 — route */}
              {step === "route" && (
                <Fieldset legend={c.steps.route.title}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <RouteSide
                      idPrefix="from"
                      districtLabel={c.steps.route.fromLabel}
                      floorLabel={c.steps.route.floorFrom}
                      placeholder={c.steps.route.placeholder}
                      districts={c.steps.route.districts}
                      district={from}
                      onDistrict={setFrom}
                      floor={floorFrom}
                      onFloor={setFloorFrom}
                      lift={liftFrom}
                      onLift={setLiftFrom}
                      liftYes={c.steps.route.liftYes}
                      liftNo={c.steps.route.liftNo}
                      showFloor={!isFreight}
                    />
                    <RouteSide
                      idPrefix="to"
                      districtLabel={c.steps.route.toLabel}
                      floorLabel={c.steps.route.floorTo}
                      placeholder={c.steps.route.placeholder}
                      districts={c.steps.route.districts}
                      district={to}
                      onDistrict={setTo}
                      floor={floorTo}
                      onFloor={setFloorTo}
                      lift={liftTo}
                      onLift={setLiftTo}
                      liftYes={c.steps.route.liftYes}
                      liftNo={c.steps.route.liftNo}
                      showFloor={!isFreight}
                    />
                  </div>
                </Fieldset>
              )}

              {/* Step 4 — extras */}
              {step === "extras" && (
                <Fieldset legend={c.steps.extras.title} hint={c.steps.extras.hint}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {c.steps.extras.options.map((option) => (
                      <Choice
                        key={option.id}
                        selected={extras.includes(option.id)}
                        multi
                        onClick={() => toggleExtra(option.id)}
                      >
                        {option.label}
                      </Choice>
                    ))}
                  </div>
                </Fieldset>
              )}

              {/* Step 5 — summary + contact */}
              {step === "contact" && (
                <div>
                  <div className="mb-7 rounded-[14px] border border-rule bg-mist p-5">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <h3 className="t-label text-muted">{c.summary.title}</h3>
                      <button
                        type="button"
                        onClick={() => setStep("type")}
                        className="t-label text-clay underline underline-offset-2"
                      >
                        {c.summary.edit}
                      </button>
                    </div>
                    <dl className="flex flex-col gap-1.5 text-[0.9375rem]">
                      {summary.split("\n").map((line) => {
                        const [key, ...rest] = line.split(": ");
                        return (
                          <div key={line} className="flex gap-2">
                            <dt className="shrink-0 text-muted">{key}:</dt>
                            <dd className="font-medium text-ink">
                              {rest.join(": ")}
                            </dd>
                          </div>
                        );
                      })}
                      {extras.length === 0 && (
                        <div className="text-muted">{c.summary.extrasNone}</div>
                      )}
                    </dl>
                  </div>

                  {quote ? (
                    <div className="mb-7">
                      <h3 className="t-label mb-2 text-muted">
                        {c.withEstimate.title}
                      </h3>
                      <p className="tnum text-[1.75rem] font-bold tracking-[-0.03em] text-ink">
                        {c.withEstimate.from} {formatSum(quote.from)} —{" "}
                        {formatSum(quote.to)} {c.withEstimate.currency}
                      </p>
                      <p className="t-small mt-2">{c.withEstimate.note}</p>
                    </div>
                  ) : (
                    <div className="mb-7">
                      <h3 className="t-h4 text-ink">{c.noEstimate.title}</h3>
                      <p className="t-body mt-2 text-[0.9375rem]">
                        {c.noEstimate.text}
                      </p>
                    </div>
                  )}

                  <LeadForm
                    t={t}
                    locale={locale}
                    event="price_calculator"
                    context={{
                      summary,
                      moveType:
                        c.steps.type.options.find((o) => o.id === moveType)
                          ?.label ?? "",
                    }}
                  />
                </div>
              )}

              {/* Navigation. Hidden on the last step, where the form's own
                  submit button is the only action that should be visible. */}
              {step !== "contact" && (
                <div className="mt-8 flex items-center gap-3 border-t border-rule pt-6">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex h-12 items-center rounded-[10px] border border-rule-strong px-5 text-[0.9375rem] font-semibold text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      {c.back}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canAdvance}
                    className={cx(
                      "ml-auto inline-flex h-12 items-center gap-2 rounded-[10px] px-6",
                      "text-[0.9375rem] font-semibold transition-colors duration-200",
                      canAdvance
                        ? "bg-clay text-white hover:bg-clay-deep"
                        : "cursor-not-allowed bg-surface text-muted-soft",
                    )}
                  >
                    {c.next}
                    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                      <path
                        d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="square"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Building blocks ────────────────────────────────────────────────────── */

function Fieldset({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="t-h4 mb-1 text-ink">{legend}</legend>
      {hint && <p className="t-small mb-5">{hint}</p>}
      <div className={hint ? "" : "mt-5"}>{children}</div>
    </fieldset>
  );
}

/**
 * A selectable option.
 *
 * A real `<button>` with `aria-pressed`, not a styled checkbox: the visual is
 * a large tap target with no visible box to check, and `aria-pressed` is what
 * makes that honest to a screen reader.
 */
function Choice({
  selected,
  onClick,
  multi = false,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cx(
        "flex min-h-[56px] items-center gap-3 rounded-[10px] border px-4 py-3 text-left",
        "text-[0.9375rem] font-medium transition-colors duration-200",
        "[transition-timing-function:var(--ease-expo)]",
        selected
          ? "border-clay bg-clay-wash text-ink"
          : "border-rule-strong bg-paper-pure text-muted hover:border-ink hover:text-ink",
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          "flex h-5 w-5 shrink-0 items-center justify-center border transition-colors",
          multi ? "rounded-[5px]" : "rounded-full",
          selected ? "border-clay bg-clay text-white" : "border-rule-strong",
        )}
      >
        {selected && (
          <svg viewBox="0 0 12 12" width="11" height="11">
            <path
              d="M2 6.3 4.6 9 10 3.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {children}
    </button>
  );
}

function RouteSide({
  idPrefix,
  districtLabel,
  floorLabel,
  placeholder,
  districts,
  district,
  onDistrict,
  floor,
  onFloor,
  lift,
  onLift,
  liftYes,
  liftNo,
  showFloor,
}: {
  idPrefix: string;
  districtLabel: string;
  floorLabel: string;
  placeholder: string;
  districts: readonly string[];
  district: string;
  onDistrict: (value: string) => void;
  floor: string;
  onFloor: (value: string) => void;
  lift: boolean;
  onLift: (value: boolean) => void;
  liftYes: string;
  liftNo: string;
  showFloor: boolean;
}) {
  const field =
    "h-[52px] w-full rounded-[10px] border border-rule-strong bg-paper-pure px-4 " +
    "text-[1rem] text-ink transition-colors duration-200 focus:border-ink";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-district`} className="t-label text-muted">
          {districtLabel}
        </label>
        <select
          id={`${idPrefix}-district`}
          value={district}
          onChange={(e) => onDistrict(e.target.value)}
          className={cx(field, !district && "text-muted-soft")}
        >
          <option value="">{placeholder}</option>
          {districts.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {showFloor && (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${idPrefix}-floor`} className="t-label text-muted">
              {floorLabel}
            </label>
            <input
              id={`${idPrefix}-floor`}
              type="number"
              inputMode="numeric"
              min={1}
              max={40}
              value={floor}
              onChange={(e) => onFloor(e.target.value)}
              className={cx(field, "tnum")}
            />
          </div>

          <div className="flex gap-2">
            <MiniToggle active={lift} onClick={() => onLift(true)}>
              {liftYes}
            </MiniToggle>
            <MiniToggle active={!lift} onClick={() => onLift(false)}>
              {liftNo}
            </MiniToggle>
          </div>
        </>
      )}
    </div>
  );
}

function MiniToggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "h-11 flex-1 rounded-[10px] border text-[0.875rem] font-medium transition-colors duration-200",
        active
          ? "border-ink bg-ink text-white"
          : "border-rule-strong text-muted hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
