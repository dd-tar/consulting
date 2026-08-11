/*
  GA4 page-view and high-value interaction tracking.

  This file never reads form values. It sends only the clean page path, page
  language and fixed identifiers from data-track attributes in the site's HTML.
*/
(function initialiseSiteAnalytics(){
  const measurementId = "G-894SJDYW6L";
  const isLocalPreview = /^(localhost|127\.0\.0\.1|\[?::1\]?)$/.test(window.location.hostname);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: !isLocalPreview,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: window.location.origin + window.location.pathname,
    page_path: window.location.pathname
  });

  const googleTag = document.createElement("script");
  googleTag.async = true;
  googleTag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
  document.head.appendChild(googleTag);

  if(isLocalPreview) return;

  const safePath = window.location.pathname;
  const pageLanguage = document.documentElement.lang === "ru" ? "ru" : "en";
  const allowedIdentifier = /^[a-z0-9_]{1,64}$/;

  document.addEventListener("click", (event) => {
    if(!(event.target instanceof Element)) return;

    const target = event.target.closest("[data-track]");
    if(!target) return;

    const elementName = target.dataset.track || "";
    if(!allowedIdentifier.test(elementName)) return;

    window.gtag("event", "site_click", {
      element_name: elementName,
      page_language: pageLanguage,
      page_path: safePath
    });
  });

  /* FormSubmit adds ?sent=1 only after it accepts the submission. */
  if(new URLSearchParams(window.location.search).get("sent") === "1"){
    window.gtag("event", "generate_lead", {
      method: "contact_form",
      page_language: pageLanguage,
      page_path: safePath
    });
  }
})();

const CONFIG = {
  email: "daria.tar.gz@gmail.com",
  telegram: "dd_tar"
};

const LANG = document.documentElement.lang === "ru" ? "ru" : "en";
const FORM_SCROLL_KEY = "consulting-form-scroll-position";
const TEXT = {
  en: {
    copy: "copy",
    copied: "copied ✓",
    sent: "Message sent. I’ll reply within one working day."
  },
  ru: {
    copy: "копировать",
    copied: "скопировано ✓",
    sent: "Сообщение отправлено. Отвечу в течение одного рабочего дня."
  }
}[LANG];

/* Keep shared contact details and the copyright year consistent on every page. */
(function syncSharedDetails(){
  const email = document.getElementById("email-text");
  if(email) email.textContent = CONFIG.email;

  const telegram = document.getElementById("tg-link");
  if(telegram){
    telegram.href = "https://t.me/" + CONFIG.telegram;
    const telegramText = document.getElementById("tg-text");
    if(telegramText) telegramText.textContent = "@" + CONFIG.telegram;
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();

/* Reveal content progressively, while leaving everything visible when JavaScript is off. */
(function revealOnScroll(){
  const items = document.querySelectorAll(".reveal");
  if(!items.length) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.documentElement.classList.add("reveal-ready");

  if(!("IntersectionObserver" in window)){
    items.forEach((item) => item.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  items.forEach((item) => observer.observe(item));
})();

/* Keep the document-style section rail in sync with the reader's position. */
(function sectionRailNavigation(){
  const links = Array.from(document.querySelectorAll("[data-section-link]"));
  if(!links.length) return;

  const entries = links
    .map((link) => ({ link, section: document.getElementById(link.dataset.sectionLink) }))
    .filter((entry) => entry.section);

  if(!entries.length) return;

  let queued = false;
  const update = () => {
    const marker = window.innerHeight * 0.38;
    let current = entries[0];

    entries.forEach((entry) => {
      if(entry.section.getBoundingClientRect().top <= marker) current = entry;
    });

    entries.forEach((entry) => {
      const active = entry === current;
      entry.link.classList.toggle("is-active", active);
      if(active) entry.link.setAttribute("aria-current", "location");
      else entry.link.removeAttribute("aria-current");
    });
    queued = false;
  };

  const requestUpdate = () => {
    if(queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive:true });
  window.addEventListener("resize", requestUpdate);
  update();
})();

/* Copy the email address without requiring a configured desktop mail client. */
(function copyEmail(){
  const button = document.getElementById("copy-email");
  const state = document.getElementById("copy-state");
  if(!button || !state) return;

  button.addEventListener("click", async () => {
    const copied = await copyText(CONFIG.email);
    state.textContent = copied ? TEXT.copied : TEXT.copy;
    window.setTimeout(() => { state.textContent = TEXT.copy; }, 2200);
  });
})();

/* Keep the reader at the form when FormSubmit returns to this page. */
(function preserveFormScroll(){
  const form = document.getElementById("task-form");
  if(!form) return;

  form.addEventListener("submit", () => {
    try{
      window.sessionStorage.setItem(FORM_SCROLL_KEY, String(window.scrollY));
    }catch(error){
      /* The contact anchor remains a fallback when storage is unavailable. */
    }
  });
})();

/* FormSubmit redirects back with ?sent=1 after successful delivery. */
(function showFormSuccess(){
  const panel = document.getElementById("sendpanel");
  const status = document.getElementById("send-status");
  if(!panel || !status) return;

  if(new URLSearchParams(window.location.search).get("sent") === "1"){
    let savedScroll = null;
    try{
      const storedValue = window.sessionStorage.getItem(FORM_SCROLL_KEY);
      if(storedValue !== null){
        const parsedValue = Number(storedValue);
        if(Number.isFinite(parsedValue)) savedScroll = parsedValue;
      }
      window.sessionStorage.removeItem(FORM_SCROLL_KEY);
    }catch(error){
      /* The #contact return URL still prevents a jump to the page top. */
    }

    const fallbackContact = document.getElementById("contact");
    const restorePosition = savedScroll !== null
      ? savedScroll
      : (fallbackContact ? fallbackContact.offsetTop : null);

    if(restorePosition !== null){
      if("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
      const restoreScroll = () => {
        const maximumScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, Math.min(Math.max(0, restorePosition), maximumScroll));
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      };
      window.requestAnimationFrame(() => window.requestAnimationFrame(restoreScroll));
      window.addEventListener("load", restoreScroll, { once:true });
    }

    status.textContent = TEXT.sent;
    panel.hidden = false;
    window.history.replaceState(null, "", window.location.pathname + window.location.hash);

    const close = panel.querySelector(".send-panel-close");
    const dismiss = () => { panel.hidden = true; };
    if(close) close.addEventListener("click", dismiss, { once:true });
    window.setTimeout(dismiss, 10000);
  }
})();

async function copyText(value){
  try{
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(value);
      return true;
    }

    const fallback = document.createElement("textarea");
    fallback.value = value;
    fallback.setAttribute("readonly", "");
    fallback.style.position = "fixed";
    fallback.style.opacity = "0";
    document.body.appendChild(fallback);
    fallback.select();
    const copied = document.execCommand("copy");
    fallback.remove();
    return copied;
  }catch(error){
    return false;
  }
}
