# Chat Tracker 2.0.5 — Chrome Web Store listing draft
**Do not submit from automation — Boss/Amal submit from developer dashboard.**

## Package
- Store zip: https://quiet-aureole.up.railway.app/downloads/chat-tracker-2.0.5-chrome-web-store.zip
- Sideload zip (has extension key; not for CWS): https://quiet-aureole.up.railway.app/downloads/chat-tracker.zip
- Icons: https://quiet-aureole.up.railway.app/downloads/chat-tracker-2.0.5-icons/
- Privacy policy URL: https://quiet-aureole.up.railway.app/legal/chat-tracker-privacy.html

## Name
Chat Tracker by CoachTech

## Short description (≤132 chars)
Insert Chat Map DM templates on Facebook, Instagram, LinkedIn, X & more — synced to your CoachTech CRM Chat Progress.

## Detailed description
Chat Tracker by CoachTech helps coaches and consultants run consistent outreach across social DMs without copy-pasting from a doc.

**What it does**
• Load your Chat Map message boards and templates from AI Marketing Suite / CoachTech  
• One-click insert a template into the open DM composer (Facebook, Instagram, LinkedIn, X, Telegram, Bluesky, TikTok, Reddit)  
• Optional tracking: log the send and advance Chat Progress in your connected CRM  
• Check DNC/tags and manage simple CRM helpers from the popup  

**Who it’s for**  
Coaches and team members who already use CoachTech Chat Map. You must sign in with your CoachTech account.

**Not for** scraping inboxes, reading private messages for ads, or contacting people without your action. You choose the template and send the message yourself.

Support: use in-app CoachTech support / your account admin.

## Single purpose
Help CoachTech users insert their own Chat Map message templates into social DM composers and optionally sync that outreach to their CRM Chat Progress.

## Category
Suggested: **Productivity** (alt: Social & Communication)

## Language
English

## Version
2.0.5

## Icon sizes in package
- 16×16, 32×32, 48×48, 128×128 PNGs (`icons/icon{size}.png`)
- Store upload icon: use `downloads/chat-tracker-2.0.5-icons/store-icon-128.png` (128×128)
- Note: source logo is a simple 128×128 mark; replace with brand assets later if desired. Store also asks for screenshots (1280×800 or 640×400) — not included in this package; capture from popup + Facebook DM for submit.

## Privacy policy
Live draft URL above. Product `/privacy` routes currently 404 — replace with a permanent coachstech.com/aimarketinggeni.us page when ready and update the Store listing.

## Manifest permissions — justifications

### storage
Save sign-in session token, selected board/message, tags, and UI preferences locally in the browser so the popup works across sessions.

### tabs
Read the active tab URL/id to detect which social platform you’re on, open the CoachTech sign-in/connect tab, and target the correct tab for template insertion / profile extraction.

### scripting
Inject or message the content script so templates can be typed into the page composer and so profile name/id can be read for CRM tracking (only on permitted hosts).

### webNavigation
Detect in-page (SPA) navigations on social sites so profile/context stays correct when you move between chats without a full reload.

### Host permissions — social
- `https://*.facebook.com/*`, `https://*.messenger.com/*` — insert templates & track Facebook/Messenger DMs  
- `https://*.instagram.com/*` — Instagram DMs  
- `https://*.linkedin.com/*` — LinkedIn messaging  
- `https://*.x.com/*`, `https://*.twitter.com/*` — X/Twitter DMs  
- `https://web.telegram.org/*` — Telegram Web  
- `https://*.bsky.app/*` — Bluesky  
- `https://*.tiktok.com/*` — TikTok messages  
- `https://*.reddit.com/*`, `https://old.reddit.com/*` — Reddit messages  

### Host permissions — CoachTech
- `https://app.coachstech.com/*`, `https://aimarketinggeni.us/*` — sign-in/connect bridge script and app domain  
- `https://api.coachstech.com/*`, `https://coachtechapi-production.up.railway.app/*` — extension APIs (boards, sendbox/tracking, CRM helpers)

Localhost host permissions were **removed** from the Store package (dev-only).

## Remote code
None — all JS shipped inside the extension package.

## Store checklist reminders for Boss
1. Upload `chat-tracker-2.0.5-chrome-web-store.zip` (no `key` field).  
2. Paste privacy URL.  
3. Add ≥1 screenshot before submit.  
4. Fill permission justifications using the text above.  
5. Do not upload the sideload zip that still contains the public key field.
