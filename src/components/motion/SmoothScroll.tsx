"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/motion";
import { setLenis } from "@/lib/scroll-lock";

/**
 * Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger and Lenis
 * share one rAF loop instead of fighting each other.
 *
 * Deliberately restrained settings: lerp 0.1 with a short duration keeps the
 * scroll feeling native. A "floaty" scroll is the fastest way to make a
 * premium site feel broken — and on a page whose job is to be trusted, feeling
 * broken is expensive.
 *
 * Disabled entirely under prefers-reduced-motion: native scroll is the
 * accessible path and must stay untouched.
 */
export function SmoothScroll() {
  useEffect(() => {
    registerGsap();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.1,
      smoothWheel: true,
      // Native momentum on touch beats anything we can emulate.
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links must go through Lenis, otherwise native smooth scroll and
    // Lenis animate the same scrollTop and stutter against each other.
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -88, duration: 1.1 });
      // Keep the URL and the focus behaviour of a real anchor jump — losing
      // focus here is what strands keyboard users mid-page.
      window.history.pushState(null, "", hash);
      (target as HTMLElement).setAttribute("tabindex", "-1");
      (target as HTMLElement).focus({ preventScroll: true });
    };

    document.addEventListener("click", onAnchorClick);

    // Trigger positions are measured from layout. Images and webfonts land
    // after the first measurement, so without these refreshes every start/end
    // on the page is computed against a layout that no longer exists.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    // ScrollTrigger is normally driven by Lenis' own scroll event, which only
    // fires for scrolling Lenis performed. A browser restoring scroll position
    // on reload moves the page WITHOUT going through Lenis, so without this
    // native listener every trigger below the restored position stays in its
    // pre-entry state and the content never appears.
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll restoration lands after hydration; re-measure once it has.
    const settle = window.setTimeout(refresh, 300);

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onAnchorClick);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
