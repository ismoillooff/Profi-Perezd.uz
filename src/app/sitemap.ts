import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { defaultLocale, locales } from "@/content";

/**
 * Every locale of every page, each carrying the full `alternates.languages`
 * set. Declaring the alternates here as well as in the page metadata is what
 * lets Google discover the Uzbek version without having to crawl the Russian
 * one first.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  const languages = Object.fromEntries(
    locales.map((locale) => [
      locale === "ru" ? "ru-RU" : "uz-UZ",
      `${company.siteUrl}/${locale}`,
    ]),
  );

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${company.siteUrl}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: locale === defaultLocale ? route.priority : route.priority * 0.9,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languages).map(([tag, base]) => [
            tag,
            `${base}${route.path}`,
          ]),
        ),
      },
    })),
  );
}
