/**
 * Uzbekistan phone input handling.
 * ─────────────────────────────────────────────────────────────────────────
 * Displayed as `+998 __ ___ __ __` — the format every Uzbek visitor reads
 * their own number in.
 *
 * The mask is applied to the *value*, not by overlaying a template, because a
 * template overlay breaks the moment someone pastes a number, uses autofill,
 * or types on an Android keyboard that reports composition events.
 */

/** Digits AFTER the +998 country code. */
const NATIONAL_LENGTH = 9;

export const PHONE_PLACEHOLDER = "+998 __ ___ __ __";

/** Strips everything except digits, then drops a leading 998 country code. */
export function toNationalDigits(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  // A user typing "8" first (the old trunk prefix) means the operator code.
  return digits.slice(0, NATIONAL_LENGTH);
}

/**
 * Formats for display as the user types: `+998 90 123 45 67`.
 * Groups are revealed progressively so the field never shows empty separators.
 */
export function formatPhone(input: string): string {
  const d = toNationalDigits(input);
  if (d.length === 0) return "";

  const groups = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)];
  return `+998 ${groups.filter(Boolean).join(" ")}`;
}

/** True once the number is complete enough to dial. */
export function isValidPhone(input: string): boolean {
  return toNationalDigits(input).length === NATIONAL_LENGTH;
}

/** E.164, for `tel:` links and for handing to a CRM. */
export function toE164(input: string): string {
  return `+998${toNationalDigits(input)}`;
}

/**
 * Where the caret should sit after reformatting.
 *
 * Reformatting replaces the whole value, which sends the caret to the end —
 * so editing a digit in the middle of the number becomes impossible. This
 * counts how many digits precede the caret and finds that same digit in the
 * newly formatted string.
 */
export function caretAfterFormat(
  formatted: string,
  digitsBeforeCaret: number,
): number {
  if (digitsBeforeCaret <= 0) return formatted.length;

  let seen = 0;
  // Start past the "+998 " prefix so the country code is never counted.
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      seen++;
      if (seen === digitsBeforeCaret + 3) return i + 1;
    }
  }
  return formatted.length;
}

/** Digits between the start of the string and the caret, ignoring +998. */
export function digitsBeforeCaret(value: string, caret: number): number {
  const head = value.slice(0, caret).replace(/\D/g, "");
  return head.startsWith("998") ? head.length - 3 : head.length;
}
