# AI Marketing Team — $25k elevation critique

**Source:** Option 14 Atelier, live preview at https://quiet-aureole.up.railway.app/ai-marketing-team/final/ (commit `2d8d2d5`)
**Reviewed:** Tuesday 10 Nov 2026, 9:52pm AEDT (Australia/Melbourne)
**Viewports:** 1440×900 and 390×844, section screenshots in `critique-shots/`
**Brand:** stay inside Atelier tokens (`/workspace/ai-marketing-team/brand-kit/tokens.json`) — gold on black, Cormorant Garamond + Cinzel. Elevate, do not replace.
**Signature to keep:** the huge rotating engine-turned dial in the hero, and a premium watch-face for the seven seats.

The current site is a strong concept with a memorable object. It does not yet read as a $25,000 luxury commission. It reads as a well-made dark landing page wearing haute-horlogerie clothes: the dial is cinematic, everything beneath it falls into the same thin-gold-box template.

Benchmark in principle (not to copy): Vacheron Constantin / A. Lange & Söhne product pages (one object, enormous air, metal that feels lit); Pentagram / Manual / Analog-quality agency sites (editorial type, changing rhythm, almost no repeated card chrome).

---

## What reads non-premium

### 1. Typography and hierarchy

- Cormorant Light at display sizes is the right family, but the scale is one-note. Hero, every `h2`, member names, way titles and the footer CTA all shout at a similar weight. A $25k page has a clear ladder: one monumental line, quieter section titles, and body that is smaller and calmer than the current `clamp(1.18rem … 1.4rem)`.
- Section titles are capped at `max-width: 15ch`, which manufactures widows. Visible at 1440 and 390:
  - “Marketing is a job. You already have **one.**”
  - “Seven AI team members, one **brief.**”
  - “We build it. We hand it over. You **use it.**” (the last sentence broken across two lines)
- The who-it’s-for list wraps “no time to market / it”.
- Cinzel labels at `.34em` tracking are handsome in the header and cheap when forced into buttons (“BUILD YOUR AI TEAM”, “AI BUSINESS CHALLENGE” look tight against their borders).
- The hero `h1` uses a sweeping metallic `background-clip: text` gradient. In the 1440 fold shot the middle line (“department you”) reads duller than the lines above and below, so the foil looks patchy rather than like a single engraved plate.
- Body measure in the hero lead lists every role in one paragraph beside the dial — correct copy, but the block is visually heavy next to a luxury object that wants air.

### 2. Whitespace and section rhythm

- Almost every section is the same song: small gold kicker + giant `h2` + a row of 1px gold-outlined rectangles (`#promise` panes, `#work` tiles, `#how` columns, `#who` frames, `#ways` cards). After the hero, the page has no change of pace. Luxury sites alternate an object, a line of type, a material field, then a tighter instrument panel — they do not stamp the same card six times.
- Vertical padding (`clamp(5.5rem, 12vw, 12rem)`) is generous, which is good, but it cannot rescue identical modules. The page feels long rather than paced (about 11,676px at 1440, 12,613px at 390).
- `#who` “It’s not for” is a half-empty box beside a four-item list — leftover space, not composition.
- Footer CTA (“Ready for your AI marketing team?”) is another centred display line plus two buttons: a second hero with no new material idea.

### 3. Imagery, materials, light

- The hero dial ( `img/dial.jpg`, engine-turned / guilloché) is the one true luxury material on the page. On desktop it is large but accidentally cropped: ring type (VIDEO, AEO, DMS) is clipped by the right viewport edge. That reads as a layout squeeze, not a cinematic close-up. A watchmaker crop would cut through metal, never through lettering, or would leave the whole object with breathing room.
- On mobile the fold shows headline, lead, two buttons, then only the top half of the dial. The signature object becomes a leftover beneath the CTA instead of the first impression.
- The team “watch-face” is a flat SVG: thin hairline rings, empty chapter circles, a single gold hand, no metal, no glass, no inset shadow, no chapter enamel. Labels collide — “SEO·AEO” sits on top of “PUBLISHER” in the inner ring (visible at 1440). It suggests a watch; it does not feel like one.
- On viewports below 900px the watch-face is `display: none`. The second signature piece of the concept vanishes on the device most people will use.
- The “honest note” band uses `gold.jpg` (foil flakes) full-bleed under centred italic type. It is the most atmospheric moment after the hero, but the texture is a generic luxury cliché, the overlay is a simple dark radial, and the supporting sentence drops below comfortable contrast against the busy flakes.
- Grain is a tiled SVG at 8% opacity across the whole page — a decal, not a finish. There is no brushed-metal, no bevelled brass edge, no glass specular except a pointer-linked highlight on the dial.
- Work-section “UI” tiles (chat bubbles, search skeleton bars, flat bar chart) read as mid-tier SaaS product illustration, not atelier instruments. The shimmering skeleton bars (`.sk`) are a particular tell.

### 4. Motion quality

- The 160s dial spin and counter-rotating ring are the right speed. Pointer-linked specular on the disc and the page spotlight are good ideas.
- Reveals were correctly forced visible (no JS-gated content) after an earlier bug — but the page now has almost no entrance choreography at all. Luxury motion is quiet and sequential (headline, then lead, then dial light), not “everything painted statically” and not “everything fading up the same way”.
- The watch hand (1.6s) is the best interaction on the page. It deserves matching material when a seat comes into view (chapter fill, a soft tick, label emphasis) rather than a flat gold disc swap.
- Button hover (gold wipe + 5px arrow nudge) is competent template motion. Cards only change border colour. There is no press state, no magnetic feel beyond `--mx/--my` hooks, no focus treatment beyond a 1px outline.
- Custom cursor scaling on hover exists, then disappears entirely on touch — fine — but on desktop it is a small gold dot that does not feel considered against the dial.
- `prefers-reduced-motion` is present (about five sites in CSS) and must be expanded to cover any new animation, including dial spin, ring spin, shimmer, and scroll-linked light.

### 5. CTAs and details

- Primary and secondary buttons sit as a same-height pair. The filled gold “Apply” is correct hierarchy; “Book a call” is visually equal in size, so the pair looks like a toolbar.
- Button labels in wide Cinzel tracking overflow their own luxury: long workshop/challenge labels look trapped in the outline.
- Header Apply is a small outlined chip — good — but below 1000px the entire primary nav is `display: none` with no menu, no drawer, no jump list. Mobile visitors get the wordmark and Apply only. That is unfinished, not minimal.
- Hairlines are the default language (`rgba(217,181,107,.28)`). Used everywhere they stop feeling engraved and start feeling like a stroke style in Figma.
- Social proof is absent: no client names, no results, no press, no portraits. That is a content gap, not a design flourish — do not invent any. The page should not fake a logo rail or testimonials to look expensive.

### 6. Mobile (390)

- No section navigation (nav hidden, no substitute).
- Team watch-face removed.
- Hero dial is secondary and cropped by the fold.
- Stacked gold-outline cards become a long identical list (promise, work, how, who, ways).
- Kickers plus 15ch titles create orphan words (“one.”, “brief.”).
- “WITH THE TEAM HANDED OVER” wraps badly inside a narrow pane label.
- Buttons remain wide-tracked; tap targets are large enough, but the type inside them crowds the edge.
- Horizontal overflow on the live page measured 0 — good; do not regress.

### 7. Copy density and proof

- Copy itself is disciplined and should be kept verbatim (team descriptions, steps, FAQ, ways in, honest-note quote). The problem is presentation, not words.
- There are no prices, no case studies, no named clients, no testimonials on the source site. Gaps to flag, not fill:
  - Social proof / results
  - Price (FAQ asks “What does it cost?” — answer must stay the real one from source copy)
  - Street-level company details beyond what the current footer already states
- Apply form at `/final/apply/` (to become `/v25k/apply/`) is part of the site and must be elevated to the same material language. Do not invent new fields or a submission backend. `SUBMIT_URL` stays empty; the preview still sends nothing.

### 8. Performance notes (lab)

- `dial.jpg` ~176KB and `gold.jpg` ~170KB are acceptable but should be explicitly sized (`width`/`height` or aspect-ratio already on `.dial`) and preloaded for LCP.
- Hero LCP is the dial image or the large headline. Target: LCP under ~2.5s on mobile lab, no layout shift from webfonts or the disc (`font-display: swap` is already in place; keep local `@font-face` files, no Google Fonts CDN).
- Do not add heavy 3D libraries. Any extra depth should be CSS, SVG, or the existing raster plates.

---

## Concrete change list

Keep the Atelier palette and type families from `tokens.json`. Keep every real sentence, URL and form field. Keep the huge dial.

1. **Hero, cinematic but composed.** Desktop: enlarge the dial so it remains the dominant object, but compose the crop so ring lettering is either fully drawn or the crop runs through guilloché metal — never through a word. Add a deeper bevel (stacked rings, inner shadow, glass specular that still follows the pointer). Mobile: lead with a large dial (full disc visible, not half-cut by the fold), then the headline; do not hide or shrink it into a leftover.
2. **Editorial type scale.** Monumental hero; section titles one step quieter with measured line-breaks (manual breaks or a wider measure) so “one.”, “brief.” and “use it.” are not orphans. Recalibrate body down slightly and open leading. Reserve the metallic foil for the hero headline and one or two climactic lines, not every `h3`.
3. **Break the card rhythm.** Promise: an editorial split (before / after) divided by a single brass rule, not two identical outline boxes. How: a horizontal ritual or stepped index, not three boxed columns. Who: typographic lists; let “It’s not for” be quieter, not an empty matching frame. Ways: make “We build it for you” the wide featured panel; workshop and challenge become slimmer companions. FAQ can stay a list.
4. **Watch-face as an object.** Give the team dial metal and glass: filled chapter ring, non-colliding labels (shorten layout labels if needed — “SEO·AEO” / “PUBLISHER” must not overlap), blued or pale-gold hand with a hub, applied indices, a faint inner shadow. Keep click-to-scroll and scroll-linked hand. **Show a refined compact watch on mobile** (do not `display: none`).
5. **Work tiles as instruments, not SaaS mocks.** Keep the three real examples and the “illustrative” disclaimer. Rebuild the inner panels as still, material insets (no skeleton shimmer). They should feel like vignettes on a dark leather desk, not a product demo.
6. **Honest-note band.** Keep `gold.jpg` and the verbatim quote. Improve the vignette and type contrast so the supporting line is readable; give the quote more air and less “stock gold flake wallpaper” energy.
7. **Motion, tasteful.** Soft, short entrance on hero (opacity/transform only, content visible without JS). Subtle scroll polish on section kickers. Richer watch-hand + chapter state. Button press and a slower, smaller hover. Honor `prefers-reduced-motion`: freeze dial and ring spin, disable shimmer, no parallax, no custom cursor animation, content fully visible.
8. **Navigation and CTAs.** Add a mobile menu (drawer or full-screen sheet) using the existing nav labels. Soften button tracking so long labels fit. Keep Apply as the only filled gold action in a pair; Book a call stays outlined and slightly quieter.
9. **Materials system.** One shared language: `#070605` ground, `#0F0D0A` raised plate, hairline used sparingly, a brushed-metal or fine-grain overlay that is felt not seen, inner highlights on plates, focus rings that match the gold. No new colour families.
10. **Apply page** at `apply/index.html`: same header, type, plates and buttons; no new fields; still preview-only (does not submit).
11. **Performance.** Preload `img/dial.jpg`. Explicit dimensions on both images. No new webfonts, no CDN, no layout shift, no horizontal overflow at 1440 or 390.
12. **Do not invent** testimonials, logos, metrics, prices, addresses, or client names. Flag gaps instead.

---

## Screenshot index

Desktop 1440 (live `/final/`):

- `critique-shots/d1440-fold.png`
- `critique-shots/d1440-01-header-hd.png`
- `critique-shots/d1440-02-hero.png`
- `critique-shots/d1440-03-promise.png`
- `critique-shots/d1440-04-team.png`
- `critique-shots/d1440-05-work.png`
- `critique-shots/d1440-06-band.png`
- `critique-shots/d1440-07-how.png`
- `critique-shots/d1440-08-who.png`
- `critique-shots/d1440-09-ways.png`
- `critique-shots/d1440-10-faq.png`
- `critique-shots/d1440-11-footer.png`

Mobile 390:

- `critique-shots/m390-fold.png`
- `critique-shots/m390-01-header-hd.png`
- `critique-shots/m390-02-hero.png`
- `critique-shots/m390-03-promise.png`
- `critique-shots/m390-04-team.png` (watch-face absent)
- `critique-shots/m390-05-work.png`
- `critique-shots/m390-06-band.png`
- `critique-shots/m390-07-how.png`
- `critique-shots/m390-08-who.png`
- `critique-shots/m390-09-ways.png`
- `critique-shots/m390-10-faq.png`
- `critique-shots/m390-11-footer.png`

---

## Build target

New preview only: `/ai-marketing-team/v25k/` (and `/ai-marketing-team/v25k/apply/`).
Do not change `/ai-marketing-team/final/` or publish to aimarketing.team.
