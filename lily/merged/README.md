# Lily Alan merged preview — URL map & redirects (BB-228 SEO)

Preview root: `https://quiet-aureole.up.railway.app/lily/merged/`

Canonicals, sitemap.xml, robots.txt and llms.txt describe the **live apex** URLs the redesign would use at `https://lilyalan.com`. They are not a request to change DNS or GHL.

## Live URL map (apex)

| Apex URL | Preview path |
|---|---|
| `https://lilyalan.com/` | `/lily/merged/` |
| `https://lilyalan.com/about/` | `/lily/merged/about/` |
| `https://lilyalan.com/faq-testimonials/` | `/lily/merged/faq-testimonials/` |
| `https://lilyalan.com/hypnobreathwork/` | `/lily/merged/hypnobreathwork/` |
| `https://lilyalan.com/iemt-therapy-for-anxiety/` | `/lily/merged/iemt-therapy-for-anxiety/` |
| `https://lilyalan.com/insight/` | `/lily/merged/insight/` |
| `https://lilyalan.com/insight/how-to-overcome-anxiety/` | `/lily/merged/insight/how-to-overcome-anxiety/` |
| `https://lilyalan.com/insight/iemt-vs-emdr/` | `/lily/merged/insight/iemt-vs-emdr/` |
| `https://lilyalan.com/insight/overcoming-anxiety-in-relationships/` | `/lily/merged/insight/overcoming-anxiety-in-relationships/` |
| `https://lilyalan.com/insight/how-to-deal-with-shame/` | `/lily/merged/insight/how-to-deal-with-shame/` |
| `https://lilyalan.com/insight/how-to-deal-with-guilt/` | `/lily/merged/insight/how-to-deal-with-guilt/` |
| `https://lilyalan.com/insight/anxiety-and-weight-loss/` | `/lily/merged/insight/anxiety-and-weight-loss/` |
| `https://lilyalan.com/insight/how-to-set-clear-boundaries/` | `/lily/merged/insight/how-to-set-clear-boundaries/` |
| `https://lilyalan.com/insight/each-experience-is-a-cycle/` | `/lily/merged/insight/each-experience-is-a-cycle/` |
| `https://lilyalan.com/insight/coaching/` | `/lily/merged/insight/coaching/` |
| `https://lilyalan.com/privacy-policy/` | `/lily/merged/privacy-policy/` |
| `https://lilyalan.com/terms-and-conditions/` | `/lily/merged/terms-and-conditions/` |
| `https://lilyalan.com/sitemap.xml` | `/lily/merged/sitemap.xml` |
| `https://lilyalan.com/robots.txt` | `/lily/merged/robots.txt` |
| `https://lilyalan.com/llms.txt` | `/lily/merged/llms.txt` |

Kanna / BB-253 live GHL slug match: **`/iemt-therapy-for-anxiety`** (not `/iemt`).

## Redirect map (for GHL when this goes live)

Implement as HTTP 301 on the live host. This preview uses HTML refreshes under `/lily/merged/` so the aliases can be checked.

| From | To |
|---|---|
| `/index` and `/index/` | `/` |
| `/faq--testimonials` and `/faq--testimonials/` | `/faq-testimonials/` |
| `/iemt` and `/iemt/` | `/iemt-therapy-for-anxiety/` |
| `/simpson` and `/simpson/` | `/about/` (no dedicated Simpson Protocol page in this redesign; inbound links should not stay 404) |
| `https://www.lilyalan.com/*` | matching `https://lilyalan.com/*` (already 301 in production) |
| `https://site.lilyalan.com/` | `https://lilyalan.com/` |
| `https://site.lilyalan.com/about` | `https://lilyalan.com/about/` |
| `https://site.lilyalan.com/hypnobreathwork` | `https://lilyalan.com/hypnobreathwork/` |
| `https://site.lilyalan.com/iemt-therapy-for-anxiety` | `https://lilyalan.com/iemt-therapy-for-anxiety/` |
| `https://site.lilyalan.com/faq--testimonials` | `https://lilyalan.com/faq-testimonials/` |
| `https://site.lilyalan.com/insight` | `https://lilyalan.com/insight/` |
| `https://site.lilyalan.com/post/new-blog-post-8758` | `https://lilyalan.com/insight/how-to-overcome-anxiety/` |
| `https://site.lilyalan.com/post/new-blog-post-6012` | `https://lilyalan.com/insight/iemt-vs-emdr/` |
| `https://site.lilyalan.com/post/new-blog-post-8858` | `https://lilyalan.com/insight/overcoming-anxiety-in-relationships/` |
| `https://site.lilyalan.com/post/new-blog-post-8529` | `https://lilyalan.com/insight/how-to-deal-with-shame/` |
| `https://site.lilyalan.com/post/new-blog-post-4246` | `https://lilyalan.com/insight/how-to-deal-with-guilt/` |
| `https://site.lilyalan.com/post/new-blog-post-9456` | `https://lilyalan.com/insight/anxiety-and-weight-loss/` |
| `https://site.lilyalan.com/post/new-blog-post-3015` | `https://lilyalan.com/insight/how-to-set-clear-boundaries/` |
| `https://site.lilyalan.com/post/new-blog-post-3591` | `https://lilyalan.com/insight/each-experience-is-a-cycle/` |
| `https://site.lilyalan.com/post/new-blog-post-5844` | `https://lilyalan.com/insight/coaching/` |
| `https://site.lilyalan.com/lily_blog` (and category/author) | `https://lilyalan.com/insight/` |

Do **not** publish the street address or any phone number until Lily confirms they are public.
