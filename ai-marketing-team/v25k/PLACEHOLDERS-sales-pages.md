# Defaults filled 27 Nov — confirm with Amal

Page: `/challenge/` (`ai-marketing-team/v25k/challenge/index.html`). No `.ph` chips remain on the page. Every item below was made up from Amal's 27 Nov override defaults and needs confirming. Shared defaults come from the override; anything marked "extrapolated" goes beyond it.

| Page | Section | Text used |
| --- | --- | --- |
| challenge | Hero lead (CH-01) | "Five live days on Zoom to meet the team and put it to work on your own business." |
| challenge | Hero, How spec, Price ticket, FAQ, footer sub (CH-02) | `<time data-utc="">` kept empty, showing "Next round dates are emailed after you join". Once a start time is set, put the ISO-8601 UTC value in `data-utc` and the script renders it in the visitor's time zone. |
| challenge | Problem, right pane (CH-06) | "A defined start: five days, one live session each"; "You set up your own starter AI marketing team, step by step with the workbook" (extrapolated: "starter team") |
| challenge | Included row I, How, FAQ (CH-03, CH-04) | 5-day live online challenge, one 60-minute live session per day, five sessions |
| challenge | Included row II, Price ticket (CH-06) | "Your own starter AI marketing team, built step by step on your own business, with a workbook" (extrapolated: what is built) |
| challenge | Included row III, How, FAQ (CH-05, CH-09) | Live on Zoom. Join link and calendar invite emailed straight after checkout. Instant email receipt after checkout. |
| challenge | Included row IV, Price, FAQ (CH-07) | Replays of every session (no replay duration stated) |
| challenge | Included row V, Price (CH-08) | Bonuses: the AI team prompt pack and a private community for the challenge |
| challenge | Included, seven-seat pills (CH-12) | The seven seats are stated as the ones participants "get to know", with no confirm note |
| challenge | Who it's for, requirements note (CH-10, CH-16) | "No technical skills, just a computer with an internet connection and Zoom, and about 60 minutes for each daily live session." |
| challenge | FAQ "Do I need to be technical?" | "No technical skills needed. The team runs on our AI Business Suite platform plus your existing social accounts, and you'll be guided step by step." |
| challenge | Guarantee, FAQ, footer legal (CH-11) | "30-day money-back guarantee, no questions asked." |
| challenge | FAQ "Is this the same as the AI Business Challenge?" (G-02) | "No. This is the AI Marketing Team Challenge, a separate 5-day challenge focused on getting to know an AI marketing team." (extrapolated: the relationship is unconfirmed) |
| challenge | FAQ "Who hosts it?" (CH-14) | "Amal J, also known as The AI Guy, hosts the challenge." |
| challenge | Price fine print, FAQ (CH-13) | Tax/GST note removed; only "Priced in US dollars." remains |
| challenge | FAQ "What happens after the challenge?" (CH-15) | Credit/offer for participants removed; only the DFY links and prices remain |
| challenge | Footer legal (G-01) | The terms/privacy/refund links chip was replaced with "30-day money-back guarantee"; there are no terms/privacy links yet |
| challenge | Whole page | No testimonials, client names, results, revenue numbers, countdowns or scarcity. |

## Checkout

Single config is `const CHECKOUT_URL = '#checkout-pending';` in the first `<script>`. Replace every `#checkout-pending` in the file with the real URL to go live. `id="checkout-pending"` is unaffected.
# Defaults filled 27 Nov — confirm with Amal

All placeholder chips on `/dfy-complete/` were replaced with plain text (chip styling removed), per Amal's 7:55am override. No testimonials, client names, results or revenue numbers appear on the page (none were present). The page has no event date, so no `<time data-utc>` element.

Checkout: edit the single `const CHECKOUT_URL = '#checkout-pending';` in the first `<script>` near the bottom of `ai-marketing-team/v25k/dfy-complete/index.html`. The script writes it to every `a[data-checkout]` href. The no-JS href is `#checkout-pending`.

| Page | Section | Text used |
|---|---|---|
| dfy-complete | Hero + Price panel + FAQ (was DFYC-01) | One payment of US$2,997. |
| dfy-complete | What's included, sub line (was DFYC-02) | Chip removed; all seven seats are stated as included. |
| dfy-complete | Also part of the build, setup scope (was DFYC-03) | We set up all seven seats and the links between them, on our AI Business Suite platform plus your existing social accounts. |
| dfy-complete | Handed over, walked through (was DFYC-04) | A 60-minute live handover walkthrough, with recordings you keep. |
| dfy-complete | After handover (was DFYC-05) | 30 days of support by email after handover, plus two rounds of revisions within 30 days. |
| dfy-complete | Bonuses row (was DFYC-06) | Row removed (no bonus specified for this offer). |
| dfy-complete | How it works, After checkout (was DFYC-07) | Instant email receipt, then a next-steps email with your onboarding booking link within 1 business day. Onboarding is a 60-minute strategy call. |
| dfy-complete | How it works, Time to handover + FAQ "How long" (was DFYC-08) | Delivered within 14 business days after your 60-minute strategy onboarding call. |
| dfy-complete | Price ticks + FAQ "What's included" (was DFYC-09) | Onboarding and support: 60-minute strategy call, 60-minute live handover with recordings, 30 days of email support, two rounds of revisions within 30 days. |
| dfy-complete | Price fine print + FAQ "Is the price in USD" (was DFYC-10) | Tax, if applicable, is shown at checkout. |
| dfy-complete | Guarantee + FAQ "What if it isn't right" (was DFYC-11) | If it isn't set up as described, we rework it until it is, or refund. |
| dfy-complete | FAQ "Which tools" (was DFYC-12) | The team runs on our AI Business Suite platform plus your existing social accounts. No technical skills needed. |
| dfy-complete | FAQ "How is this different from DFY Social" (was DFYC-13) | DFY Social sets up 4 social seats (Strategist, Copywriter, Video copywriter, Publisher) plus Conversations & DMs, for up to 3 social channels. DFY Complete sets up all 7 seats. |
| dfy-complete | Footer legal row (was G-01) | Refund terms are stated in the guarantee above. (No terms/privacy links yet.) |
# Defaults filled 27 Nov — confirm with Amal

Page: DFY Social Media AI Marketing Team (`/dfy-social/`, US$497). There are no placeholder chips left on the page; the `.ph` chip CSS has been removed. Every item below was filled with the shared defaults from Amal's 7:55am override, or is a small derived wording choice (marked *derived*). No testimonials, client names, results or revenue numbers appear on this page.

| Page | Section | Text used |
| --- | --- | --- |
| dfy-social | Hero, price block, FAQ "How do I pay?" (DS-09 payment terms) | "One payment of US$497." *(derived from the Complete default of one payment)* |
| dfy-social | Included, sub-label "Your social channels"; FAQ "Which social platforms does it cover?" (DS-02) | "Up to 3 social channels of your choice, connected to your existing social accounts." No platform names are listed. |
| dfy-social | Included, "Built around your business"; FAQ "Which tools does it run on?" (DS-03, DS-12) | "The team runs on our AI Business Suite platform plus your existing social accounts. No technical skills needed." The FAQ question was shortened to "Which tools does it run on?" because no ongoing-cost figure was given. |
| dfy-social | Included, "Handed over, walked through"; price block (DS-04) | "30-minute handover walkthrough recording." |
| dfy-social | Included, "After handover"; price block (DS-05, DS-14) | "One round of revisions within 14 days of handover." |
| dfy-social | Included, "Bonuses" (DS-06) | Row removed. No Social bonus was given in the defaults. |
| dfy-social | How it works, "After checkout" (DS-07) | "Instant email receipt, then your booking link within 1 business day." Also in the FAQ "How do I pay?". |
| dfy-social | How it works, "Time to handover"; FAQ "How long does it take?" (DS-08) | "Within 7 business days after a 45-minute onboarding call." |
| dfy-social | Price block fine print and FAQ "Is the price in US dollars?" (DS-10 tax) | "Any applicable tax is shown at checkout." *(derived)* |
| dfy-social | Guarantee and FAQ "What if it isn't right for me?" (DS-11) | "If it isn't set up as described, we rework it until it is, or refund." |
| dfy-social | FAQ "Can I move up to DFY Complete later?" (DS-13) | "Yes, you can move up later: book a call and we'll talk through adding the remaining seats." *(derived; no upgrade terms or pricing stated)* |
| dfy-social | Seat structure (DS-01) | Strategist, Copywriter, Video copywriter, Publisher, plus Conversations & DMs. SEO & AEO and Analyst are shown as "In DFY Complete". |
| dfy-social | Footer legal line (G-01) | The terms/privacy/refund links chip was replaced with a "Refund terms" link to the on-page guarantee section. No separate terms or privacy pages exist. *(derived)* |

## Technical notes

- Checkout: `const CHECKOUT_URL = '#checkout-pending';` is the first line of the page script. To go live, find-and-replace every `#checkout-pending` in `ai-marketing-team/v25k/dfy-social/index.html` with the real URL. That updates the config and every no-JS href. `id="checkout-pending"` has no `#`, so it is untouched.
- This page has no `<time data-utc>` element.
- The page links to `../challenge/` and `../dfy-complete/`. Those pages are built by the other builders.
- QA: `node _job/qa.js http://127.0.0.1:8823 dfy-social` printed QA PASS at 1440 and 390 (axe clean, no overflow, 6 buy buttons wired).
