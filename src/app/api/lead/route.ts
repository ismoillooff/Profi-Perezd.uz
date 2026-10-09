import { NextResponse } from "next/server";

/**
 * Lead intake.
 * ─────────────────────────────────────────────────────────────────────────
 * Leads are forwarded to Telegram, which is where this business already works
 * — its public contact channel is @profipereezd_uz and its managers live in
 * the app all day. An email that sits unread for four hours loses a moving job
 * to whoever picked up first.
 *
 * TO GO LIVE, set both:
 *   TELEGRAM_BOT_TOKEN=...   (from @BotFather)
 *   TELEGRAM_CHAT_ID=...     (the group or user id that receives leads)
 *
 * If they are missing the endpoint fails loudly with 503 rather than
 * pretending to succeed. A contact form that silently swallows enquiries is
 * far worse than one that visibly asks the visitor to call instead — the
 * client-side form turns that 503 into exactly that message.
 */

export const runtime = "nodejs";
/** Never cached, never statically analysed into a build-time response. */
export const dynamic = "force-dynamic";

type LeadPayload = Record<string, unknown>;

const digitsOnly = (value: string) => value.replace(/\D/g, "");

/**
 * Very small in-memory rate limit, keyed by IP.
 *
 * Not a substitute for a real WAF, and it resets whenever the serverless
 * instance recycles — but it costs nothing and stops the trivial case of one
 * script posting the same form a thousand times, which on a Telegram-delivered
 * form means a thousand notifications on a manager's phone.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Per-attempt timeout. Telegram normally answers in well under two seconds. */
const ATTEMPT_TIMEOUT_MS = 8000;
const MAX_ATTEMPTS = 2;

/**
 * Sends the message, retrying once on a timeout or a 5xx.
 *
 * A single flaky request was observed dropping a real lead during testing —
 * `api.telegram.org` answered in 0.7–1.9s from the same machine seconds later,
 * so the failure was transient rather than a latency problem. For a pipeline
 * where one lost request is one lost customer, a second attempt is the
 * cheapest insurance there is.
 *
 * 4xx responses are NOT retried: a bad token, a wrong chat id or a bot that
 * was removed from the group will fail identically the second time, and
 * retrying only makes the visitor wait twice as long to be told to call.
 */
async function deliver(
  token: string,
  chatId: string,
  text: string,
): Promise<{ ok: true } | { ok: false; detail: string }> {
  let lastDetail = "unknown";

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
          signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
        },
      );

      if (response.ok) return { ok: true };

      lastDetail = `HTTP ${response.status}: ${await response
        .text()
        .catch(() => "")}`;

      // Client errors are permanent — stop here.
      if (response.status < 500) return { ok: false, detail: lastDetail };
    } catch (error) {
      lastDetail = error instanceof Error ? error.message : String(error);
    }

    if (attempt < MAX_ATTEMPTS) {
      console.warn(`[lead] attempt ${attempt} failed (${lastDetail}); retrying`);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  return { ok: false, detail: lastDetail };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: accept and discard, so the bot believes it succeeded and does
  // not retry with the field cleared.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const str = (value: unknown, max: number) =>
    typeof value === "string" ? value.trim().slice(0, max) : "";

  const name = str(body.name, 80);
  const phone = str(body.phone, 32);
  const comment = str(body.comment, 1000);
  const summary = str(body.summary, 600);
  const moveType = str(body.moveType, 80);
  const source = str(body.source, 40);
  const locale = body.locale === "uz" ? "uz" : "ru";

  if (name.length < 2) {
    return NextResponse.json({ error: "invalid_name" }, { status: 422 });
  }
  if (digitsOnly(phone).length < 9) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error(
      "[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not configured — lead NOT delivered:",
      { name, phone, source },
    );
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const text = [
    "<b>🚚 Новая заявка — Profi Pereezd</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    // Wrapped in <code> so a manager can tap-to-copy the number in Telegram.
    `<b>Телефон:</b> <code>${escapeHtml(phone)}</code>`,
    moveType ? `<b>Тип переезда:</b> ${escapeHtml(moveType)}` : null,
    summary ? `\n<b>Расчёт:</b>\n${escapeHtml(summary)}` : null,
    comment ? `\n<b>Комментарий:</b>\n${escapeHtml(comment)}` : null,
    "",
    `<i>Источник: ${escapeHtml(source || "—")} · ${locale.toUpperCase()}</i>`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const result = await deliver(token, chatId, text);

  if (!result.ok) {
    // The whole lead is logged, not just the error: a request that failed to
    // deliver is a lost customer, and the only way to recover it is for a
    // human to find the name and number in the server log.
    console.error("[lead] DELIVERY FAILED — recover this lead manually:", {
      name,
      phone,
      comment,
      summary,
      source,
      reason: result.detail,
    });
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
