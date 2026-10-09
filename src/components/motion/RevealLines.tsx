"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, registerGsap, MOTION, MQ } from "@/lib/motion";
import { cx } from "@/lib/cx";

/**
 * Line-by-line headline reveal.
 *
 * Each line is wrapped in its own `overflow: hidden` mask and translated up
 * from below. Lines are authored in the content dictionary rather than split
 * from a string at runtime, because:
 *
 *   · a runtime splitter has to measure text, which means a flash of unmasked
 *     type on slow devices, and
 *   · a line that the browser re-wraps would reveal in two pieces, breaking
 *     the effect exactly on the narrow viewports where it matters most.
 *
 * Authoring the breaks costs a translator one decision per headline and makes
 * the animation deterministic at every width.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  /** Play immediately (hero) instead of waiting for the scroll trigger. */
  immediate = false,
  id,
}: {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  immediate?: boolean;
  /** Needed wherever the heading is a section's `aria-labelledby` target. */
  id?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current) return;

      const targets = gsap.utils.toArray<HTMLElement>(
        "[data-line]",
        root.current,
      );
      if (!targets.length) return;

      const mm = gsap.matchMedia();

      // One behaviour at every width — a headline reveal that changed
      // technique at 1024px would read as two different sites.
      mm.add(MQ.motionOk, () => {
        gsap.set(targets, {
          yPercent: 105,
          opacity: 1,
          willChange: "transform",
        });

        const tween = gsap.to(targets, {
          yPercent: 0,
          duration: MOTION.dur.cinematic,
          ease: MOTION.ease.expo,
          delay,
          stagger: MOTION.stagger.lines,
          clearProps: "willChange",
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: root.current,
                  start: MOTION.trigger.start,
                  toggleActions: "play none none none",
                },
              }),
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(targets, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [delay, immediate] },
  );

  return (
    <Tag ref={root} id={id} className={className}>
      {lines.map((line, i) => (
        // The mask is the outer span; the inner span is what moves. Marking
        // the OUTER one with data-reveal-fade would hide the mask itself and
        // the CSS fallback would then hide the headline from no-JS visitors.
        <span key={i} className={cx("line-mask", lineClassName)}>
          <span data-line data-reveal-line className="block">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
