import { company } from "@/content/company";
import type { Dictionary, Locale } from "@/content";

/**
 * schema.org markup.
 * ─────────────────────────────────────────────────────────────────────────
 * Three graphs, and every value is drawn from `company.ts` or the dictionary
 * so the markup cannot claim something the visible page does not:
 *
 *   MovingCompany — the specific LocalBusiness subtype for this trade, which
 *                   is what wins the local pack for "переезд Ташкент".
 *   Service ×7    — one per service, so each can surface on its own.
 *   FAQPage       — the objection-handling section, eligible for the FAQ rich
 *                   result. Only marked up because every answer really is in
 *                   the DOM; marking up content that is not visible is a
 *                   manual-action risk, not a clever trick.
 *
 * Deliberately NOT included: aggregateRating. The reviews on the page are real
 * but they are self-hosted and unverifiable by Google, and self-serving star
 * markup is exactly what the review-snippet guidelines penalise.
 */
export function StructuredData({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) {
  const url = `${company.siteUrl}/${locale}`;
  const id = `${company.siteUrl}/#organization`;

  const business = {
    "@type": "MovingCompany",
    "@id": id,
    name: company.name,
    url,
    telephone: company.phone.display,
    email: company.email.display,
    description: t.meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
      // Emitted only when real — a fabricated street address is worse than a
      // missing one, both for the visitor and for local ranking.
      ...(company.address.street ? { streetAddress: company.address.street } : {}),
      ...(company.address.postalCode
        ? { postalCode: company.address.postalCode }
        : {}),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    openingHours: company.hours.schema,
    areaServed: {
      "@type": "City",
      name: company.address.city,
    },
    sameAs: [
      company.telegram.href,
      company.social.instagram,
      company.social.facebook,
    ],
    knowsLanguage: ["ru", "uz"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.services.heading,
      itemListElement: t.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
          serviceType: service.name,
          provider: { "@id": id },
          areaServed: { "@type": "City", name: company.address.city },
        },
      })),
    },
  };

  const faq = {
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const website = {
    "@type": "WebSite",
    url,
    name: company.name,
    inLanguage: locale,
    publisher: { "@id": id },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [business, website, faq],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is not HTML — the only sequence that can break
      // out of a <script> block is "</", so that is the only one escaped.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
