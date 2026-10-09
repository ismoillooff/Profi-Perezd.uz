import type Lenis from "lenis";

/**
 * The single Lenis instance, shared so that anything opening an overlay (the
 * mobile menu, a service panel) can stop the page behind it.
 *
 * Without this the body still scrolls under an open drawer, which on iOS
 * silently loses the visitor's place in the page.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function lockScroll() {
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
  // iOS Safari ignores overflow on <html> for touch scrolling.
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  instance?.start();
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

export function scrollToId(id: string, offset = -96) {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.1 });
  } else {
    // Reduced motion / no Lenis: native jump, respecting the header offset
    // via scroll-padding-top in globals.css.
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }
}
