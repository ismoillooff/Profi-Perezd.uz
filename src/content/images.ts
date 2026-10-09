/**
 * Photography manifest.
 * ─────────────────────────────────────────────────────────────────────────
 * Every image the site uses is declared here ONCE. Sections reference a slot;
 * they never hardcode a path or a size.
 *
 * Deliberately short. Fourteen strong photographs carry this site further than
 * forty weak ones, and every extra frame is another chance for the set to stop
 * looking like one shoot.
 *
 * HOW TO ADD THE PHOTOS
 *   1. Drop files into `public/images/` using exactly the `file` name below.
 *   2. Run `npm run dev` or `npm run build` — `scripts/scan-assets.mjs`
 *      re-scans the folder and the site switches from the pending frame to the
 *      real photograph with no code change.
 *   .jpg / .jpeg / .webp / .avif / .png are all accepted for a slot declared
 *   as .jpg, so whatever the photographer delivers will resolve.
 *
 * Art direction and per-image shot notes: see IMAGE-BRIEF.md
 */

export type ImageSlot = {
  id: string;
  file: string;
  /** Intrinsic size of the source — next/image reserves the box from this. */
  width: number;
  height: number;
  priority?: boolean;
};

const slot = (
  id: string,
  width: number,
  height: number,
  priority = false,
): ImageSlot => ({ id, file: `${id}.jpg`, width, height, priority });

export const IMAGES = {
  /* Hero — the one image that decides whether the visitor stays ----------- */

  // 16:9 source, cropped tall on mobile. The only priority image on the page.
  hero: slot("hero", 2560, 1440, true),

  /* Problem → solution story --------------------------------------------- */

  // Shot in the same room, same light, before and after the team arrives.
  // The pair only works if they are visibly the same place.
  chaos: slot("story-before", 1600, 1200),
  order: slot("story-after", 1600, 1200),

  /* Services — one frame per service, shown on hover/focus ---------------- */

  svcApartment: slot("service-apartment", 1600, 2000),
  svcOffice: slot("service-office", 1600, 2000),
  svcMovers: slot("service-movers", 1600, 2000),
  svcFreight: slot("service-freight", 1600, 2000),
  svcFurniture: slot("service-furniture", 1600, 2000),
  svcPacking: slot("service-packing", 1600, 2000),
  svcFragile: slot("service-fragile", 1600, 2000),

  /* Process — the single large visual beside the sticky step list -------- */

  process: slot("process", 1600, 2000),

  /* Real work ------------------------------------------------------------ */

  project1: slot("project-1", 2000, 1500),
  project2: slot("project-2", 2000, 1500),
  project3: slot("project-3", 2000, 1500),
  project4: slot("project-4", 2000, 1500),
  project5: slot("project-5", 2000, 1500),
  project6: slot("project-6", 2000, 1500),

  /* Closing CTA band ----------------------------------------------------- */

  cta: slot("cta", 2400, 1200),
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof IMAGES;
export const ALL_SLOTS: ImageSlot[] = Object.values(IMAGES);
