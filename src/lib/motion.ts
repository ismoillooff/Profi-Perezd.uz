import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

/**
 * Register GSAP plugins exactly once, on the client.
 * Called from every component that animates, so no component depends on
 * another having run first.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  registered = true;
}

/**
 * Motion tokens. Every animation on the site pulls its duration and easing
 * from here — ad-hoc per-component values are what make a site read as
 * amateur. Mirrors the custom properties in globals.css.
 */
export const MOTION = {
  ease: {
    /** Entering / responding to the user. */
    out: "power3.out",
    /** Signature expo-out — matches --ease-expo. */
    expo: "expo.out",
    /** Leaving. */
    in: "power2.in",
    inOut: "power2.inOut",
  },
  /** Micro 160–280ms · standard 350–500ms · section 620–900ms ·
   *  cinematic 900–1400ms. Nothing on this site invents its own duration. */
  dur: {
    micro: 0.24,
    ui: 0.42,
    section: 0.72,
    cinematic: 1.1,
    hero: 1.25,
  },
  stagger: {
    tight: 0.05,
    lines: 0.09,
    cards: 0.08,
    loose: 0.13,
  },
  /** Standard scroll-reveal window. */
  trigger: {
    start: "top 84%",
    startLate: "top 72%",
  },
} as const;

/** Breakpoint queries for gsap.matchMedia — mobile gets its own motion logic. */
export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  belowDesktop:
    "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
