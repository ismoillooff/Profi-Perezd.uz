"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, registerGsap, MOTION, MQ } from "@/lib/motion";

/**
 * The site's entire reveal vocabulary. Sections pick from this list; they do
 * not invent an effect of their own. That is what keeps fourteen sections
 * feeling like one page instead of fourteen experiments.
 */
export type RevealVariant = "up" | "left" | "right" | "scale" | "fade" | "clip";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  /**
   * When set, children carrying `data-stagger` animate in sequence instead of
   * the wrapper animating as one block.
   */
  stagger?: number;
  /** Start the reveal later — for sections that need more scroll runway. */
  late?: boolean;
};

/** Desktop offsets. Mobile deliberately uses a smaller, vertical-only move. */
const FROM: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 40, opacity: 0 },
  left: { x: -72, opacity: 0 },
  right: { x: 72, opacity: 0 },
  scale: { scale: 0.975, opacity: 0 },
  fade: { opacity: 0 },
  // Wipe in from the bottom edge. Used for photography, where a mask reveal
  // reads as the image arriving rather than sliding.
  clip: { clipPath: "inset(100% 0% 0% 0%)" },
};

const TO: Partial<Record<RevealVariant, gsap.TweenVars>> = {
  clip: { clipPath: "inset(0% 0% 0% 0%)" },
};

const FROM_MOBILE: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 22, opacity: 0 },
  left: { y: 22, opacity: 0 },
  right: { y: 22, opacity: 0 },
  scale: { scale: 0.985, opacity: 0 },
  fade: { opacity: 0 },
  clip: { clipPath: "inset(100% 0% 0% 0%)" },
};

/**
 * Scroll-reveal wrapper with a variant per call site.
 *
 * The site deliberately does NOT fade-up every section — direction and
 * technique change with the section's layout so the page reads as
 * choreographed rather than templated.
 *
 * Horizontal movement is dropped on mobile: a 72px x-offset on a 375px
 * viewport causes overflow and reads as jitter, not as motion.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  variant = "up",
  delay = 0,
  stagger,
  late = false,
}: RevealProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current) return;

      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>("[data-stagger]", root.current)
        : [root.current];
      if (!targets.length) return;

      const mm = gsap.matchMedia();

      const build = (from: gsap.TweenVars) => {
        gsap.set(targets, { ...from, willChange: "transform, opacity" });

        const tween = gsap.to(targets, {
          ...(variant === "clip"
            ? TO.clip
            : { x: 0, y: 0, scale: 1, opacity: 1 }),
          duration: variant === "clip" ? 0.95 : MOTION.dur.section,
          ease: MOTION.ease.expo,
          delay,
          stagger: stagger ?? 0,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: root.current,
            start: late ? MOTION.trigger.startLate : MOTION.trigger.start,
            toggleActions: "play none none none",
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(targets, { clearProps: "all" });
        };
      };

      mm.add(MQ.desktop, () => build(FROM[variant]));
      mm.add(MQ.belowDesktop, () => build(FROM_MOBILE[variant]));

      return () => mm.revert();
    },
    { scope: root, dependencies: [variant, delay, stagger, late] },
  );

  return (
    // The pre-paint hide has to land on whatever GSAP is actually going to
    // animate. When staggering, that is the `[data-stagger]` children — CSS
    // hides those instead (see globals.css), and marking the wrapper as well
    // would hide a block that nothing ever animates back in.
    <Tag ref={root} className={className} {...(stagger ? {} : { "data-reveal-fade": "" })}>
      {children}
    </Tag>
  );
}
