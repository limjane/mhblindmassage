# Decisions (append-only)

## 2026-07-06 — Initial build
- **Languages:** EN + 中文 toggle on one page (user sign-off). No BM for now.
- **Hosting:** GitHub Pages, free (user sign-off). URL assumed `mhblindmassage.github.io` until account created.
- **Business details:** build with clearly-marked placeholders (user sign-off); real phone/hours/prices to follow.
- **Stack:** single static HTML file, no framework — fastest load, free hosting, best indexability. All animation CSS/SVG (vector = sharp at 4K).
- **Imagery:** original SVG illustrations. Facebook photos unreachable (login wall) and unlicensed for reuse anyway.
- **SEO:** LocalBusiness JSON-LD with exact GPS coords + Facebook sameAs; OG tags; sitemap + robots. Google Business Profile flagged as the real driver (owner action needed).

## 2026-07-06 — Config screen, accessibility, PWA, booking
- **Owner self-maintenance:** admin.html + data/site-config.json + js/site-config.js. Fail-safe: bad/missing config never breaks the site (user requirement: modular, non-breaking).
- **Publish paths:** GitHub Contents API direct-publish (token in owner's browser only) AND manual download/replace — both built, no sign-off fork needed.
- **App type:** PWA, not native store app (user sign-off). Free, one codebase, installable on home screens.
- **Booking:** WhatsApp deep-link form now; third-party booking service deferred until demand shown (user chose "Both").
- **Accessibility:** screen-reader-first because owner is blind — label/for on all admin fields, aria-live statuses, skip link, main landmark, focus-visible, reduced-motion already respected.

## 2026-07-07 — Light theme + anatomical foot↔body reflexology explorer
- **Theme lightened** (user: "colour is too dark, prefer original... but keep good content and animation"): hero night-gold → light-gold cinematic (warm radial light, pastel aurora, glowing motes, shimmer kept, darker shimmer gradient for contrast on light bg). Nav + ribbon lightened. **The Science meridian section deliberately stays dark** (user sign-off Q4 "ok") as a cinematic contrast band; footer stays dark.
- **"Real 4K cinematic photos" constraint surfaced:** cannot generate photographs. Options offered (premium SVG / user-sourced stock / AI-generated images); **user signed off on premium SVG illustration** — new hero art is a cinematic massage scene (therapist with pressing-hands animation, pressure glows, rising "tension relief" waves). Stock/AI photos can be layered in later without a rebuild.
- **Reflexology map rebuilt as a linked foot↔body view** (user: "which part connects to which part... so people don't have to imagine"): one SVG stage — anatomical sole (skin gradients, arch/heel shading, creases, soft-edge zone overlays) + full-body silhouette with drawn organs. Selecting a zone animates a glowing dashed pathway with a travelling pulse dot across to the matching organ, which lights up and pulses. Zones, pills, AND organs are all clickable; keyboard + aria-live + reduced-motion preserved. Silhouette chosen over anatomical cross-section (clarity at small sizes; matches the meridian figure's visual language).
- **SW cache bumped v2→v3** so returning visitors get the new shell. Verified locally on port 8140 (DOM assertions + zero console errors; SW cache had to be cleared to see changes — remember this when verifying: the PWA serves index.html cache-first). Deployed: commit bff85fc pushed to main.

## 2026-07-06 — Premium redesign + knowledge features
- **"$10K look" redesign** (user sign-off, creative freedom granted): night-gold cinematic hero, Fraunces/Noto Serif SC typography, light-mote particles, shimmer text, scroll progress bar.
- **"3D/5D nerve massage" interpreted as:** interactive Meridian Body Explorer — SVG figure, animated energy travelling along meridian/nerve paths (SMIL animateMotion), 6 clickable bilingual acupressure points, CSS 3D tilt. Plus interactive foot reflexology map (5 zones).
- **Knowledge sharing:** 4 expandable education cards (tuina, reflexology science, first visit, aftercare).
- **Photos:** cannot generate raster photography; premium SVG illustration route chosen instead (sharp at any resolution, no licensing risk).
- **URL finalized:** https://limjane.github.io/mhblindmassage/ — canonical/OG/JSON-LD/sitemap/robots all updated; og-image.png generated (GDI+).
- **Modularity preserved:** all site-config.js hook IDs unchanged; redesign is presentation-layer only. SW cache bumped v1→v2.
