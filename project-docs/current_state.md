# M H Blind Massage Center — current state

**Last updated:** 2026-07-06

## What this is
Free single-page marketing website for M H Blind Massage Center 巧手堂盲人按摩推拿中心 (blind-community massage shop, Simpang Ampat, Penang). Goal: public support + Google/AI discoverability.

## Status: BUILT, not yet published
- `index.html` — complete bilingual (EN/中文 toggle, persisted) single page: animated hero (SVG hands/lotus, drifting orbs), marquee ribbon, story + counters, 4 service cards, why-blind-massage, support band, Google Maps embed (5.284148,100.483452), footer. Scroll reveals, prefers-reduced-motion respected. LocalBusiness JSON-LD + OG tags inline.
- `robots.txt`, `sitemap.xml` — assume final URL `https://mhblindmassage.github.io/`.
- Original SVG artwork only (Facebook photos not accessible — login wall).

## Placeholders to replace before/after launch (marked with yellow dashed underline in page, class `placeholder`)
1. Phone/WhatsApp: `+60 1X-XXX XXXX` (also in JSON-LD `telephone`)
2. Street address (page + JSON-LD `address`)
3. Opening hours (page; add `openingHoursSpecification` to JSON-LD when known)
4. Service prices `RM XX`
5. `og-image.png` referenced but not created yet (optional)

## Next steps
1. User gets real phone/hours/prices/address from the shop → replace placeholders.
2. Publish: create GitHub account/repo `mhblindmassage.github.io` (or any repo + Pages), push. gh CLI NOT installed on this machine; git is (2.54). Local repo initialized.
3. After publish: submit sitemap in Google Search Console; create/claim Google Business Profile (biggest customer driver — needs owner's phone verification).
4. If final URL differs from mhblindmassage.github.io: update canonical/OG/JSON-LD urls, robots.txt, sitemap.xml.
