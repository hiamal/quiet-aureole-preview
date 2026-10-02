# Quiet Aureole — Full Site (Milestone 1)

**Direction:** Quiet Aureole (v3-3) — ceremonial centered layout DNA  
**Built:** 2026-09-17 (Melbourne / AEST)  
**Format:** Static HTML only — GHL Expert drop-in (no Next.js / Webflow)

---

## Pages

| Page | File | Notes |
|------|------|--------|
| Home | `index.html` | Quiet Aureole hero + Meridian full helix; 4 pillars; verbatim testimonials; Cliniko CTA |
| About | `about.html` | Origin story, expertise chips, qualifications (from live/scrape) |
| Services | `services.html` | All 8 modalities long-form |
| Contact | `contact.html` | Elevated contact + Book / Call / Email / Location cards |

Shared: `css/site.css`, `js/site.js`, `assets/` (logo.png, portrait.png, hands.jpg)

---

## Design locks (non-negotiable)

- **Fonts:** Cormorant Garamond + Montserrat (same Google Fonts link/weights as Quiet Aureole v3-3)
- **Colors:** pearl `#FBF8F3` · purple `#7936A6` · plum `#4E2A6A` · gold `#B27F3A` / `#E8C878` (+ pale/lavender tokens in CSS)
- **Motion:** Full cursor-following helix on homepage; soft/reduced helix watermark on About / Services / Contact
- **Nav/Footer:** Home · About · Services · Contact + Book Online (Cliniko) on every page

---

## Cliniko / contact (must-keep)

- **Book:** https://quantum-hypnosis-and-strategic-psychotherapy.au3.cliniko.com/bookings
- **Phone:** 0428 099 997 (+61 428 099 997)
- **Email:** psychotherapy@qhsp.net
- **Location:** Hervey Bay QLD 4655 — face-to-face local; Zoom interstate/overseas
- **Legal:** Quantum Wellness Evolution PTY. LTD.
- **No pricing** on marketing pages

---

## Host preview

Mirrored at `/workspace/jobs/qhsp-host/site/`  
Public tunnel (8787 + cloudflared): see `HOST-v3.txt` / gate index — paths under `/site/`

---

## GHL handoff (IMPORTANT — do not skip)

**Live install is NOT in this milestone.**

1. Amal reviews HTML previews and **approves** Quiet Aureole full site.
2. Boss hands off to **GHL Expert**.
3. Expert installs into subaccount: **Quantum Wellness Evolution Pty Ltd** (Susanne).
4. **Location / subaccount ID:** not supplied yet — do **not** invent. Boss to provide ID when Expert is ready for live build.

Until Amal HTML approval → no GHL push, no live domain cutover from this package alone.

### Expert drop-in notes

- Relative paths (`css/`, `js/`, `assets/`) work as folder upload or per-page paste with assets hosted.
- Swap logo/portrait if client supplies higher-res.
- Cliniko link is external — keep `target="_blank" rel="noopener"`.
- Testimonials are verbatim from intake — do not paraphrase attributions.
- Homepage eyebrow uses brand `Empower Your Mind®` (design codename Quiet Aureole is internal only).

---

## Kie

Optional section art prepare attempted; schema/approval path failed or declined — site ships on canvas helix + existing photography without blocking.

---

## Source of truth

- Homepage DNA: `previews-v3/variation-3/index.html` · hosted `qhsp-host/v3-opt3/`
- Content: `intake.md` / `intake.json` + scrape/live about · services · contact · home

## GHL target (locked)

- **Subaccount:** Susanne Golding - Quantum Wellness Evolution Pty Ltd
- **locationId:** `J5AkIGTu4Y72ZE6FQSgw`
- **Live install:** only after Amal explicitly approves HTML → Boss → GHL Expert
