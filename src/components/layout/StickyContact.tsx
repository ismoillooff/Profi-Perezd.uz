"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import { track } from "@/lib/analytics";
import type { Dictionary } from "@/content";
import { getChannels, linkProps } from "@/components/contact/channels";

/**
 * Desktop contact rail.
 *
 * Sits against the right edge, vertically centred, and only appears once the
 * visitor has left the hero — while the hero is on screen its own CTAs are
 * larger, closer to the copy and already unmissable, so showing the rail there
 * would just be a second set of the same buttons.
 *
 * Collapsed to icons at rest and expanding to the label on hover: a permanent
 * panel of three labelled buttons floating over an editorial layout is exactly
 * the "bolted-on widget" look the brief rules out.
 */
export function StickyContact({ t }: { t: Dictionary }) {
  const [visible, setVisible] = useState(false);
  const channels = getChannels(t);

  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>("[data-hero-end]");
    let frame = 0;

    const measure = () => {
      frame = 0;
      const pastHero = sentinel
        ? sentinel.getBoundingClientRect().top < 0
        : window.scrollY > 400;

      // Hide again over the closing CTA — it carries the same three actions at
      // full size, and the rail would sit on top of them.
      const finalCta = document.querySelector<HTMLElement>("[data-final-cta]");
      const atFinal = finalCta
        ? finalCta.getBoundingClientRect().top < window.innerHeight * 0.75
        : false;

      setVisible(pastHero && !atFinal);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={cx(
        "fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 lg:flex",
        "transition-[opacity,transform] duration-500",
        "[transition-timing-function:var(--ease-expo)]",
        visible
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-4 opacity-0",
      )}
    >
      {channels.map((channel) => (
        <a
          key={channel.id}
          href={channel.href}
          {...linkProps(channel)}
          onClick={() => track(channel.event, { placement: "sticky_rail" })}
          aria-label={`${channel.label}: ${channel.display}`}
          className={cx(
            "group flex h-12 items-center gap-0 overflow-hidden rounded-[10px]",
            "border border-rule bg-paper/95 pl-3.5 pr-3.5 text-ink shadow-[0_2px_16px_-8px_rgba(23,19,15,0.28)]",
            "backdrop-blur-sm transition-[gap,padding,border-color,background-color,color] duration-300",
            "[transition-timing-function:var(--ease-expo)]",
            "hover:gap-2.5 hover:border-clay hover:bg-clay hover:text-white hover:pr-4",
          )}
        >
          <channel.Icon className="shrink-0" />
          {/* Width animation rather than display toggling, so the label slides
              out instead of snapping the button to a new size. */}
          <span
            className={cx(
              "max-w-0 overflow-hidden whitespace-nowrap text-[0.875rem] font-semibold",
              "transition-[max-width] duration-300",
              "[transition-timing-function:var(--ease-expo)]",
              "group-hover:max-w-[120px]",
            )}
          >
            {channel.label}
          </span>
        </a>
      ))}
    </div>
  );
}
