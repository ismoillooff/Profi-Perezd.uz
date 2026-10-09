"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { cx } from "@/lib/cx";
import { track, type LeadEvent } from "@/lib/analytics";
import { isValidPhone, toE164 } from "@/lib/phone";
import { company } from "@/content/company";
import type { Dictionary, Locale } from "@/content";
import { Button } from "@/components/ui/Button";
import { PhoneField } from "@/components/ui/PhoneField";
import { TelegramIcon } from "@/components/contact/channels";

type Status = "idle" | "submitting" | "success" | "error";

export type LeadContext = {
  /** Free-form summary of a calculator configuration, if there was one. */
  summary?: string;
  moveType?: string;
};

/**
 * The site's only lead form.
 *
 * Two required fields. Every extra field measurably costs submissions, and
 * nothing else on this form is information a manager cannot get in the first
 * ten seconds of the call it triggers.
 *
 * FAILURE BEHAVIOUR is the part that matters. On a network or server error the
 * form keeps everything the visitor typed and offers Telegram as an immediate
 * alternative — because a visitor who has decided to make contact and is met
 * with a cleared form does not try again, they leave.
 */
export function LeadForm({
  t,
  locale,
  event,
  context,
  tone = "light",
  className,
  onSuccess,
  compact = false,
  autoFocus = false,
}: {
  t: Dictionary;
  locale: Locale;
  /** Which CTA this form belongs to, for analytics attribution. */
  event: LeadEvent;
  context?: LeadContext;
  tone?: "light" | "dark";
  className?: string;
  onSuccess?: () => void;
  /**
   * Name and phone only — used in the modal, where the whole proposition is
   * "two fields and you're done". The comment field is genuinely useful in
   * the page-level forms, where the visitor has already committed to reading.
   */
  compact?: boolean;
  /** Focus the first field on mount. Only correct inside a modal. */
  autoFocus?: boolean;
}) {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const dark = tone === "dark";

  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (status === "submitting") return;

    const nextErrors: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) nextErrors.name = t.form.errors.name;
    if (!isValidPhone(phone)) nextErrors.phone = t.form.errors.phone;

    setErrors(nextErrors);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: toE164(phone),
          comment: comment.trim(),
          summary: context?.summary ?? "",
          moveType: context?.moveType ?? "",
          source: event,
          locale,
          company: honeypot,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        setFormError(t.form.errors.server);
        return;
      }

      setStatus("success");
      track(event, { locale, has_summary: Boolean(context?.summary) });
      onSuccess?.();
    } catch {
      setStatus("error");
      setFormError(t.form.errors.network);
    }
  }

  if (status === "success") {
    return (
      <div
        className={cx(
          "flex flex-col items-start rounded-[16px] border p-7",
          dark ? "border-rule-invert bg-white/5" : "border-rule bg-mist",
          className,
        )}
        role="status"
      >
        <span
          aria-hidden="true"
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-signal/12 text-signal"
        >
          <svg viewBox="0 0 20 20" width="22" height="22">
            <path
              d="M4 10.6 8 14.5 16 5.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <p className={cx("t-h4", dark ? "text-white" : "text-ink")}>
          {t.form.success.title}
        </p>
        <p className={cx("t-body mt-2", dark && "text-white/65")}>
          {t.form.success.text}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={company.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("telegram_click", { placement: "form_success" })}
            className={cx(
              "inline-flex h-12 items-center gap-2 rounded-[10px] px-5 text-[0.9375rem] font-semibold",
              "transition-colors duration-200",
              dark
                ? "bg-white text-ink hover:bg-clay hover:text-white"
                : "bg-ink text-white hover:bg-clay",
            )}
          >
            <TelegramIcon />
            {t.form.success.telegramCta}
          </a>

          <button
            type="button"
            onClick={() => {
              setName("");
              setPhone("");
              setComment("");
              setErrors({});
              setStatus("idle");
            }}
            className={cx(
              "inline-flex h-12 items-center rounded-[10px] border px-5 text-[0.9375rem] font-semibold transition-colors",
              dark
                ? "border-rule-invert-strong text-white/80 hover:text-white"
                : "border-rule-strong text-muted hover:border-ink hover:text-ink",
            )}
          >
            {t.form.success.again}
          </button>
        </div>
      </div>
    );
  }

  const fieldClass = cx(
    "h-[52px] w-full rounded-[10px] border px-4 text-[1rem] transition-colors duration-200",
    dark
      ? "border-rule-invert-strong bg-white/5 text-white placeholder:text-white/40 focus:border-white"
      : "border-rule-strong bg-paper-pure text-ink placeholder:text-muted-soft/70 focus:border-ink",
  );

  const labelClass = cx("t-label", dark ? "text-white/55" : "text-muted");

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-name`} className={labelClass}>
            {t.form.name}
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            autoFocus={autoFocus}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.form.namePlaceholder}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={cx(fieldClass, errors.name && "border-clay")}
          />
          {errors.name && (
            <p
              id={`${uid}-name-error`}
              role="alert"
              className="text-[0.8125rem] text-clay"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* The phone field owns its own mask and caret handling. */}
        <PhoneField
          id={`${uid}-phone`}
          label={t.form.phone}
          value={phone}
          onChange={setPhone}
          error={errors.phone}
          tone={tone}
        />

        {!compact && (
          <div className="flex flex-col gap-2">
            <label htmlFor={`${uid}-comment`} className={labelClass}>
              {t.form.comment}
            </label>
            <textarea
              id={`${uid}-comment`}
              name="comment"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.form.commentPlaceholder}
              className={cx(fieldClass, "h-auto resize-none py-3 leading-snug")}
            />
          </div>
        )}
      </div>

      {/* Honeypot. Positioned off-screen rather than `display:none`, which some
          bots specifically check for, and hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${uid}-company`}>{t.form.honeypot}</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {formError && (
        <p
          role="alert"
          className={cx(
            "mt-4 rounded-[10px] border border-clay/40 bg-clay-wash px-4 py-3 text-[0.875rem] leading-snug",
            dark ? "bg-clay/15 text-white" : "text-clay-deep",
          )}
        >
          {formError}
        </p>
      )}

      <Button
        type="submit"
        tone={dark ? "onDark" : "primary"}
        disabled={status === "submitting"}
        className="mt-5 w-full sm:w-auto"
        withArrow={status !== "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Spinner />
            {t.form.submitting}
          </>
        ) : (
          t.form.submit
        )}
      </Button>

      <p
        className={cx(
          "mt-4 text-[0.75rem] leading-relaxed",
          dark ? "text-white/45" : "text-muted-soft",
        )}
      >
        {t.form.privacy}{" "}
        <Link
          href={`/${locale}/privacy`}
          className="underline underline-offset-2 hover:text-ink"
        >
          {t.form.privacyLink}
        </Link>
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}
