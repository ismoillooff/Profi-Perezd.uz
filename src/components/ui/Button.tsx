import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";

export type ButtonTone = "primary" | "secondary" | "onDark" | "onDarkGhost";

/**
 * 10px radius, not a pill: the pill CTA is the default SaaS/AI-template
 * signature the brief rules out, and a squarer corner sits with this system's
 * hairlines and tight editorial type.
 *
 * 52px tall — above the 44px minimum touch target with room to spare, so the
 * same component works as the primary mobile CTA without a size variant.
 */
const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-[10px] " +
  "px-6 h-[52px] text-[0.9375rem] font-semibold tracking-[-0.01em] " +
  "transition-[background-color,border-color,color,transform] duration-200 " +
  "[transition-timing-function:var(--ease-expo)] " +
  "active:scale-[0.985] select-none whitespace-nowrap " +
  "disabled:opacity-55 disabled:pointer-events-none";

const tones: Record<ButtonTone, string> = {
  primary:
    "bg-clay text-white hover:bg-clay-deep " +
    "shadow-[0_1px_2px_rgba(23,19,15,0.14),0_10px_28px_-14px_rgba(194,82,31,0.6)]",
  secondary:
    "text-ink border border-rule-strong bg-transparent " +
    "hover:border-ink hover:bg-ink hover:text-white",
  onDark: "bg-white text-ink hover:bg-clay hover:text-white",
  onDarkGhost:
    "text-white border border-[rgba(255,255,255,0.38)] bg-transparent " +
    "hover:bg-white hover:text-ink hover:border-white",
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      aria-hidden="true"
      className={
        "shrink-0 transition-transform duration-200 " +
        "[transition-timing-function:var(--ease-expo)] " +
        "group-hover:translate-x-1"
      }
    >
      <path
        d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

type CommonProps = {
  children: ReactNode;
  tone?: ButtonTone;
  withArrow?: boolean;
  className?: string;
};

export function ButtonLink({
  children,
  tone = "primary",
  withArrow = true,
  className,
  ...rest
}: CommonProps & ComponentProps<"a">) {
  return (
    <a className={cx(base, tones[tone], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </a>
  );
}

export function Button({
  children,
  tone = "primary",
  withArrow = true,
  className,
  type = "button",
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button type={type} className={cx(base, tones[tone], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}
