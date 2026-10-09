"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/cx";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { company } from "@/content/company";
import type { Dictionary, Locale } from "@/content";
import type { LeadEvent } from "@/lib/analytics";
import { track } from "@/lib/analytics";
import { LeadForm } from "./LeadForm";
import { PhoneIcon } from "@/components/contact/channels";

/**
 * Quick-request modal.
 *
 * Two fields and nothing else. It exists because the calculator — four
 * questions before a phone number — is the right tool for a visitor who wants
 * to think, and the wrong one for a visitor who has already decided. This is
 * the short path for the second kind.
 *
 * It reuses `LeadForm` rather than re-implementing a form, so validation, the
 * phone mask, the honeypot, the success state and — most importantly — the
 * "keep what the visitor typed when the network fails" behaviour are all the
 * same code that the page-level forms use.
 *
 * A dialog is only usable if it behaves like one: Escape closes it, focus is
 * trapped inside while it is open and returned to the trigger when it closes,
 * the page behind it does not scroll, and the backdrop is clickable. All four
 * are here, because a modal missing any of them traps keyboard users on a
 * page they cannot leave.
 */
export function LeadModal({
  open,
  onClose,
  t,
  locale,
  event = "hero_form",
  /** The element that opened it — focus goes back here on close. */
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  t: Dictionary;
  locale: Locale;
  event?: LeadEvent;
  returnFocusTo?: React.RefObject<HTMLElement | null>;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Captured now rather than read at cleanup: the element that opened the
    // dialog is the one focus must return to, and reading the ref later would
    // pick up whatever it happens to point at by then.
    const trigger = returnFocusTo?.current ?? null;

    lockScroll();

    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === "Escape") {
        keyEvent.preventDefault();
        onClose();
        return;
      }
      if (keyEvent.key !== "Tab" || !panel.current) return;

      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]), textarea, select',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (keyEvent.shiftKey && document.activeElement === first) {
        keyEvent.preventDefault();
        last.focus();
      } else if (!keyEvent.shiftKey && document.activeElement === last) {
        keyEvent.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      // Without this the keyboard user is dropped back at the top of the
      // document with no idea where the dialog went.
      trigger?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  // Unmounted when closed: the form holds the visitor's input in state, and
  // keeping a closed dialog mounted would show them a half-filled form the
  // next time they opened it.
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label={t.modal.close}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/55 backdrop-blur-[2px]"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className={cx(
          "relative z-10 max-h-[92dvh] w-full overflow-y-auto bg-paper shadow-[0_24px_80px_-24px_rgba(23,19,15,0.5)]",
          // A bottom sheet on phones, a centred card from `sm` up. On a 375px
          // screen a centred card puts the fields under the thumb's reach and
          // the keyboard covers the submit button.
          "rounded-t-[20px] p-6 sm:max-w-[27rem] sm:rounded-[20px] sm:p-8",
          "animate-[modal-in_320ms_var(--ease-expo)_both]",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.modal.close}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-[10px] text-muted transition-colors hover:bg-mist hover:text-ink"
        >
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 id="lead-modal-title" className="t-h3 pr-12 text-ink">
          {t.modal.title}
        </h2>
        <p className="t-body mt-3 text-[0.9375rem]">{t.modal.lead}</p>

        <LeadForm
          t={t}
          locale={locale}
          event={event}
          compact
          autoFocus
          className="mt-6"
        />

        {/* The visitor who would rather just call should not have to close a
            dialog to find the number. */}
        <a
          href={company.phone.href}
          onClick={() => track("phone_click", { placement: "lead_modal" })}
          className="mt-6 flex items-center gap-3 border-t border-rule pt-5 text-ink transition-colors hover:text-clay"
        >
          <PhoneIcon className="shrink-0 text-clay" />
          <span className="tnum text-[1.0625rem] font-semibold">
            {company.phone.display}
          </span>
        </a>
      </div>
    </div>
  );
}
