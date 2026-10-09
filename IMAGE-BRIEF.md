# Photography brief — Profi Pereezd

The site is built and works today. Every image slot currently renders a
labelled pending frame. Drop real files into `public/images/` using the exact
names below and run `npm run dev` (or `npm run build`) — the site picks them up
automatically, no code change.

Accepted formats for any slot: `.jpg` `.jpeg` `.webp` `.avif` `.png`.
Next.js re-encodes to AVIF/WebP and generates responsive sizes at build time,
so **supply the largest quality original you have** rather than pre-optimising.

---

## Art direction

The whole site is built on one promise: *we handle your things carefully*.
Every photograph has to make that literal.

**Shoot:**

- Real jobs, real team, real branded transport. Uzbek apartments and offices.
- People **working** — lifting, wrapping, carrying, assembling. Hands in frame.
- Protective materials visible: stretch film, blankets, corner guards, straps,
  labelled boxes, door and floor protection.
- Natural light. Slightly desaturated, warm. Documentary, not advertising.
- Wide shots that show the whole room, plus tight detail shots of one action.

**Do not shoot:**

- Anyone smiling at the camera holding an empty cardboard box.
- Staged handshakes, thumbs-up, folded arms in front of a van.
- Anything that reads as a stock library. If it could be any company in any
  country, it is the wrong photograph.
- Heavy filters, HDR, vignettes, motion blur "energy" effects.

**Faces:** get verbal consent from the team and from clients whose home is in
shot. A recognisable client apartment needs the client's permission.

---

## Slots

| File | Size (min) | Crop | What it must show |
|---|---|---|---|
| `hero.jpg` | 2560×1440 | 16:9, cropped tall on mobile | **The single most important image.** Two movers carrying a wrapped item through an apartment doorway, mid-action, protective film clearly visible. Room must read as a real home. Composition must leave the **left and lower-left area calm** — the headline sits there over a dark scrim. |
| `story-before.jpg` | 1600×1200 | 4:3 | A room *before* the team starts: furniture in place, belongings scattered, nothing packed. Honest, slightly cluttered. |
| `story-after.jpg` | 1600×1200 | 4:3 | **Same room, same light, same angle**, after the team has worked: everything wrapped, boxed, labelled, stacked. The pair only works if it is visibly the same place. |
| `service-apartment.jpg` | 1600×2000 | 4:5 portrait | Movers carrying wrapped furniture out of an apartment / down stairs. |
| `service-office.jpg` | 1600×2000 | 4:5 portrait | Labelled boxes and wrapped monitors at office workstations. |
| `service-movers.jpg` | 1600×2000 | 4:5 portrait | Two movers lifting something heavy on a staircase, straps in use. |
| `service-freight.jpg` | 1600×2000 | 4:5 portrait | Branded van/Labo, rear open, cargo strapped and secured. |
| `service-furniture.jpg` | 1600×2000 | 4:5 portrait | Someone disassembling a wardrobe, tools in hand, hardware in a labelled bag. |
| `service-packing.jpg` | 1600×2000 | 4:5 portrait | Hands wrapping plates/glassware in bubble wrap beside an open box. |
| `service-fragile.jpg` | 1600×2000 | 4:5 portrait | Rigging a genuinely heavy/fragile object — piano, safe, large appliance — with straps and padding. |
| `process.jpg` | 1600×2000 | 4:5 portrait | The team mid-job, reads as "a working day". Bottom third stays calm — a large stage number sits over it. |
| `project-1.jpg` … `project-6.jpg` | 2000×1500 | 4:3 | Six **different real jobs**. `project-1` is shown double-width, so give it the strongest wide composition. Match the categories in `src/content/ru.ts → projects.items`: 1 apartment · 2 office · 3 furniture · 4 apartment · 5 freight · 6 office. |
| `cta.jpg` | 2400×1200 | 2:1, very wide | Loaded van ready to leave, or the team finishing up. Sits at **28% opacity behind dark text** — must work as texture, so avoid busy detail and hard highlights. |

---

## Also needed from the client

These are not photography, but the site has `TODO(client)` markers waiting on
them:

1. **Logo as SVG.** The current file (`design/logo-source.jpg`, pulled from the
   live site) is a JPEG on a hard black background and cannot be used on the
   new warm-paper design. `src/components/brand/LogoMark.tsx` currently draws a
   redrawn SVG mark; a real SVG makes it a straight swap.
2. **Client logos** for Golden House, Insight Solutions, UBC Group and Fintech
   Innovations — SVG or transparent PNG. They are currently set as type in
   `src/components/sections/Proof.tsx`.
3. **Real project facts** for the six jobs: route (district → district),
   duration, team size, vehicles. These ship empty on purpose and appear
   automatically once filled in `src/content/ru.ts` and `uz.ts`.
4. **Street address**, if the company wants one published — it strengthens
   local SEO considerably (`src/content/company.ts → address.street`).
5. **Confirmed working hours** (`company.hours`).
6. **WhatsApp number**, if the company uses one (`company.whatsapp.number`).
7. **Price coefficients**, if the calculator should show a real estimate
   (`src/content/pricing.ts`).
