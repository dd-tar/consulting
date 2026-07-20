# Daya — consulting site

Static. No build step, no dependencies, no backend. Deploys as-is to GitHub Pages at
https://dd-tar.github.io/consulting/

```
index.html      EN page
ru/index.html   RU page
styles.css      shared styles (edit once, both languages update)
main.js         shared behaviour — CONFIG at the top holds your email + Telegram
robots.txt      allows search engines and LLM crawlers explicitly
sitemap.xml     both language versions, with hreflang
llms.txt        plain-language summary for AI assistants
.nojekyll       tells GitHub Pages to serve files as-is
```

All URLs are already set to `https://dd-tar.github.io/consulting`. If you ever move to a
custom domain, search-replace that string across `index.html`, `ru/index.html`,
`robots.txt`, `sitemap.xml`, and `llms.txt`.

## Contact form (FormSubmit)

The form POSTs to `https://formsubmit.co/daria.tar.gz@gmail.com` — free, no account.

**One-time activation:** after deploying, submit the form once yourself. FormSubmit will
email daria.tar.gz@gmail.com a confirmation link; click it once and every future
submission lands in your inbox. Until you click it, submissions are held.

Spam protection: a hidden honeypot field (`_honey`) plus FormSubmit's own filtering.
CAPTCHA is disabled (`_captcha=false`) for a smoother experience; re-enable it by
deleting that hidden input if spam ever becomes a problem.

To change the receiving address: update the `action` attribute in both HTML files and
`CONFIG.email` in `main.js`, then re-activate (one confirmation click on first submission).

## Deploy

Commit, push. Settings → Pages → deploy from `main` / root. The `ru/` folder needs no
config: GitHub Pages serves `ru/index.html` at `/ru/` automatically.

## Still missing (deliberately)

- **`og.png`** — a 1200×630 preview image for link sharing. Not referenced right now, so
  nothing is broken; add one and restore the `og:image` tags when you have a design.
- **Prices.** The site says "fixed price" without a number. Add a range when you have one.
- **Case studies.** The strongest possible addition: 2–3 anonymized cases in the shape
  problem → what I did → decision made → result. The swap-routing benchmark and the
  payments founder-interview work are the best candidates.

## Upgrades, when the need is real

- **Analytics without cookies:** Plausible or GoatCounter, one script tag.
- **Blog / case studies:** move to Astro. This design ports over unchanged.
