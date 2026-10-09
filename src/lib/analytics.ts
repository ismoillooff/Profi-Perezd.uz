/**
 * Lead-tracking event hooks.
 * ─────────────────────────────────────────────────────────────────────────
 * No pixel, container or measurement ID is hardcoded anywhere in this repo.
 * This module only *emits* — it pushes to `dataLayer` and forwards to `gtag`
 * and `fbq` if the page happens to have loaded them.
 *
 * That means marketing can add GTM, GA4 or the Meta Pixel later (via the host,
 * a tag manager, or a <Script> in the layout) and every CTA on the site is
 * already instrumented, with no code change and nothing to wire up twice.
 *
 * If nothing is installed, these calls are silent no-ops.
 */

/** The complete event vocabulary. Adding a CTA means adding it here first. */
export type LeadEvent =
  | "hero_form"
  | "price_calculator"
  | "service_cta"
  | "final_cta"
  | "phone_click"
  | "telegram_click"
  | "whatsapp_click"
  | "sticky_mobile_cta";

type EventPayload = Record<string, string | number | boolean | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * Which of these events represent an actual conversion, as opposed to an
 * intermediate interaction. Kept here so the definition lives in one place
 * rather than being re-decided inside each ad platform's UI.
 */
const CONVERSIONS: ReadonlySet<LeadEvent> = new Set<LeadEvent>([
  "hero_form",
  "price_calculator",
  "final_cta",
  "phone_click",
  "telegram_click",
  "whatsapp_click",
]);

export function track(event: LeadEvent, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;

  const detail = { event, ...payload };

  try {
    // GTM — the integration most likely to be used here.
    (w.dataLayer ??= []).push(detail);

    // GA4 direct (gtag.js without a container).
    w.gtag?.("event", event, payload);

    // Meta Pixel: standard `Lead` for real conversions so the pixel can
    // optimise, plus the specific name so the two can be told apart.
    if (CONVERSIONS.has(event)) {
      w.fbq?.("track", "Lead", { content_name: event, ...payload });
    } else {
      w.fbq?.("trackCustom", event, payload);
    }

    // A DOM event too, so a CRM/webhook script can subscribe without
    // depending on any particular analytics vendor being present.
    window.dispatchEvent(new CustomEvent("profipereezd:lead", { detail }));
  } catch {
    // Analytics must never break the page it measures.
  }
}

/**
 * Click handler for contact links. Returns a handler rather than being one, so
 * call sites read `onClick={trackClick("phone_click", { placement: "hero" })}`.
 */
export function trackClick(event: LeadEvent, payload: EventPayload = {}) {
  return () => track(event, payload);
}
