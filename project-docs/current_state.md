# M H Blind Massage Center — current state

**Last updated:** 2026-07-06

## What this is
Free single-page marketing website + installable PWA for M H Blind Massage Center 巧手堂盲人按摩推拿中心 (blind-community massage shop, Simpang Ampat, Penang). Goal: public support + Google/AI discoverability + self-maintainable by the blind owner.

## Status: BUILT + VERIFIED locally, not yet published
Local preview: `http://localhost:8140` (launch config `mh-blind-massage` in root `.claude/launch.json`).

### Architecture (modular — each piece fails safe)
- `index.html` — bilingual (EN/中文) animated one-pager. Static defaults for everything; enhanced at load by config. Sections: hero, ribbon, story, services, why, support band, **booking form (#book)**, visit/map, footer.
- `data/site-config.json` — SINGLE SOURCE OF TRUTH for phone, WhatsApp, address, hours, announcement, services/prices. Only file that changes for content updates.
- `js/site-config.js` — reads config → renders contact/services/announcement/booking + patches JSON-LD. If config missing/broken, HTML defaults stay; site never breaks. Also handles `?draft=1` preview from admin.
- `admin.html` — owner settings screen (bilingual, screen-reader accessible: label-for associations, aria-live status, focus-visible). Actions: 👁 Preview (localStorage draft), 💾 Download JSON, 🚀 Publish direct to GitHub via Contents API (fine-grained token stored in browser localStorage). noindex + robots-disallowed.
- **PWA:** `manifest.webmanifest`, `sw.js` (shell cache-first; config/admin network-first), `icons/icon-192.png` + `icon-512.png` (generated, 手 seal on terracotta).
- **Booking:** form builds pre-filled WhatsApp message via wa.me deep link (opens WhatsApp app). If no WhatsApp number in config → graceful Facebook fallback message. Verified both paths in browser.
- SEO: JSON-LD LocalBusiness (auto-synced from config at runtime), OG tags, `sitemap.xml`, `robots.txt`.

## Placeholders still to fill (via admin.html once real data known)
1. Phone, 2. WhatsApp number (enables hero button + booking), 3. street address, 4. opening hours, 5. prices. Plus optional `og-image.png` (referenced in meta, not created).

## Next steps
1. Get real business details from shop → enter in admin.html → done.
2. Publish to GitHub Pages (gh CLI NOT installed; git repo ready). If final URL ≠ mhblindmassage.github.io: update canonical/OG in index.html + robots.txt + sitemap.xml.
3. Post-publish: Google Search Console sitemap submit; owner claims Google Business Profile (biggest customer driver).
4. Deferred decision: evaluate third-party booking service (Fresha/SimplyBook) only if WhatsApp booking volume demands it.
