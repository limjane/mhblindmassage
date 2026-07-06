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
