# Daria Tarasova — consulting and professional profile

Static bilingual site for GitHub Pages. No build step, package manager, database or server is
required. The production address is `https://dd-tar.github.io/consulting/`.

## Pages and shared files

```
index.html          English services page
about/index.html    English professional profile and selected work
ru/index.html       Russian services page
ru/about/index.html Russian professional profile and selected work
styles.css          Shared responsive design
main.js             Shared navigation, email-copy, reveal and form-success behaviour
analytics.js        Optional GA4 page-view and click analytics; disabled until configured
og.png              1200×630 social preview for Telegram, Slack and social platforms
robots.txt          Search and AI crawler rules
sitemap.xml         Four localized URLs with hreflang
llms.txt            Plain-language summary for AI assistants
.nojekyll            Serve the files as-is on GitHub Pages
```

All internal navigation uses relative URLs, so the site works at the GitHub Pages project
path `/consulting/`, on localhost and on a future custom domain.

## Local preview

From Terminal:

```bash
cd /Users/ddtar/Developer/Projects/consulting_site/consulting_1
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Stop the server with `Control-C`.

Opening the HTML files directly with a `file://` URL is not recommended: browser security
rules make clipboard and form behaviour differ from the deployed site.

## Contact form

Both service pages post to `https://formsubmit.co/daria.tar.gz@gmail.com` and return to the
correct localized page after delivery.

FormSubmit requires a one-time activation for the receiving address. If this has not already
been done, deploy the site, submit the form once and click the confirmation link sent by
FormSubmit. Until that confirmation is complete, FormSubmit holds new submissions.

The form includes a honeypot field and disables the extra CAPTCHA. Email-copy and Telegram
remain available when a visitor does not want to use the form.

## Private traffic and click analytics

`analytics.js` contains a ready Google Analytics 4 integration, but it is disabled by default
and makes no network requests. To enable it:

1. Create a GA4 property and a Web data stream for `https://dd-tar.github.io/consulting/`.
2. Copy the Measurement ID beginning with `G-`.
3. Paste it into `ANALYTICS_MEASUREMENT_ID` at the top of `analytics.js`.

GA4 will record visits automatically. The site additionally records named clicks on service,
profile, publication and contact elements, plus successful form submission attempts. The
message text, name and email entered in the form are never passed to analytics. Reports are
visible in the GA4 account, not publicly on the site.

Google Analytics may use cookies. Before enabling it, decide whether the audiences and
jurisdictions you target require a consent banner or another privacy notice. Leaving the ID
empty keeps analytics entirely off.

## Deploy to GitHub Pages

Commit and push the files to the repository branch configured in GitHub Settings → Pages.
Publish from the repository root. No GitHub Actions workflow or special handling for the
`about/` and `ru/` folders is required.

## Optional later additions

- A current downloadable one-page CV. The old PDF should not be published because its latest
  role is incomplete.
- Pricing ranges after the first few engagements establish a useful baseline.
