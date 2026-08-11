# Daria Tarasova — consulting and professional profile

Static bilingual site for GitHub Pages. No build step, package manager, database or server is
required. The production address is `https://ddtar.xyz/`.

## Pages and shared files

```
index.html          English services page
about/index.html    English professional profile and selected work
ru/index.html       Russian services page
ru/about/index.html Russian professional profile and selected work
styles.css          Shared responsive design
main.js             Shared behaviour plus GA4 page-view and click analytics
og.png              1200×630 social preview for Telegram, Slack and social platforms
robots.txt          Search and AI crawler rules
sitemap.xml         Four localized URLs with hreflang
llms.txt            Plain-language summary for AI assistants
.nojekyll            Serve the files as-is on GitHub Pages
```

All internal navigation uses relative URLs, so the site works at the custom-domain root and
on localhost. The former GitHub Pages project URL redirects to the production domain.

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

## Traffic and click analytics

Google Analytics 4 is enabled with Measurement ID `G-894SJDYW6L` on all four pages. It records
page views plus a `site_click` event for the site's service, profile, publication and contact
elements. A `generate_lead` event is recorded only after FormSubmit redirects back with
`?sent=1`, not when somebody merely presses the submit button.

The analytics code never reads the form fields. Page locations are sent without query
parameters, Google Signals and ad-personalisation signals are disabled, and localhost page
views and events are excluded so local previews do not pollute the reports.

No Google Tag Manager container is required for this setup. In GA4 Admin:

1. Mark `generate_lead` as a key event.
2. Add an event-scoped custom dimension named `element_name` if click breakdowns should be
   available in standard reports.
3. Enable email and query-parameter redaction for the web data stream as an additional safety
   net, and choose the shortest data-retention period that is useful.

The public Measurement ID does not grant access to the Analytics account. Protect the Google
account with two-factor authentication and keep property access limited to trusted users.

## Deploy to GitHub Pages

Commit and push the files to the repository branch configured in GitHub Settings → Pages.
Publish from the repository root. No GitHub Actions workflow or special handling for the
`about/` and `ru/` folders is required.

## Optional later additions

- A current downloadable one-page CV. The old PDF should not be published because its latest
  role is incomplete.
- Pricing ranges after the first few engagements establish a useful baseline.
