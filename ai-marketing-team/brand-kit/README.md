# AI Marketing Team — Atelier brand kit

Extracted from the settled website design, Option 14 Atelier (gold on black, rotating dial hero, watch-face team section).

- Source: https://quiet-aureole.up.railway.app/ai-marketing-team/final/
- Repo source at extract time: `hiamal/quiet-aureole-preview` commit `2d8d2d5`
- Tokens come from the live CSS (`:root` and rules in `index.html`, plus apply-form tokens in `apply/index.html`). Values marked **Recommended** are derived from how the design is actually used, not declared as named tokens.

This kit does not change the live site or aimarketing.team.

## Files

| File | What it is |
| --- | --- |
| `brand-kit.html` | One-page visual kit in the Atelier style. Open this (or `index.html` on the preview host). |
| `brand-kit.png` | Full-page Playwright screenshot at 1440px wide (29,047px tall). |
| `brand-kit.pdf` | The same Playwright full-page render saved as a single-page PDF. |
| `tokens.json` | Design tokens (W3C design-tokens-ish): color, font, fontWeight, fontSize, lineHeight, letterSpacing, space, radius, shadow, motion, email fallbacks, plus contrast ratios. |
| `email-snippet.html` | Minimal email-safe header / Outlook bulletproof button / footer for CRM (GHL). 600px wide. |
| `fonts/` | Local Cinzel and Cormorant Garamond woff2 files, same as the site. |
| `mark.svg` | Favicon / monogram (gold clock on `#070605`). |

Preview host path: `/ai-marketing-team/brand-kit/`  
(`index.html` is a copy of `brand-kit.html` so the directory URL serves the kit.)

## Palette (core)

| Token | Hex | RGB | Role |
| --- | --- | --- | --- |
| `--bk` black | `#070605` | 7, 6, 5 | Page ground, theme-color |
| `--bk2` blackSoft | `#0F0D0A` | 15, 13, 10 | Raised card / mock UI |
| `--au` gold | `#D9B56B` | 217, 181, 107 | Primary gold, borders, filled buttons |
| `--au2` goldPale | `#F3E2B0` | 243, 226, 176 | Wordmark, button labels, highlight |
| `--au3` goldDeep | `#8F6B2E` | 143, 107, 46 | Shade, dial rings (not body text) |
| `--tx` text | `#D8CCB2` | 216, 204, 178 | Body text |
| `--mu` muted | `#C6B892` | 198, 184, 146 | Secondary text, legal |
| `--hair` | `rgba(217,181,107,.28)` | — | 1px hairlines |

Supporting metallic stops from the live gold text gradient: `#B8893C`, `#F6E7B4`, `#9A7430`, `#E9CF8E`. Chat-bubble gold `#A97C33`. Apply-form extras: ink `#E6DCC4`, error `#E07070`, success `#7BC49A`.

Key contrast (from `tokens.json`): body `#D8CCB2` on `#070605` is **12.73:1**. Gold `#D9B56B` on black is **10.39:1**. Deep gold `#8F6B2E` on black is **4.16:1** (AA large only — do not use as small text). Gold on white is **1.95:1** — never set gold type or the flat mark on white; put the unchanged mark on a `#070605` tile.

Gradient solid fallback (email / CSS off): `#D9B56B`.

## Fonts

- **Display + body:** `"Cormorant Garamond", "Cormorant", Georgia, serif` (`--c`). Loaded weights: roman 300–600, italic 300–500. Headlines are weight 300 (often italic); body is 400.
- **Labels, wordmark, buttons:** `"Cinzel", "Trajan Pro", Georgia, serif` (`--r`). Loaded 400–600; UI uses 500, tracked 0.30–0.34em, uppercase.
- **Email / web-safe stack** (both faces are serifs): `Georgia, 'Times New Roman', Times, serif`.

Type scale is fluid. Hero at 1440px computes to **6.48rem / 103.7px**; at 390px it hits the floor **3.1rem / 49.6px**. Body is `clamp(1.18rem, 1.1rem + 0.3vw, 1.4rem)` / 1.55 — **1.37rem** desktop, **1.18rem** mobile. Full role table is in `tokens.json` → `fontSize`.

## Email snippet (for CRM Kanna)

Open `email-snippet.html`. It is 600px, dark (`#070605`), uses solid `#D9B56B` instead of gradients, Georgia fallbacks, `color-scheme: dark`, table layout, and an Outlook VML bulletproof button (sharp corners, matching the site).

The sample Apply href is `https://aimarketing.team/apply/` — swap it to the live GHL destination before sending. Do not publish anything to aimarketing.team from this kit.

## Buttons (as on the site)

- **Primary** (`.btn.fill`): gold gradient fill, text `#070605`. Hover inverts to black with an inset 1px gold edge and text `#F3E2B0`.
- **Secondary** (`.btn`): 1px gold outline, text `#F3E2B0`. Hover wipes on the gold gradient.
- **Ghost / header** (`.hbtn`): tighter padding (`.8rem 1.4rem`), solid gold fill on hover.
- Default radius is **0** (sharp). Focus: `1px solid #D9B56B` offset 6px.

## Motion

Default easing `cubic-bezier(.16, 1, .3, 1)`. Dial photograph spins in **160s** linear; the ring text in **200s** reverse. Watch-hand `1.6s cubic-bezier(.7, 0, .2, 1)`. All motion yields to `prefers-reduced-motion`.
