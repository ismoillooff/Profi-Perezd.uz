"use client";

import { useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { track } from "@/lib/analytics";
import { gsap, useGSAP, registerGsap, MOTION, MQ } from "@/lib/motion";
import { company } from "@/content/company";
import { IMAGES } from "@/content/images";
import type { Dictionary, Locale } from "@/content";
import { Figure } from "@/components/media/Figure";
import { RevealLines } from "@/components/motion/RevealLines";
import { LeadModal } from "@/components/forms/LeadModal";
import { getChannels, linkProps } from "@/components/contact/channels";

/**
 * Hero.
 *
 * One full-bleed photograph, one headline, one primary action — composed so a
 * visitor who reads nothing but this screen still knows who we are, what we do
 * and how to reach us. Not the "text left / stock photo right" split the brief
 * rules out: the photograph is the ground the type sits on, which is what
 * makes it read as a real company rather than as a template.
 *
 * Height is `100svh`, not `100vh`. On mobile Safari `vh` is measured against
 * the *expanded* viewport, so a 100vh hero pushes its own CTA under the URL
 * bar on first paint — the one element that must never need scrolling to.
 *
 * MOTION
 *   On load  — image settles out of a slow scale, headline reveals by line,
 *              supporting copy and CTAs follow, trust numbers land last.
 *   On move  — a few pixels of parallax on the background only.
 *   On scroll— the image drifts and the copy lifts away. No pinning, no
 *              hijacking: the page scrolls exactly as far as the reader asked.
 */
export function Hero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const channels = getChannels(t);
  const messaging = channels.filter((c) => c.id !== "phone");

  useGSAP(
    () => {
      registerGsap();
      if (!root.current || !media.current) return;

      const mm = gsap.matchMedia();

      // Named conditions rather than two separate `add` calls: the pointer
      // parallax is desktop-only but everything else is shared, and GSAP
      // re-runs this whole block if the viewport crosses the breakpoint.
      mm.add(
        { isDesktop: "(min-width: 1024px)", motionOk: MQ.motionOk },
        (context) => {
          const { isDesktop, motionOk } = context.conditions as {
            isDesktop: boolean;
            motionOk: boolean;
          };
          if (!motionOk) return;

          /* Entrance — the image is already visible, it only settles. Fading
             a hero image IN delays the moment the page looks finished. */
          gsap.fromTo(
            media.current,
            { scale: 1.09 },
            { scale: 1, duration: 1.8, ease: MOTION.ease.expo },
          );

          gsap.fromTo(
            root.current!.querySelectorAll("[data-hero-fade]"),
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: MOTION.dur.section,
              ease: MOTION.ease.expo,
              stagger: MOTION.stagger.cards,
              // Starts as the last headline line finishes, so the screen
              // resolves in one continuous movement, not in two beats.
              delay: 0.72,
            },
          );

          /* Scroll — background drifts slower than the page, copy lifts. */
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            })
            .to(media.current, { yPercent: 12, ease: "none" }, 0)
            .to(
              root.current!.querySelector("[data-hero-copy]"),
              { yPercent: -14, opacity: 0.25, ease: "none" },
              0,
            );

          /* Pointer parallax — desktop only, and tiny. Anything larger makes
             the photograph feel like a sticker floating above the page. */
          if (!isDesktop) return;

          const quickX = gsap.quickTo(media.current, "x", {
            duration: 0.9,
            ease: "power3.out",
          });
          const quickY = gsap.quickTo(media.current, "y", {
            duration: 0.9,
            ease: "power3.out",
          });

          const onPointerMove = (event: PointerEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;
            quickX(nx * -18);
            quickY(ny * -12);
          };

          window.addEventListener("pointermove", onPointerMove, {
            passive: true,
          });
          return () =>
            window.removeEventListener("pointermove", onPointerMove);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
      aria-label={t.hero.eyebrow}
    >
      {/* Media layer. Oversized so parallax never exposes an edge. */}
      <div
        ref={media}
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ top: "-6%", bottom: "-6%" }}
      >
        <Figure
          slot={IMAGES.hero}
          alt={t.hero.imageAlt}
          className="h-full w-full"
          sizes="100vw"
          priority
          pendingLabel="Главное фото"
          pendingAlign="top"
        />
        <div aria-hidden="true" className="scrim-bottom absolute inset-0" />
      </div>

      <div className="shell relative w-full pb-14 pt-[calc(72px+2rem)] md:pb-16 lg:pb-20">
        <div data-hero-copy className="max-w-[46rem]">
          <p
            data-hero-fade
            className="t-label mb-6 flex items-center gap-3 text-white/70"
          >
            <span
              aria-hidden="true"
              className="inline-block h-px w-8 bg-white/40"
            />
            {t.hero.eyebrow}
          </p>

          <RevealLines
            as="h1"
            lines={t.hero.headline}
            className="t-display text-white"
            delay={0.15}
            immediate
          />

          <p
            data-hero-fade
            className="t-lead mt-6 max-w-[34rem] text-white/78"
          >
            {t.hero.lead}
          </p>

          {/* Actions. Primary and secondary are full-width on mobile so the
              thumb cannot miss either one. */}
          <div
            data-hero-fade
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            {/* A real <button>: it opens a dialog, it does not navigate. An
                anchor here would offer a middle-click and a copyable URL that
                lead nowhere. */}
            <button
              ref={ctaRef}
              type="button"
              onClick={() => {
                setModalOpen(true);
                track("service_cta", { placement: "hero_modal_open" });
              }}
              aria-haspopup="dialog"
              aria-expanded={modalOpen}
              className={cx(
                "inline-flex h-[54px] items-center justify-center gap-2.5 rounded-[10px] bg-clay px-7",
                "text-[0.9375rem] font-semibold text-white transition-colors duration-200",
                "hover:bg-clay-deep active:scale-[0.985]",
                "shadow-[0_2px_4px_rgba(12,9,7,0.24),0_14px_36px_-16px_rgba(194,82,31,0.8)]",
              )}
            >
              {t.hero.primary}
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path
                  d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
            </button>

            <a
              href={company.phone.href}
              onClick={() => track("phone_click", { placement: "hero" })}
              className={cx(
                "inline-flex h-[54px] items-center justify-center gap-2.5 rounded-[10px] px-7",
                "border border-white/35 text-[0.9375rem] font-semibold text-white",
                "transition-colors duration-200 hover:border-white hover:bg-white hover:text-ink",
              )}
            >
              {t.hero.secondary}
            </a>

            {/* Messaging apps: icon-first, so they read as an alternative
                channel rather than as two more competing CTAs. */}
            <div className="flex gap-3 sm:ml-1">
              {messaging.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.href}
                  {...linkProps(channel)}
                  onClick={() => track(channel.event, { placement: "hero" })}
                  aria-label={channel.label}
                  className={cx(
                    "inline-flex h-[54px] flex-1 items-center justify-center gap-2 rounded-[10px] px-5 sm:flex-none",
                    "border border-white/25 text-[0.9375rem] font-semibold text-white/90",
                    "transition-colors duration-200 hover:border-white hover:text-white",
                  )}
                >
                  <channel.Icon />
                  <span className="sm:hidden md:inline">{channel.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Micro-trust. Every item is verifiable — see content/company.ts. */}
          <ul
            data-hero-fade
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5"
          >
            {t.hero.trust.map((item) => (
              <li
                key={item}
                className="t-label flex items-center gap-2 text-white/70"
              >
                <svg
                  viewBox="0 0 12 12"
                  width="12"
                  height="12"
                  aria-hidden="true"
                  className="shrink-0 text-clay"
                >
                  <path
                    d="M2 6.3 4.6 9 10 3.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The header, the desktop rail and the mobile bar all derive their
          state from this one element rather than from a 100vh guess. */}
      <div data-hero-end aria-hidden="true" className="h-px w-full" />

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        t={t}
        locale={locale}
        event="hero_form"
        returnFocusTo={ctaRef}
      />
    </section>
  );
}
