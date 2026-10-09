"use client";

import { useRef, type ChangeEvent } from "react";
import { cx } from "@/lib/cx";
import {
  PHONE_PLACEHOLDER,
  caretAfterFormat,
  digitsBeforeCaret,
  formatPhone,
} from "@/lib/phone";

/**
 * Uzbek phone input.
 *
 * Formats as the visitor types and, critically, puts the caret back where they
 * left it. Reformatting replaces the whole value, which normally throws the
 * caret to the end — so correcting a single wrong digit in the middle of a
 * number becomes impossible, and the visitor clears the field and starts over.
 * That is a real, measurable way to lose a lead on a form this short.
 *
 * `inputMode="tel"` rather than `type="tel"` plus a pattern: it brings up the
 * numeric keypad on mobile without the browser applying its own idea of what a
 * valid phone number looks like.
 */
export function PhoneField({
  id,
  value,
  onChange,
  label,
  error,
  required = true,
  autoComplete = "tel",
  tone = "light",
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: string | null;
  required?: boolean;
  autoComplete?: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const caret = input.selectionStart ?? input.value.length;
    const digits = digitsBeforeCaret(input.value, caret);

    const formatted = formatPhone(input.value);
    onChange(formatted);

    // The value we just set is applied by React on the next commit, so the
    // caret has to be restored after it lands.
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el || document.activeElement !== el) return;
      const next = caretAfterFormat(formatted, digits);
      el.setSelectionRange(next, next);
    });
  };

  const errorId = `${id}-error`;
  const dark = tone === "dark";

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cx("t-label", dark ? "text-white/55" : "text-muted")}
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name="phone"
        type="text"
        inputMode="tel"
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={handleChange}
        placeholder={PHONE_PLACEHOLDER}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cx(
          "tnum h-[52px] w-full rounded-[10px] border px-4 text-[1rem]",
          "transition-colors duration-200",
          dark
            ? "bg-white/5 text-white placeholder:text-white/40 focus:border-white"
            : "bg-paper-pure text-ink placeholder:text-muted-soft/70 focus:border-ink",
          error
            ? "border-clay"
            : dark
              ? "border-rule-invert-strong"
              : "border-rule-strong",
        )}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className={cx(
            "text-[0.8125rem]",
            dark ? "text-clay-wash" : "text-clay",
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}
