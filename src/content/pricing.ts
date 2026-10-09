/**
 * Price estimation for the calculator.
 * ─────────────────────────────────────────────────────────────────────────
 * SHIPS DISABLED ON PURPOSE.
 *
 * The redesign audit found no published prices anywhere in the business's
 * existing material, and inventing a "typical market rate" for a real company
 * is the one mistake this page cannot recover from: a visitor who is quoted
 * 2 000 000 by the site and 3 500 000 by the manager will not book, and will
 * not trust anything else the page told them either.
 *
 * So while `RATES` is null the calculator collects the visitor's parameters
 * and routes them to a callback ("оставьте номер — рассчитаем точно"), which
 * is a perfectly good lead magnet and is honest.
 *
 * TO TURN ON REAL ESTIMATES
 *   Fill in `RATES` below with the company's actual numbers. Nothing else
 *   needs to change — the calculator detects it and starts showing a range.
 *
 *   base       — starting price for that volume, in so'm
 *   perFloor   — added per floor when there is no lift, per side
 *   extras     — added per selected extra service
 *   spread     — how wide the quoted range is (0.2 = ±20%)
 */

export type MoveType = "apartment" | "house" | "office" | "freight";

export type Rates = {
  base: Record<string, number>;
  perFloorNoLift: number;
  extras: Record<string, number>;
  spread: number;
};

/** TODO(client): replace with real figures to enable on-site estimates. */
export const RATES: Rates | null = null;

export type EstimateInput = {
  volume: string | null;
  floorFrom: number | null;
  floorTo: number | null;
  liftFrom: boolean;
  liftTo: boolean;
  extras: string[];
};

export type Estimate = { from: number; to: number };

/**
 * Returns null whenever an estimate would be a guess — either because rates
 * have not been supplied, or because the visitor has not chosen a volume yet.
 * Callers render the "leave your number" path in that case.
 */
export function estimate(input: EstimateInput): Estimate | null {
  if (!RATES || !input.volume) return null;

  const base = RATES.base[input.volume];
  if (typeof base !== "number") return null;

  let total = base;

  // Stairs are charged per side, and only where there is no lift. Ground and
  // first floor cost nothing extra in either case.
  const stairs = (floor: number | null, hasLift: boolean) =>
    !hasLift && floor && floor > 1 ? (floor - 1) * RATES.perFloorNoLift : 0;

  total += stairs(input.floorFrom, input.liftFrom);
  total += stairs(input.floorTo, input.liftTo);

  for (const extra of input.extras) {
    total += RATES.extras[extra] ?? 0;
  }

  const spread = RATES.spread;
  // Rounded to the nearest 50 000 so the range reads as an estimate rather
  // than as a precise quote the company would then be held to.
  const round = (value: number) => Math.round(value / 50_000) * 50_000;

  return {
    from: round(total * (1 - spread)),
    to: round(total * (1 + spread)),
  };
}

/** Formats a so'm amount the way it is written locally: 2 500 000. */
export function formatSum(value: number): string {
  return value.toLocaleString("ru-RU").replace(/,/g, " ");
}
