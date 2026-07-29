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
main.js             Shared email-copy, reveal and form-success behaviour
robots.txt          Search and AI crawler rules
sitemap.xml         Four localized URLs with hreflang
llms.txt            Plain-language summary for AI assistants
.nojekyll            Serve the files as-is on GitHub Pages
```

All internal navigation uses relative URLs, so the site works at the GitHub Pages project
path `/consulting/`, on localhost and on a future custom domain.

## Contact form

Both service pages post to `https://formsubmit.co/daria.tar.gz@gmail.com` and return to the
correct localized page after delivery.

FormSubmit requires a one-time activation for the receiving address. If this has not already
been done, deploy the site, submit the form once and click the confirmation link sent by
FormSubmit. Until that confirmation is complete, FormSubmit holds new submissions.

The form includes a honeypot field and disables the extra CAPTCHA. Email-copy and Telegram
remain available when a visitor does not want to use the form.

## Deploy to GitHub Pages

Commit and push the files to the repository branch configured in GitHub Settings → Pages.
Publish from the repository root. No GitHub Actions workflow or special handling for the
`about/` and `ru/` folders is required.

## Optional later additions

- A bespoke 1200×630 social preview image. The current metadata deliberately uses text-only
  previews rather than linking to a missing or generic image.
- A current downloadable one-page CV. The old PDF should not be published because its latest
  role is incomplete.
- Pricing ranges after the first few engagements establish a useful baseline.
