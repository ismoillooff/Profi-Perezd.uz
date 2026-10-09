import Image from "next/image";
import { resolveImage } from "@/content/images.generated";
import type { ImageSlot } from "@/content/images";
import { cx } from "@/lib/cx";

/**
 * The single way photography enters this site.
 *
 * When the declared file exists in /public/images it renders next/image with
 * the intrinsic size from the manifest — so the box is reserved before the
 * bytes arrive and the layout never shifts.
 *
 * When it does not, it renders an explicitly-labelled pending frame. That is
 * deliberate: an invented illustration standing in for a photograph of real
 * work would be a fabricated trust signal on a page whose entire job is trust,
 * and a broken image box would be worse. The frame carries the exact file name
 * the slot expects, so whoever supplies the photography knows where each goes.
 *
 * No hooks — usable from both server and client components.
 */
export function Figure({
  slot,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority,
  pendingLabel,
  pendingAlign = "center",
}: {
  slot: ImageSlot;
  alt: string;
  /** Sizing/rounding lives on the wrapper; it must establish the aspect box. */
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  pendingLabel?: string;
  /**
   * Where the pending label sits. Centre suits the small framed figures; the
   * hero needs `top`, because dead-centre on a full-bleed frame lands the
   * label straight through the headline.
   */
  pendingAlign?: "center" | "top";
}) {
  const src = resolveImage(slot.id);

  if (!src) {
    return (
      <div
        className={cx("relative overflow-hidden bg-surface", className)}
        role="img"
        aria-label={alt}
      >
        {/* Deliberately plain. Any graphic here would be cropped differently
            by every frame on the page and would read as a broken decoration
            rather than as a placeholder. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-rule"
        />
        {/* Centred by default, so the label survives however this frame is
            cropped. */}
        <span
          className={cx(
            "absolute inset-0 flex flex-col items-center gap-2 p-4 text-center",
            pendingAlign === "top" ? "justify-start pt-28" : "justify-center",
          )}
        >
          <span className="t-label text-muted/70">
            {pendingLabel ?? "Фото готовится"}
          </span>
          <span className="t-label text-muted/45">
            {slot.file} · {slot.width}×{slot.height}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className={cx("relative overflow-hidden bg-surface", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority ?? slot.priority}
        className={cx("object-cover", imageClassName)}
      />
    </div>
  );
}

/** True when the slot has a real file behind it. */
export function hasImage(slot: ImageSlot): boolean {
  return resolveImage(slot.id) !== null;
}
