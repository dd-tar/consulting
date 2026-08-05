/*
  Optional private analytics via Google Analytics 4.
  Replace the empty value with the site's Measurement ID (starts with "G-").
  Until then this file makes no network requests and tracking stays disabled.
*/
const ANALYTICS_MEASUREMENT_ID = "";

(function initialiseAnalytics(){
  if(!/^G-[A-Z0-9]+$/i.test(ANALYTICS_MEASUREMENT_ID)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){ window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", ANALYTICS_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ANALYTICS_MEASUREMENT_ID);
  document.head.appendChild(script);

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-track]");
    if(!target) return;

    window.gtag("event", "site_click", {
      element: target.dataset.track,
      page_language: document.documentElement.lang,
      page_path: window.location.pathname
    });
  });

  const form = document.getElementById("task-form");
  if(form){
    form.addEventListener("submit", () => {
      window.gtag("event", "generate_lead", {
        method: "contact_form",
        page_language: document.documentElement.lang
      });
    });
  }
})();
