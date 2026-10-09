"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGsap, MOTION, MQ } from "@/lib/motion";

/**
 * Count-up statistic.
 *
 * The final value is rendered into the markup on the server, so the correct
 * number is what search engines index and what a reduced-motion or no-JS
 * visitor sees. The animation only ever overwrites an already-correct value —
 * it never supplies it.
 */
export function Counter({
  value,
  suffix = "",
  className,
  /** Group thousands as "2 000" once the count finishes. */
  group = true,
}: {
  value: number;
  suffix?: string;
  className?: string;
  group?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const format = (n: number) =>
    group ? Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ") : String(Math.round(n));

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MQ.motionOk, () => {
        const counter = { n: 0 };

        const tween = gsap.to(counter, {
          n: value,
          duration: MOTION.dur.cinematic,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(counter.n);
          },
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          // Always leave the true value behind, whatever the tween was doing.
          el.textContent = format(value);
        };
      });

      return () => mm.revert();
    },
    { dependencies: [value] },
  );

  return (
    <span className={className}>
      <span ref={ref} className="tnum">
        {format(value)}
      </span>
      {suffix}
    </span>
  );
}
