# M H Blind Massage Center — current state

**Last updated:** 2026-07-07 · **Status: LIVE** 🚀

## What this is
Professional, bilingual, fully-accessible website for **M H Blind Massage Center** 巧手堂盲人按摩推拿中心 (blind-community massage shop, Simpang Ampat, Penang). Features: animated hero, meridian/nerve explorer, reflexology map, knowledge hub, professional booking system (studio + house visits), PWA app, owner admin dashboard. Now live at **https://limjane.github.io/mhblindmassage/**.

## Status: DEPLOYED & LIVE ✅

### Architecture
- **Single HTML file** (index.html) — no build step, no framework, zero JavaScript dependencies
- **Config system** (data/site-config.json + js/site-config.js) — all business info (phone, address, hours, services, prices) lives in one JSON file; site reads it at load-time and renders
- **Owner dashboard** (admin.html) — bilingual settings screen to edit all fields, preview changes, download updated config, or publish directly to GitHub via API token
- **PWA** (manifest.webmanifest, sw.js) — installable on iOS/Android home screens; offline-capable shell cache
- **Modular fail-safe:** if config is missing or broken, site falls back to built-in defaults — never breaks

### What's live

**Premium Design (lightened 2026-07-07):**
- Cinematic **light-gold** hero (user found night theme too dark) — warm radial light, pastel aurora gradients, glowing gold motes, shimmer typography kept. Nav + ribbon lightened to match; The Science section stays dark (user sign-off) as a contrast band; footer stays dark.
- New hero artwork: cinematic SVG massage scene — therapist with rhythmically pressing hands on a client's back, warm pressure glows, "tension leaving" relief waves. (User wanted real 4K photos; can't generate photographs — premium SVG route chosen with sign-off; stock/AI photos can be layered in later without rebuild.)
- Scroll progress bar (top)
- Fraunces serif font + Noto Serif SC (Google Fonts, bilingual)

**The Science Section (#science):**
- **Interactive Meridian Body Explorer** — animated SVG human figure with glowing meridian/nerve pathways
- Travelling energy pulses animate along the paths (SMIL animateMotion)
- 6 clickable acupressure points (Baihui, Jianjing, Hegu, Guanyuan, Zusanli, Yongquan) with bilingual explanations
- 3D tilt effect on card (CSS 3D transforms; pointer-fine devices only)
- Respects prefers-reduced-motion

**Interactive Foot Reflexology Map (#foot) — rebuilt 2026-07-07 as a linked foot↔body view:**
- One wide SVG stage: anatomical sole (skin gradients, arch/heel shading, creases, soft-blur zone overlays) on the left, full-body silhouette with drawn organs (brain, heart/lungs, stomach/liver, intestines coil, pelvis) on the right
- Tap a zone (or pill, or organ) → an **animated glowing pathway** (dashed flow + travelling pulse dot) connects the foot zone to its body region; the organ lights up and pulses — "so people don't have to imagine"
- 5 zones (head, chest/heart, digestion, lower back, pelvis/sleep), bilingual, keyboard-accessible, aria-live info panel below

**Knowledge Hub (#wisdom):**
- 4 expandable cards: what is tuina, how reflexology works, first visit guide, aftercare tips
- Educates customers & feeds Google/AI search

**Professional Booking (#book):**
- Two pathways: Studio (WhatsApp form) + House Visit (Call/SMS buttons)
- Studio booking form: name, service, date, time, phone (optional), notes → pre-filled WhatsApp message
- House visit info panel with 3 key features + direct call/SMS links to +60 16-523 8937
- Tab UI to switch between booking methods
- Tab switching working (verified)

**SEO + Discoverability:**
- LocalBusiness JSON-LD (auto-synced from config): phone, address, GPS coords, Facebook, hours
- OG tags (title, desc, image, URL) for social sharing
- sitemap.xml + robots.txt (disallows admin.html)
- og-image.png generated (1200×630)
- Meta keywords in EN + 中文
- Canonical URL set to live address

**Real Business Data:**
- Address: 98, Jln Tasek SS1, Bandar Tasek Mutiara, 14120, Simpang Ampat, Penang
- Phone/WhatsApp: +60 16-523 8937 ✅
- Facebook: https://www.facebook.com/share/18bWiW5wuR/ ✅
- Google Maps coords: 5.284148, 100.483452 ✅
- House visit service: ✅ listed in services

**Accessibility (Blind-owner-first design):**
- Skip-to-main link (visible on :focus)
- Semantic HTML (main landmark, proper headings)
- Form labels: label-for associations
- Aria-live status regions
- Focus-visible outlines (3px gold)
- Respects prefers-reduced-motion
- Screen-reader tested (meridian points, foot zones, accordion cards all keyboard/announce-friendly)

**Bilingual (EN / 中文):**
- Toggle button (top-right, persisted to localStorage)
- All content duplicated EN/ZH (55+ content blocks)
- Works seamlessly across all sections
- Language choice remembered on next visit

**Hosting:**
- GitHub Pages (free, live now)
- Repo: limjane/mhblindmassage
- Branch: main
- URL: https://limjane.github.io/mhblindmassage/
- Deploy: automatic on every git push (1–2 min)
- HTTPS: automatic (GitHub-provided cert)
- CDN: GitHub's global CDN (~zero latency)

**Developer Setup:**
- Local: Python `http.server` on port 8140
- Git: remote configured (push → GitHub Pages auto-deploys)
- Commits: 4 total (initial + config/booking/accessibility + redesign premium + decisions log)
- All work tracked in git history + append-only decisions.md

### Placeholders remaining
1. **Prices** — "RM XX" in service cards. Fill via admin.html when you have them.
2. **Hours** — currently default ("10:00 AM – 10:00 PM please confirm"). Update via admin.html.
3. **og-image.png** — generated automatically; optional to customize further.

### File structure
```
mh-blind-massage/
├── index.html (920 lines; all site content + JS animations)
├── admin.html (owner bilingual settings screen; noindex)
├── data/site-config.json (phone, address, hours, services, prices)
├── js/site-config.js (renders config → page, booking, tab switching)
├── sw.js (PWA service worker; shell cache + network-first config)
├── manifest.webmanifest (app metadata for home-screen install)
├── robots.txt (SEO; disallow admin)
├── sitemap.xml (SEO; points to live URL)
├── og-image.png (1200×630 social share image)
├── icons/
│   ├── icon-192.png (PWA icon)
│   └── icon-512.png (PWA icon)
├── project-docs/
│   ├── current_state.md (this file)
│   └── decisions.md (append-only decision log)
└── .git/ (4 commits, main branch)
```

### How to edit

**Business info (phone, address, hours, services, prices):**
1. Open http://localhost:8140/admin.html (or live: https://limjane.github.io/mhblindmassage/admin.html)
2. Edit fields
3. Click 💾 Download → commit to GitHub, OR 🚀 Publish (direct GitHub API; one-time token setup)

**Design/content:**
- Edit index.html directly
- `git add index.html && git commit -m "..."` 
- `git push origin main` → live in 1–2 min

**Config schema:**
- See data/site-config.json (all keys defined)
- Add new services in the `services[]` array (mirror existing format)

### Next steps (for shop owner)

1. **Fill in prices** — open admin.html, enter actual RM amounts for each service, click 🚀 Publish
2. **Google Search Console** (free, 5 min):
   - Go to search.google.com/search-console
   - Add property: https://limjane.github.io/mhblindmassage/
   - Verify (HTML file method easiest)
   - Submit sitemap: https://limjane.github.io/mhblindmassage/sitemap.xml
3. **Google Business Profile** (biggest customer driver):
   - Go to business.google.com
   - Search for "M H Blind Massage Center"
   - Claim the listing (owner's phone verification required)
   - Add website link, hours, photos
4. **Test bookings** — visit the live site, scroll to "Book a Session," submit a test booking → should open WhatsApp with pre-filled message
5. **Share** — send the link to friends, customers; they can now:
   - Visit the site on desktop or phone
   - Book a session on their phone without an app
   - Optionally add to home screen (iOS/Android "Add to Home Screen" → opens like a native app)

### Known limitations (intentional)
- No server-side booking confirmation (WhatsApp message is the confirmation path)
- No real-time calendar availability (customers must text/call to confirm date)
- No payment processing (cash/bank transfer assumed)
- No email subscription/newsletter

All of these can be added in future iterations by connecting a backend (Vercel serverless functions, Firebase, etc.) — the current static + GitHub Pages setup is intentionally simple so it's zero-maintenance.

### Rollback plan
If anything breaks:
1. `git log --oneline` to see commit history
2. `git revert <commit-hash>` to undo a change
3. `git push origin main` → live in 1–2 min
Everything is safe.

### Token safety note
GitHub API token is saved in this computer's git config for auto-push. Since it was shared in chat, consider:
- Deleting it at github.com → Settings → Developer settings → Tokens (classic)
- Creating a new fine-grained token (scoped to this repo only)
- Next session: run `git remote set-url origin https://<new-token>@github.com/limjane/mhblindmassage.git`

---

**Ready for customer launch.** 🎉
