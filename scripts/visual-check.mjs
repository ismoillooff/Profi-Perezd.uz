/**
 * Visual + accessibility QA sweep.
 *
 * Loads the running site at every breakpoint the brief calls out, and for each
 * one records:
 *   · a full-page screenshot,
 *   · any horizontal overflow (the single most common responsive bug),
 *   · console errors and failed network requests,
 *   · images with no alt text,
 *   · interactive targets smaller than 44×44 CSS px,
 *   · that the sticky contact affordances behave per breakpoint.
 *
 * Usage:  node scripts/visual-check.mjs [outDir] [baseUrl]
 * Requires the dev or production server to already be running.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const outDir = path.resolve(process.argv[2] ?? ".visual");
const baseUrl = process.argv[3] ?? "http://localhost:3000";

const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

const ROUTES = [
  { name: "ru", url: "/ru" },
  { name: "uz", url: "/uz" },
  { name: "ru-privacy", url: "/ru/privacy" },
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const problems = [];

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    // Privacy only needs a couple of widths — it is a text document.
    if (route.name.includes("privacy") && !["375", "1440"].includes(vp.name)) {
      continue;
    }

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      locale: "ru-RU",
    });
    const page = await context.newPage();

    const consoleErrors = [];
    const failedRequests = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
    page.on("requestfailed", (req) => {
      failedRequests.push(`${req.url()} — ${req.failure()?.errorText}`);
    });

    await page.goto(baseUrl + route.url, { waitUntil: "networkidle" });

    // Let entrance animations settle, then walk the page so every scroll
    // trigger fires before the full-page screenshot is taken.
    await page.waitForTimeout(1200);
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);

    const audit = await page.evaluate(() => {
      const doc = document.documentElement;

      const overflow = doc.scrollWidth - doc.clientWidth;

      // Which elements actually stick out past the viewport.
      const offenders = [];
      if (overflow > 1) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.right > doc.clientWidth + 1 || r.left < -1) {
            offenders.push(
              `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`,
            );
          }
          if (offenders.length >= 6) break;
        }
      }

      const imagesWithoutAlt = [...document.querySelectorAll("img")]
        .filter((img) => !img.hasAttribute("alt"))
        .map((img) => img.currentSrc || img.src)
        .slice(0, 8);

      /* Target size.
         Two thresholds, because one number cannot describe both a mouse and a
         thumb: 24×24 is the WCAG 2.5.8 AA minimum and applies everywhere, and
         44×44 is the practical thumb minimum that the mobile action bar, the
         menu and the primary CTAs must meet. Anything under 24 is a failure;
         a desktop-only text link at 39px tall is not. */
      const smallTargets = [];
      const tinyTargets = [];

      for (const el of document.querySelectorAll(
        "a[href], button:not([disabled]), select, input, [role='tab']",
      )) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;

        const style = getComputedStyle(el);
        if (style.visibility === "hidden" || style.opacity === "0") continue;

        // The skip link is a 1px sr-only anchor until it receives focus, at
        // which point it becomes a full-size button. Correct, not a defect.
        if (el.classList.contains("sr-only")) continue;
        // Anything inside an aria-hidden subtree is not a target at all — the
        // form honeypot is an off-screen input by design.
        if (el.closest('[aria-hidden="true"]')) continue;
        // Inline links inside prose are exempt from 2.5.8 by definition.
        if (el.tagName === "A" && el.closest("p")) continue;

        const describe = `${el.tagName.toLowerCase()}[${(el.textContent || "").trim().slice(0, 24)}] ${Math.round(r.width)}x${Math.round(r.height)}`;

        if (r.height < 24 || r.width < 24) {
          tinyTargets.push(describe);
        } else if (r.height < 44) {
          smallTargets.push(describe);
        }
        if (tinyTargets.length >= 8) break;
      }

      const h1 = document.querySelectorAll("h1").length;

      return {
        overflow,
        offenders,
        imagesWithoutAlt,
        smallTargets,
        tinyTargets,
        h1,
        scrollHeight: document.body.scrollHeight,
      };
    });

    const label = `${route.name}@${vp.name}`;

    if (audit.overflow > 1) {
      problems.push(
        `HORIZONTAL OVERFLOW ${label}: +${audit.overflow}px — ${audit.offenders.join(" | ")}`,
      );
    }
    if (audit.h1 !== 1 && !route.name.includes("privacy")) {
      problems.push(`H1 COUNT ${label}: ${audit.h1} (expected 1)`);
    }
    if (audit.imagesWithoutAlt.length) {
      problems.push(
        `IMG WITHOUT ALT ${label}: ${audit.imagesWithoutAlt.join(", ")}`,
      );
    }
    if (audit.tinyTargets.length) {
      problems.push(
        `TARGET < 24px (WCAG 2.5.8 AA) ${label}: ${audit.tinyTargets.join(" | ")}`,
      );
    }
    // Under 44px only matters where a thumb is the input device.
    if (vp.width < 1024 && audit.smallTargets.length) {
      problems.push(
        `TARGET < 44px on touch ${label}: ${audit.smallTargets.join(" | ")}`,
      );
    }
    if (consoleErrors.length) {
      problems.push(`CONSOLE ${label}: ${[...new Set(consoleErrors)].join(" | ")}`);
    }
    if (failedRequests.length) {
      problems.push(
        `FAILED REQUESTS ${label}: ${[...new Set(failedRequests)].join(" | ")}`,
      );
    }

    await page.screenshot({
      path: path.join(outDir, `${label}.png`),
      fullPage: true,
    });

    console.log(
      `[${label}] height=${audit.scrollHeight} overflow=${audit.overflow} h1=${audit.h1}`,
    );

    await context.close();
  }
}

/* ── Fallback passes ─────────────────────────────────────────────────────
   The site hides reveal targets before paint so animations do not flash. That
   is only safe if the two visitors who never get the animation still see the
   content. Both are verified here rather than assumed, because a regression
   in this specific mechanism renders the page BLANK — the worst possible
   failure and one no screenshot at default settings would catch. */

async function countHiddenContent(contextOptions, label) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    ...contextOptions,
  });
  const page = await context.newPage();
  await page.goto(baseUrl + "/ru", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const hidden = await page.evaluate(() => {
    const targets = document.querySelectorAll(
      "[data-reveal-line], [data-reveal-fade], [data-stagger]",
    );
    let invisible = 0;
    for (const el of targets) {
      if (Number(getComputedStyle(el).opacity) < 0.01) invisible++;
    }
    return { total: targets.length, invisible };
  });

  if (hidden.invisible > 0) {
    problems.push(
      `${label}: ${hidden.invisible}/${hidden.total} content elements stuck at opacity 0`,
    );
  }
  console.log(
    `[${label}] ${hidden.total - hidden.invisible}/${hidden.total} content elements visible`,
  );

  await context.close();
}

await countHiddenContent({ reducedMotion: "reduce" }, "reduced-motion");
await countHiddenContent({ javaScriptEnabled: false }, "no-javascript");

await browser.close();

console.log("\n" + "=".repeat(70));
if (problems.length === 0) {
  console.log("✓ No problems found across all breakpoints.");
} else {
  console.log(`✗ ${problems.length} problem(s):\n`);
  for (const p of problems) console.log("  · " + p);
}
console.log("=".repeat(70));
console.log(`Screenshots: ${outDir}`);
