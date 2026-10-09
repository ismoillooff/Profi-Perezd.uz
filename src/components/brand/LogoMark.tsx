import { cx } from "@/lib/cx";

/**
 * Brand mark.
 * ─────────────────────────────────────────────────────────────────────────
 * Redrawn as SVG from the company's existing logo (kept for reference at
 * `design/logo-source.jpg`), because the original is a JPEG on a hard black
 * background — unusable on warm paper, and unusable at any size other than
 * the one it was exported at.
 *
 * The original is a "P" monogram beside three figures and a box truck. At
 * header size the figures collapse into noise, so this keeps the two elements
 * that survive small: the truck silhouette and the wordmark.
 *
 * Everything is `currentColor`, so the same component works on paper, on ink,
 * and over the hero photograph without a second variant.
 *
 * TODO(client): supply the original logo as SVG if it exists, and this becomes
 * a straight swap.
 */
export function LogoMark({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 34 24"
        width="34"
        height="24"
        aria-hidden="true"
        className="shrink-0 overflow-visible"
        fill="none"
      >
        {/* Box truck: cargo body + cab, drawn as one continuous outline so it
            stays crisp at 20px and reads as a silhouette at 60px. */}
        <path
          d="M1 3.5h18.5v13H1zM19.5 8h5.2l4.3 4.1v4.4h-9.5z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Wheels sit ON the baseline, not inside the body — the detail that
            makes the shape read as a truck rather than as two boxes. */}
        <circle cx="8" cy="19" r="2.6" stroke="currentColor" strokeWidth="2" />
        <circle cx="25" cy="19" r="2.6" stroke="currentColor" strokeWidth="2" />
      </svg>

      {showWordmark && (
        <span className="text-[0.9375rem] font-extrabold uppercase leading-none tracking-[0.14em]">
          Profipereezd
        </span>
      )}
    </span>
  );
}
