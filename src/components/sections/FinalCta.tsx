"use client";

import { cx } from "@/lib/cx";
import { track } from "@/lib/analytics";
import { company } from "@/content/company";
import { IMAGES } from "@/content/images";
import type { Dictionary, Locale } from "@/content";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  getChannels,
  linkProps,
  PhoneIcon,
} from "@/components/contact/channels";

/**
 * Closing CTA + contact.
 *
 * The brief lists these as two sections. Merging them is the stronger sales
 * move: a closing argument followed by a *separate* contact block asks the
 * visitor to decide twice, and the second form is where they stop. Here the
 * argument and the field they type into are the same screen.
 *
 * Every contact route the visitor might prefer is present — form, phone,
 * Telegram, WhatsApp when configured — because the whole page has been telling
 * them to get in touch and this is the last chance to let them do it their own
 * way.
 *
 * On dark, over the photograph, closing the frame the hero opened.
 */
export function FinalCta({ t, locale }: { t: Dictionary; locale: Locale }) {
  const channels = getChannels(t);

  return (
    <section
      id="contact"
      data-final-cta
      className="relative isolate overflow-hidden bg-ink text-white"
      aria-labelledby="final-heading"
    >
      {/* Background. Held well back — this section is about the form, and a
          photograph competing with a form is a form nobody fills in. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Figure
          slot={IMAGES.cta}
          alt=""
          className="h-full w-full opacity-[0.28]"
          sizes="100vw"
          pendingLabel="Финальный блок"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/70" />
      </div>

      <div className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Argument ------------------------------------------------------ */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="t-label mb-5 block text-white/45">
                {t.finalCta.label}
              </span>
            </Reveal>

            <RevealLines
              as="h2"
              id="final-heading"
              lines={[t.finalCta.heading]}
              className="t-h2 text-white"
            />

            <Reveal>
              <p className="t-lead mt-5 text-white/70">{t.finalCta.lead}</p>
            </Reveal>

            {/* Direct channels. Large, because for a lot of visitors calling
                is genuinely the preferred action and burying it behind a form
                is how a moving company loses the job to whoever answered. */}
            <Reveal stagger={0.08} className="mt-10 flex flex-col gap-3">
              <a
                data-stagger
                href={company.phone.href}
                onClick={() => track("phone_click", { placement: "final_cta" })}
                className={cx(
                  "group flex items-center gap-4 rounded-[12px] border border-rule-invert-strong",
                  "px-5 py-4 transition-colors duration-200 hover:border-white hover:bg-white/5",
                )}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clay text-white">
                  <PhoneIcon />
                </span>
                <span className="flex flex-col">
                  <span className="t-label text-white/50">
                    {t.finalCta.phoneLabel}
                  </span>
                  <span className="tnum mt-1 text-[1.25rem] font-bold tracking-[-0.02em] text-white">
                    {company.phone.display}
                  </span>
                </span>
              </a>

              <div className="flex flex-wrap gap-3">
                {channels
                  .filter((c) => c.id !== "phone")
                  .map((channel) => (
                    <a
                      key={channel.id}
                      data-stagger
                      href={channel.href}
                      {...linkProps(channel)}
                      onClick={() =>
                        track(channel.event, { placement: "final_cta" })
                      }
                      className={cx(
                        "inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-[10px]",
                        "border border-rule-invert-strong px-5 text-[0.9375rem] font-semibold text-white/85",
                        "transition-colors duration-200 hover:border-white hover:text-white",
                      )}
                    >
                      <channel.Icon />
                      {channel.id === "telegram"
                        ? t.finalCta.telegram
                        : t.finalCta.whatsapp}
                    </a>
                  ))}
              </div>
            </Reveal>
          </div>

          {/* Form ---------------------------------------------------------- */}
          <Reveal variant="scale" className="lg:col-span-6">
            <div className="rounded-[20px] border border-rule-invert bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
              <h3 className="t-h4 text-white">{t.form.heading}</h3>
              <p className="t-small mt-2 text-white/60">{t.form.lead}</p>

              <LeadForm
                t={t}
                locale={locale}
                event="final_cta"
                tone="dark"
                className="mt-6"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
