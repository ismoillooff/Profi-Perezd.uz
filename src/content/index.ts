import { ru, type Dictionary } from "./ru";
import { uz } from "./uz";

export const locales = ["ru", "uz"] as const;
export type Locale = (typeof locales)[number];

/**
 * Russian is the default: it is the language the business already sells,
 * advertises and collects reviews in.
 */
export const defaultLocale: Locale = "ru";

/** BCP-47 tags for <html lang> and hreflang. */
export const htmlLang: Record<Locale, string> = {
  ru: "ru-RU",
  uz: "uz-UZ",
};

/** Shown in the language switcher. */
export const localeLabel: Record<Locale, string> = {
  ru: "RU",
  uz: "UZ",
};

const dictionaries: Record<Locale, Dictionary> = { ru, uz };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type { Dictionary };
