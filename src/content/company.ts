/**
 * Single source of truth for company data.
 * ─────────────────────────────────────────────────────────────────────────
 * Everything here that is NOT marked TODO(client) was read off the live site
 * (profipereezd.uz) during the redesign audit and is therefore real:
 * both phone numbers, the Telegram handle, the email, the social profiles and
 * the two counters (10 years / 2000+ moves) which came from the Elementor
 * `data-to-value` attributes rather than from marketing copy.
 *
 * Nothing here may be invented. No awards, no insurance claims, no employee
 * counts, no certifications — the brief forbids them and a moving company's
 * whole pitch is trustworthiness.
 */

export const company = {
  name: "Profi Pereezd",
  legalName: "Profi Pereezd",
  /** Verified: the live site's counter reads "10 лет опыта". */
  yearsOfExperience: 10,
  /** Verified: the live site's counter reads "2000+ переездов". */
  completedMoves: 2000,

  siteUrl: "https://profipereezd.uz",

  /* --- Contact ---------------------------------------------------------- */

  phone: {
    display: "+998 97 125-65-65",
    href: "tel:+998971256565",
  },
  phoneSecondary: {
    display: "+998 97 713-10-08",
    href: "tel:+998977131008",
  },
  email: {
    display: "contact@profipereezd.uz",
    href: "mailto:contact@profipereezd.uz",
  },

  /**
   * Telegram: the public account from the live site's header.
   * `channel` is the group invite link that also appears there — kept for the
   * footer only, because sending a lead into a group chat is not a support
   * channel.
   */
  telegram: {
    handle: "@profipereezd_uz",
    href: "https://t.me/profipereezd_uz",
    channel: "https://t.me/+lUGpDg2hc3A1NTli",
  },

  /**
   * WhatsApp was NOT present anywhere on the live site and was not confirmed
   * during the redesign brief, so it is off by default.
   *
   * TODO(client): if the company does use WhatsApp, set `number` to the digits
   * only (e.g. "998971256565"). Every WhatsApp affordance on the site — hero,
   * desktop sticky rail, mobile action bar, final CTA, footer — reads this one
   * value and appears automatically. Leaving it null renders no dead links.
   */
  whatsapp: {
    number: null as string | null,
  },

  social: {
    instagram: "https://www.instagram.com/profipereezduz/",
    facebook: "https://www.facebook.com/ProfiPereezduz-171317207954077",
  },

  /* --- Location --------------------------------------------------------- */

  address: {
    // TODO(client): the live site publishes no street address. Fill this in
    // (or delete it) before launch — LocalBusiness structured data is far
    // stronger with a real one, and "Ташкент" alone is what ships today.
    street: null as string | null,
    city: "Ташкент",
    region: "Ташкент",
    country: "UZ",
    postalCode: null as string | null,
  },

  /** Approximate centre of Tashkent. TODO(client): real office coordinates. */
  geo: {
    latitude: 41.311081,
    longitude: 69.240562,
  },

  /**
   * TODO(client): confirm real working hours. The live site publishes none;
   * this is the conservative claim the copy also makes ("работаем ежедневно"),
   * not a 24/7 promise the team may not be able to keep.
   */
  hours: {
    display: "Ежедневно, 08:00 — 21:00",
    /** schema.org openingHours format. */
    schema: "Mo-Su 08:00-21:00",
  },

  /**
   * Real corporate clients. Do not extend this list without confirmation — a
   * fabricated client name is the fastest way to destroy the trust this page
   * exists to build.
   *
   * `source: "logo"`    — logo published on the company's own site.
   * `source: "review"`  — the company published a signed review under its own
   *                       name on profipereezd.uz, which is consent to be
   *                       named as a client.
   */
  clients: [
    { name: "Golden House", slug: "golden-house", source: "logo" },
    { name: "Insight Solutions", slug: "insight-solutions", source: "logo" },
    { name: "UBC Group", slug: "ubc-group", source: "review" },
    {
      name: "Fintech Innovations",
      slug: "fintech-innovations",
      source: "review",
    },
  ],
} as const;

export type Company = typeof company;

/** Built once so no component has to know the URL shape. */
export const whatsappHref = company.whatsapp.number
  ? `https://wa.me/${company.whatsapp.number}`
  : null;
