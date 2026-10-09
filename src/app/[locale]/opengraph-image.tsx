import { ImageResponse } from "next/og";
import { company } from "@/content/company";
import { getDictionary, isLocale } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Profi Pereezd";

/**
 * Share card.
 *
 * Generated rather than designed as a file so it stays correct per locale and
 * cannot drift from the copy. Typeset in the site's own language — warm paper,
 * near-black, one clay rule — so a link shared into Telegram already looks
 * like the page it opens.
 *
 * Deliberately type-only: `next/og` cannot use the hero photograph without
 * fetching and inlining it, and a share card that fails to build because an
 * image 404'd is worse than one without a photograph.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "ru");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf9f6",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="52" height="37" viewBox="0 0 34 24" fill="none">
            <path
              d="M1 3.5h18.5v13H1zM19.5 8h5.2l4.3 4.1v4.4h-9.5z"
              stroke="#17130f"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="8" cy="19" r="2.6" stroke="#17130f" strokeWidth="2" />
            <circle cx="25" cy="19" r="2.6" stroke="#17130f" strokeWidth="2" />
          </svg>
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "#17130f",
            }}
          >
            PROFIPEREEZD
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 88,
              height: 5,
              background: "#c2521f",
              marginBottom: 32,
            }}
          />
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#17130f",
              maxWidth: 940,
            }}
          >
            {t.hero.headline.join(" ")}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              lineHeight: 1.4,
              color: "#6f655b",
              maxWidth: 820,
            }}
          >
            {t.hero.eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(23,19,15,0.12)",
            paddingTop: 26,
            fontSize: 25,
            color: "#17130f",
          }}
        >
          <span style={{ fontWeight: 700 }}>{company.phone.display}</span>
          <span style={{ color: "#6f655b" }}>
            {t.hero.trust.slice(0, 2).join("  ·  ")}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
