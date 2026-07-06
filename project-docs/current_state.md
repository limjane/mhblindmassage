# M H Blind Massage Center — current state

**Last updated:** 2026-07-06

## What this is
Professional, fully-accessible, bilingual website + PWA + owner settings dashboard for **M H Blind Massage Center** 巧手堂盲人按摩推拿中心 (blind-community massage shop, Simpang Ampat, Penang). Live booking features for both studio sessions and house visits. Self-maintainable by the blind owner via admin panel.

## Status: BUILT + VERIFIED, ready to publish

Local preview: `http://localhost:8140` (Python HTTP server on port 8140).
Repo: Git-initialized, 3 commits, ready to push to GitHub Pages.

### What's finished

**Site Content** (index.html, fully bilingual EN/中文):
- Animated hero with SVG artwork (hands, lotus, energy waves, drifting orbs)
- Story section with stat counters + warm illustrated room scene
- **Services grid** showing 4 studio services + House Visit option with descriptions
- "Why blind massage" section (4 reasons: heightened touch, training, focus, social impact)
- **Floating lantern support band** encouraging bookings/sharing
- Why section with counters (100% blind-operated, 7-day week, ∞ care)

**Professional Booking System** (NEW — #book section):
- **Two booking pathways:**
  - **Studio Session:** Bilingual form (name, service, date, time, phone optional, notes) → generates WhatsApp message → deep-links to WhatsApp app with pre-filled booking request
  - **House Visit:** Info panel (3 key features: same pro service, flexible hours, travel fee) + prominent **Call** and **SMS** buttons linking directly to +60165238937
- Form validation: date picker minimum = today; required fields enforced; phone optional
- Status messages: "Opening WhatsApp — press send to complete..." or fallback to Facebook if WhatsApp not configured
- Tab UI to switch between Studio ↔ House Visit (currently studio-focused on load, house visit tab accessible via button click)

**SEO + Discoverability:**
- LocalBusiness JSON-LD (auto-synced from config at runtime): phone, address, GPS coords, Facebook link, hours
- OG tags (title, desc, image, URL) for social sharing
- `sitemap.xml` + `robots.txt` (disallows admin.html, robots-friendly for public pages)
- Meta keywords in 5 languages: English, 中文, Malay
- Manifest + service worker for PWA (installable on home screens)

**Owner Config + Admin Dashboard** (admin.html):
- Bilingual settings screen (noindex-protected, screen-reader accessible)
- Edit all fields: contact (phone, WhatsApp, address), hours, announcement, services, prices
- Three publish options: 👁 Preview (browser localStorage draft), 💾 Download JSON, 🚀 GitHub API direct-publish (one-time token setup)
- Fail-safe: if config missing/invalid, site falls back to built-in defaults — never breaks
- All form labels properly associated (label-for, aria-live status messages)

**Accessibility (Blind-owner-first design):**
- Skip-to-main link (visible on :focus)
- Semantic HTML (main landmark, proper section hierarchy)
- Form labels: all inputs/selects have label associations
- Aria-live regions: status messages announced to screen readers
- Focus-visible: 3px terracotta outline on all interactive elements
- Respects prefers-reduced-motion: animations disabled if user has set motion preference

**Real Business Data:**
- Address: 98, Jln Tasek SS1, Bandar Tasek Mutiara, 14120, Simpang Ampat, Penang, Malaysia
- Phone: +60 16-523 8937
- WhatsApp: 60165238937 (WhatsApp button now live in hero + booking form)
- Facebook: https://www.facebook.com/share/18bWiW5wuR/ (linked throughout)
- GPS: 5.284148, 100.483452 (embedded Google Maps)

**PWA Features:**
- `manifest.webmanifest`: installable on Android/iPhone home screens
- App icons (192×512 px): 手 seal on terracotta background
- Service worker (`sw.js`): shell caching (assets cached, config/admin always fresh from network)
- Offline support: site shell works offline; config updates require network

### Placeholders remaining
1. Prices (RM XX for each service) — add via admin.html
2. Opening hours — currently set to default in config
3. `og-image.png` (referenced in meta, optional — auto-generated image or user can provide)

### File structure
```
mh-blind-massage/
├── index.html                  # Main site (bilingual, animated, booking form)
├── admin.html                  # Owner settings screen (noindex)
├── data/
│   └── site-config.json       # Single source of truth (phone, address, services, prices)
├── js/
│   └── site-config.js         # Renders config → page, handles booking, tab switching
├── sw.js                       # Service worker (PWA offline shell)
├── manifest.webmanifest       # PWA metadata
├── robots.txt                  # SEO (disallow admin, allow everything else)
├── sitemap.xml                # SEO (lists all public pages)
├── icons/
│   ├── icon-192.png           # PWA icon
│   └── icon-512.png           # PWA icon
├── project-docs/
│   ├── current_state.md       # This file
│   └── decisions.md           # Append-only decision log
└── .git/                      # Git repo (3 commits, ready to push)
```

### Next steps (for user)

1. **Enter prices:** Open admin.html locally (or share with shop owner), fill in service prices (RM XX → actual RM amounts), click 💾 Download, replace `data/site-config.json` in repo, git commit+push.

2. **Publish to GitHub Pages:**
   - Create GitHub account: github.com → sign up (if not already done)
   - Create new repo: `mhblindmassage.github.io` (exact name for free Pages)
   - Clone or git push this folder to that repo
   - GitHub auto-deploys Pages at `https://mhblindmassage.github.io`
   - Site goes live in ~1 minute; every git push re-deploys

3. **Google visibility (biggest customer driver):**
   - **Google Search Console:** Submit sitemap at search.google.com (free)
   - **Google Business Profile:** Owner claims at business.google.com (needs phone verification) — this is what shows customers the location, hours, reviews

4. **WhatsApp booking verification:** Test booking form end-to-end once live; customer submits → WhatsApp app opens with pre-filled message → staff reply directly

5. **Optional future:** Evaluate third-party booking service (Fresha, SimplyBook) if WhatsApp volume grows; PWA structure allows easy integration.

### Architecture highlights (why this won't break)

- **Modular separation:** Content (site-config.json) ← independent → HTML (index.html) ← independent → JavaScript (site-config.js)
- **Fail-safe binding:** If config missing/broken, HTML defaults display; if JS fails, form still posts via WhatsApp fallback
- **Admin isolation:** admin.html is never shown to customers; changes are opt-in via Download or GitHub publish
- **No backend required:** Everything is static files + service worker; no server-side code to crash
- **Git as source control:** Every change is tracked; easy to rollback if something breaks
