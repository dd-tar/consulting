const CONFIG = {
  email: "daria.tar.gz@gmail.com",
  telegram: "dd_tar"
};

const LANG = document.documentElement.lang === "ru" ? "ru" : "en";
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

/* FormSubmit redirects back with ?sent=1 after successful delivery. */
(function showFormSuccess(){
  const panel = document.getElementById("sendpanel");
  const status = document.getElementById("send-status");
  if(!panel || !status) return;

  if(new URLSearchParams(window.location.search).get("sent") === "1"){
    status.textContent = TEXT.sent;
    panel.hidden = false;
    window.history.replaceState(null, "", window.location.pathname);

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
