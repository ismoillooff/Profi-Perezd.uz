/** Minimal class joiner — no runtime dependency needed for this site. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
