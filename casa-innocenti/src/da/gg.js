/* Casa Innocenti × Growth Gusto : la boutique du site lit le vrai catalogue et le vrai stock, et les commandes arrivent dans Growth Gusto.
   Le design du site ne change pas. Sans identifiant d'établissement, le site reste en démonstration (rien ne part nulle part).
   Identifiant : GG_RID ci-dessous, ou ?gg=<identifiant> dans l'adresse (gardé sur cet appareil ; ?gg=off revient à la démo).
   Le catalogue du site EST celui de Growth Gusto (Boutique) : chaque produit mis en ligne là-bas apparaît ici avec sa photo, son prix,
   son rayon et son stock ; les produits d'exemple du site sont remplacés. Les lots anti-gaspi de Growth Gusto arrivent en rayon « Anti-gaspi ».
   Commande : retrait en boutique, paiement sur place, l'équipe valide l'heure ; le client suit sa commande ici et sur la page Growth Gusto. */
(() => {
  const GG_RID = 'rmwp3qeur'; /* Casa Innocenti dans Growth Gusto */
  const LS = 'ci-gg-rid';
  const q = new URLSearchParams(location.search).get('gg');
  try { if (q === 'off') localStorage.removeItem(LS); else if (q) localStorage.setItem(LS, q); } catch (e) {}
  let rid = GG_RID; try { rid = (q && q !== 'off' ? q : localStorage.getItem(LS)) || GG_RID; } catch (e) {}
  if (!rid || !/^[A-Za-z0-9_-]{4,80}$/.test(rid)) return;
  const SRC = 'https://app.growthgusto.fr/w/gg-boutique.js';
  const G = { menu: null, by: {}, order: null, pollT: 0, slot: '' };
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
  const hmFr = (s) => String(s || '').replace(':', 'h');

  /* site id → Growth Gusto item */
  const gItem = (k) => G.by[k] || null;
  const left = (k) => { const it = gItem(k); return it ? (it.left == null ? 99 : it.left) : 0; };

  function css() {
    const s = document.createElement('style');
    s.textContent = `.gg-stk{display:inline-block;margin-left:6px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--rosso,#B3262E)}
.prod.gg-out{opacity:.55}.prod.gg-out .add,.prod.gg-out .quick{pointer-events:none;opacity:.4}
.gg-live{display:flex;gap:8px;align-items:center;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}.gg-live i{width:7px;height:7px;border-radius:50%;background:var(--verde,#2E9E5B);box-shadow:0 0 0 4px color-mix(in srgb,var(--verde,#2E9E5B) 20%,transparent)}
.gg-slots{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 4px}.gg-slots button{padding:10px 14px;border:1px solid var(--line);font-variant-numeric:tabular-nums}.gg-slots button.on{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.gg-ph{width:100%;height:100%;object-fit:cover;display:block}.gg-ini{display:grid!important;place-items:center;width:100%;height:100%;font:600 42px/1 Georgia,serif;font-style:italic;color:var(--fg);opacity:.55}
.gg-none{color:var(--mute)}.gg-err{color:var(--rosso,#B3262E);font-size:14px;min-height:1.2em}
.gg-st{display:grid;gap:10px;justify-items:start}.gg-st .stamp{transform:rotate(-6deg)}.gg-st .gg-wait{display:flex;gap:10px;align-items:center;color:var(--mute)}
.gg-dots{display:inline-flex;gap:4px}.gg-dots i{width:6px;height:6px;border-radius:50%;background:currentColor;animation:ggd 1.2s infinite}.gg-dots i:nth-child(2){animation-delay:.15s}.gg-dots i:nth-child(3){animation-delay:.3s}
@keyframes ggd{0%,80%,100%{opacity:.25}40%{opacity:1}}@media(prefers-reduced-motion:reduce){.gg-dots i{animation:none}}`;
    document.head.appendChild(s);
  }

  /* the catalogue: Growth Gusto's products replace the example ones (photo, price, shelf, stock) */
  const ini = (t) => String(t || '').split(/[\s'’-]+/).filter((w) => w.length > 2 && !/^\d/.test(w)).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  Object.assign(TINT, { 'Épicerie': '#EFE6DA', Charcuterie: '#F6E3DF', Fromages: '#F7EFD9', Huiles: '#E5EDDC', 'Apéritif et vins': '#F1E0E2', Boissons: '#E3ECEF',
    'Plats du midi': '#F7E8D0', Riz: '#F4EEDC', Arancini: '#F8EBC8', Desserts: '#F4E6D6', Formules: '#EFE6DA', 'Anti-gaspi': '#F6DCDC', Autres: '#EEE9E0' });
  function apply() {
    const M = G.menu; G.by = {}; const cat = {}; (M.cats || []).forEach((c) => { cat[c.id] = c.t; });
    const L = M.items.filter((it) => it.p > 0);
    L.forEach((it) => { G.by[it.id] = it; });
    P.length = 0;
    L.forEach((it) => P.push({ id: it.id, n: it.t, d: it.gaspi ? `Au lieu de ${eur(it.old || it.p)}${it.dlc ? ' · date courte' : ''}` : (it.b || ''), w: it.w || '', p: it.p,
      c: it.gaspi ? 'Anti-gaspi' : (cat[it.c] || 'Épicerie'), tag: it.gaspi ? `−${it.pct || ''} %` : '', gg: it }));
    (window.PA || []).forEach((x) => { if (!/^ag-/.test(x.id)) return; const c = $(`.agc[data-id="${x.id}"]`); x.stock = 0; if (c) c.hidden = true; });
    $$('[data-box-left]').forEach((el) => { el.textContent = 0; });
    const f = $('#filters'); if (f) { const n = Math.max(+($('#grid')?.dataset.n || 0), P.length); const f2 = f.cloneNode(false); f.replaceWith(f2); filters('#filters', '#grid', n); renderGrid('#grid', n); }
    if ($('#grid-home')) renderGrid('#grid-home', 4);
    Object.keys(cart).forEach((k) => { if (!G.by[k] && !(window.PA || []).some((x) => x.id === k)) cart[k] = 0; });
    renderCart();
  }
  /* the product's photo from Growth Gusto (or its initials) where the site drew an illustration */
  const illus0 = illus;
  illus = function (id) { // eslint-disable-line no-global-assign
    const it = G.by[id]; if (!it) return illus0.apply(this, arguments);
    return it.ph ? `<img class="ill gg-ph" src="${esc(it.ph)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : `<span class="ill gg-ini">${esc(ini(it.t))}</span>`;
  };
  /* stock on the cards: « Plus que 2 », « Épuisé » */
  const card0 = card;
  card = function (p, i) { // eslint-disable-line no-global-assign
    let h = card0(p, i).replace(/<p class="prod-desc"> · /, '<p class="prod-desc">').replace(/ · <\/p>/, '</p>'); const it = p.gg; if (!it) return h;
    if (it.out || it.left === 0) h = h.replace('class="prod rv"', 'class="prod rv gg-out"').replace('<span class="prod-price">', '<span class="prod-price"><span class="gg-stk">Épuisé</span> ');
    else if (it.few && it.left != null) h = h.replace(`${p.d} · ${p.w}</p>`, `${p.d} · ${p.w}<span class="gg-stk">${it.left === 1 ? 'Dernier' : 'Plus que ' + it.left}</span></p>`);
    return h;
  };
  /* never more than what is left */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-add]'); if (!a || !G.menu) return;
    const k = a.dataset.add; if (/^ag-/.test(k) && !a.closest('.drawer')) return; /* pages.js counts the anti-gaspi stock itself */
    if (!gItem(k)) { if ((window.PA || []).some((x) => x.id === k && !/^ag-/.test(x.id))) return;
      /* an example product of the site (decor) that is not sold online: show the shop instead of adding it */
      e.stopImmediatePropagation(); e.preventDefault(); const sh = $('#grid'); if (sh) sh.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if ((cart[k] || 0) >= left(k)) { e.stopImmediatePropagation(); e.preventDefault(); const t = $('#toast'); if (t) { t.textContent = left(k) ? `Plus que ${left(k)} en stock` : 'Épuisé pour aujourd’hui'; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 1800); } }
  }, true);

  /* ───────── checkout: today's pickup times, pay in the shop, the shop confirms ───────── */
  function checkout() {
    const co = $('#checkout'); if (!co) return;
    const bar = $$('.co-bar li', co); if (bar[3]) bar[3].textContent = 'Envoi';
    const steps = $$('.co-step', co);
    const mode = $$('.co-mode', co); if (mode[1]) mode[1].hidden = true;
    if (mode[0]) mode[0].querySelector('span').textContent = '30 Grande Rue · gratuit · paiement sur place';
    /* step 1: the times Growth Gusto accepts today */
    const pk = $('.co-picker', co); const nav1 = steps[1] && $('[data-next]', steps[1]);
    const paintSlots = () => { const L = GGBoutique.slots(G.menu); if (!L.includes(G.slot)) G.slot = L[0] || '';
      pk.innerHTML = L.length ? `<p class="gg-live"><i></i>Aujourd’hui, l’équipe confirme l’heure</p><div class="gg-slots" role="radiogroup" aria-label="Heure de retrait">${L.map((s) => `<button type="button" role="radio" aria-checked="${s === G.slot}" class="${s === G.slot ? 'on' : ''}" data-ggs="${s}">${hmFr(s)}</button>`).join('')}</div>`
        : '<p class="gg-none">Plus de retrait possible aujourd’hui. Revenez demain, ou appelez le 09 63 67 76 39.</p>';
      if (nav1) nav1.disabled = !G.slot; whenTxt(); };
    const whenTxt = () => { const w = $('.co-when', co); if (w) w.textContent = G.slot ? `Retrait aujourd’hui à ${hmFr(G.slot)}, à confirmer par la boutique` : ''; };
    pk.addEventListener('click', (e) => { const b = e.target.closest('[data-ggs]'); if (!b) return; e.stopPropagation(); G.slot = b.dataset.ggs; paintSlots(); }, true);
    $('.drawer .pay')?.addEventListener('click', () => setTimeout(() => { paintSlots(); const p = $('#co-pay'); }, 0));
    /* step 3: send, no card */
    if (steps[3]) {
      steps[3].innerHTML = `<h3>Paiement en boutique</h3><p>Vous réglez au retrait, par carte ou en espèces. La boutique vérifie que tout est là et vous confirme l’heure, ici${''} et par e-mail.</p>
        <p class="gg-err" id="gg-err" role="alert"></p>
        <div class="co-nav"><button type="button" class="btn ghost" data-back>← Retour</button><button type="button" class="btn" id="gg-send">Envoyer la commande</button></div>`;
      $('#gg-send', steps[3]).addEventListener('click', send);
    }
    const ok = steps[4];
    async function send() {
      const b = $('#gg-send'), er = $('#gg-err'); const fn = ($('#co-fn')?.value || '').trim(), ln = ($('#co-ln')?.value || '').trim(), tel = ($('#co-tel')?.value || '').trim(), mail = ($('#co-mail')?.value || '').trim();
      const items = Object.keys(cart).filter((k) => cart[k] > 0).map((k) => ({ k, it: gItem(k), q: cart[k] }));
      if (items.some((x) => !x.it)) { er.textContent = 'Un produit du panier n’est pas encore en vente en ligne. Retirez-le, ou appelez la boutique.'; return; }
      if (fn.length < 2 || tel.replace(/\D/g, '').length < 8) { er.textContent = 'Indiquez votre prénom et votre téléphone (étape Coordonnées).'; return; }
      if (!G.slot) { er.textContent = 'Choisissez une heure de retrait.'; return; }
      b.disabled = true; b.textContent = 'Envoi…'; er.textContent = '';
      try {
        const r = await GGBoutique.order(rid, { items: items.map((x) => ({ id: x.it.id, q: x.q })), name: (fn + ' ' + ln.slice(0, 1)).trim() + (ln ? '.' : ''), phone: tel, email: mail, slot: G.slot });
        G.order = { oid: r.oid, k: r.k, track: r.track, st: (r.order && r.order.status) || 'demande', n: r.order && r.order.n };
        try { localStorage.setItem('ci-gg-order', JSON.stringify({ ...G.order, at: Date.now() })); } catch (e) {}
        Object.keys(cart).forEach((k) => cart[k] = 0); renderCart();
        steps.forEach((s, i) => s.hidden = i !== 4); $$('.co-bar li', co).forEach((l) => l.classList.add('on'));
        paintOk(r.order || {}); poll();
      } catch (e) { b.disabled = false; b.textContent = 'Envoyer la commande'; er.textContent = GGBoutique.say(e); if (/plat|prix/.test(e.message)) load(); }
    }
    function paintOk(o) {
      if (!ok) return; const st = o.status || G.order.st;
      const H = { demande: ['Grazie !', 'Demande envoyée', 'Casa Innocenti vérifie que tout est là et vous confirme l’heure. Gardez cette page ouverte : elle change toute seule.'],
        nouvelle: ['Va bene !', `C’est accepté${o.okSlot ? ` : prête à ${hmFr(o.okSlot)}` : ''}`, o.okMsg ? `« ${o.okMsg} »` : 'On prépare votre commande. À tout à l’heure, 30 Grande Rue.'],
        prep: ['In corso', `En préparation${o.okSlot ? ` · prête à ${hmFr(o.okSlot)}` : ''}`, 'On s’en occupe.'],
        prete: ['Pronto !', 'Votre commande est prête', 'Elle vous attend en boutique, 30 Grande Rue.'], servie: ['Grazie !', 'Bonne dégustation', 'Merci pour votre commande.'],
        annulee: ['Mi dispiace', 'Pas possible cette fois', o.why ? `« ${o.why} »` : 'La boutique ne peut pas préparer cette commande. Appelez le 09 63 67 76 39.'] }[st] || ['Grazie !', 'Commande envoyée', ''];
      ok.innerHTML = `<div class="gg-st"><div class="stamp">${H[0]}</div><h3>${esc(H[1])}${G.order.n ? ` <span class="ref">n° ${esc(G.order.n)}</span>` : ''}</h3><p>${esc(H[2])}</p>
        ${st === 'demande' ? '<p class="gg-wait"><span class="gg-dots"><i></i><i></i><i></i></span>En attente de la boutique</p>' : ''}
        <a class="btn ghost" href="${esc(G.order.track)}" target="_blank" rel="noopener">Suivre ma commande →</a><button type="button" class="btn" data-co-close>Continuer mes courses</button></div>`;
    }
    function chime() { try { const A = new (window.AudioContext || window.webkitAudioContext)(); [660, 880].forEach((f, i) => { const o = A.createOscillator(), g = A.createGain(); o.frequency.value = f; g.gain.setValueAtTime(.0001, A.currentTime + i * .18); g.gain.exponentialRampToValueAtTime(.12, A.currentTime + i * .18 + .02); g.gain.exponentialRampToValueAtTime(.0001, A.currentTime + i * .18 + .5); o.connect(g).connect(A.destination); o.start(A.currentTime + i * .18); o.stop(A.currentTime + i * .18 + .55); }); } catch (e) {} }
    async function poll() {
      clearTimeout(G.pollT); if (!G.order) return;
      try { const o = await GGBoutique.status(rid, G.order.oid, G.order.k); if (o && o.status !== G.order.st) { G.order.st = o.status; chime(); paintOk(o); if (window.gsap) gsap.from('.gg-st .stamp', { scale: 2.4, rotate: -30, opacity: 0, duration: .55, ease: 'back.out(2)' }); }
        if (o && ['servie', 'annulee', 'abandonnee'].includes(o.status)) return; } catch (e) {}
      G.pollT = setTimeout(poll, document.hidden ? 20000 : 6000);
    }
  }

  async function load() {
    try { G.menu = await GGBoutique.load(rid); } catch (e) { console.warn('Growth Gusto : boutique indisponible', e); return; }
    if (!G.menu.open) { const p = $('.drawer .pay'); if (p) { p.disabled = true; p.textContent = 'Commande en ligne fermée pour le moment'; } }
    apply();
  }
  function start() { css(); checkout(); load(); setInterval(() => { if (!document.hidden && !$('.co-open')) load(); }, 60000); }
  const s = document.createElement('script'); s.src = SRC; s.onload = () => (document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start()); document.head.appendChild(s);
})();
