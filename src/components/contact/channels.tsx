import type { ComponentType } from "react";
import { company, whatsappHref } from "@/content/company";
import type { Dictionary } from "@/content";
import type { LeadEvent } from "@/lib/analytics";

/* ── Icons ──────────────────────────────────────────────────────────────
   Drawn at 20×20 on a 1.7 stroke so they sit at the same optical weight as
   the interface type. Filled glyphs (Telegram, WhatsApp) are the brands' own
   silhouettes — an outlined approximation of either reads as a knock-off. */

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className={className} fill="none">
      <path
        d="M17 13.6v2.1a1.4 1.4 0 0 1-1.5 1.4 13.8 13.8 0 0 1-6-2.1 13.6 13.6 0 0 1-4.2-4.2 13.8 13.8 0 0 1-2.1-6A1.4 1.4 0 0 1 4.6 3.3h2.1a1.4 1.4 0 0 1 1.4 1.2c.1.7.3 1.3.5 1.9a1.4 1.4 0 0 1-.3 1.5l-.9.9a11.2 11.2 0 0 0 4.2 4.2l.9-.9a1.4 1.4 0 0 1 1.5-.3c.6.2 1.2.4 1.9.5a1.4 1.4 0 0 1 1.2 1.4z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className={className}>
      <path
        d="M17.6 3.4 2.9 9.1c-.9.4-.9.9-.2 1.1l3.7 1.2 1.4 4.3c.2.5.3.7.6.7.3 0 .5-.2.7-.4l1.8-1.7 3.7 2.7c.7.4 1.2.2 1.4-.6l2.4-11.4c.2-1-.4-1.4-1-1.2zM6.9 11.1l8-5c.4-.2.7-.1.4.2l-6.8 6.2-.3 2.8z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className={className}>
      <path
        d="M10 1.7a8.2 8.2 0 0 0-7 12.5l-1.2 4.3 4.4-1.2A8.2 8.2 0 1 0 10 1.7zm0 1.6a6.6 6.6 0 0 1 5.6 10.1l.7 2.5-2.6-.7A6.6 6.6 0 1 1 10 3.3zm-3 3c-.2 0-.5.1-.7.4-.2.3-.7.7-.7 1.7s.7 2 .8 2.1c.1.2 1.4 2.3 3.5 3.1 1.7.7 2 .6 2.4.5.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1l-.6-.3-1.4-.7c-.2 0-.4-.1-.5.1l-.6.8c-.1.2-.2.2-.4.1a5.4 5.4 0 0 1-2.7-2.4c-.2-.3 0-.4.1-.5l.4-.5.2-.4v-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Channel model ─────────────────────────────────────────────────────── */

export type Channel = {
  id: "phone" | "telegram" | "whatsapp";
  label: string;
  /** The number/handle, for places that show it as well as link to it. */
  display: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  event: LeadEvent;
  /** `tel:` and `https:` need different link semantics. */
  external: boolean;
};

/**
 * The site's contact channels, in priority order.
 *
 * Built in ONE place so the hero, the desktop rail, the mobile action bar, the
 * closing CTA and the footer cannot drift apart — and so WhatsApp appears in
 * all five the moment a number is added to `company.ts`, or in none of them
 * while it is null. There is no configuration in which the page renders a dead
 * WhatsApp link.
 */
export function getChannels(t: Dictionary): Channel[] {
  const channels: Channel[] = [
    {
      id: "phone",
      label: t.common.call,
      display: company.phone.display,
      href: company.phone.href,
      Icon: PhoneIcon,
      event: "phone_click",
      external: false,
    },
    {
      id: "telegram",
      label: t.common.telegram,
      display: company.telegram.handle,
      href: company.telegram.href,
      Icon: TelegramIcon,
      event: "telegram_click",
      external: true,
    },
  ];

  if (whatsappHref) {
    channels.push({
      id: "whatsapp",
      label: t.common.whatsapp,
      display: company.phone.display,
      href: whatsappHref,
      Icon: WhatsAppIcon,
      event: "whatsapp_click",
      external: true,
    });
  }

  return channels;
}

/** Props every outbound contact link needs, so no call site forgets `rel`. */
export function linkProps(channel: Channel) {
  return channel.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
    : {};
}
