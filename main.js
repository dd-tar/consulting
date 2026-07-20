/* ============================================================
   CONFIG — the only place your contacts live. EDIT HERE.
   NOTE: the contact form posts to FormSubmit using the address
   in the form's `action` attribute in index.html / ru/index.html.
   If you change the email, change it there too.
   ============================================================ */
const CONFIG = {
  email: "daria.tar.gz@gmail.com",
  telegram: "dd_tar"
};

const LANG = document.documentElement.lang === "ru" ? "ru" : "en";

const T = {
  en: {
    copy: "· copy",
    copied: "· copied ✓",
    sent: "Sent ✓ — I'll reply within one working day."
  },
  ru: {
    copy: "· копировать",
    copied: "· скопировано ✓",
    sent: "Отправлено ✓ — отвечу в течение рабочего дня."
  }
}[LANG];

/* ---- keep the visible contacts in sync with CONFIG ---- */
(function(){
  const e = document.getElementById("email-text");
  if(e) e.textContent = CONFIG.email;
  const t = document.getElementById("tg-link");
  if(t){
    t.href = "https://t.me/" + CONFIG.telegram;
    const tt = document.getElementById("tg-text");
    if(tt) tt.textContent = "@" + CONFIG.telegram;
  }
})();

/* ============================================================
   Hero scramble: the payoff word resolves out of noise
   ============================================================ */
(function(){
  const el = document.getElementById("scramble");
  if(!el) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const word = el.dataset.word || el.textContent.trim();
  const glyphs = "◼◻▤▥#%&$@?!/\\<>{}[]≠≈∆";
  let frame = 0;
  const total = 36;

  const timer = setInterval(() => {
    frame++;
    const settled = Math.floor((frame / total) * word.length);
    let out = "";
    for(let i = 0; i < word.length; i++){
      out += i < settled ? word[i] : glyphs[Math.floor(Math.random() * glyphs.length)];
    }
    el.textContent = out;
    if(frame >= total){ el.textContent = word; clearInterval(timer); }
  }, 40);
})();

/* ============================================================
   Reveal on scroll
   ============================================================ */
(function(){
  const items = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){
    items.forEach(i => i.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(i => io.observe(i));
})();

/* ============================================================
   Copy email
   ============================================================ */
(function(){
  const btn = document.getElementById("copy-email");
  const state = document.getElementById("copy-state");
  if(!btn || !state) return;
  btn.addEventListener("click", async () => {
    const ok = await copyText(CONFIG.email);
    state.textContent = ok ? T.copied : "";
    setTimeout(() => state.textContent = T.copy, 2000);
  });
})();

/* ============================================================
   Contact form: real delivery via FormSubmit.
   The <form> posts to https://formsubmit.co/<email>; FormSubmit
   emails the message and redirects back here with ?sent=1.
   All this script does is show the success note after redirect.
   ============================================================ */
(function(){
  const panel = document.getElementById("sendpanel");
  const status = document.getElementById("send-status");
  if(!panel || !status) return;
  if(new URLSearchParams(location.search).get("sent") === "1"){
    status.textContent = T.sent;
    panel.hidden = false;
    /* strip ?sent=1 so a reload doesn't re-show the note */
    history.replaceState(null, "", location.pathname + location.hash);
  }
})();

/* clipboard with a fallback for non-secure contexts (file://) */
async function copyText(text){
  try{
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }catch(e){
    return false;
  }
}
