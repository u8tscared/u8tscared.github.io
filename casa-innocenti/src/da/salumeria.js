/* Salumeria : à emporter, créneaux, commande, paiement factice, fiche rapide */
window.PA = [
  {id:'panino', n:'Panino Toscano', d:'Prosciutto di Parma, burrata, roquette, focaccia', w:'formule midi + boisson', p:11.5, c:'Da asporto', tag:'Le best-seller'},
  {id:'panino2', ill:'panino', n:'Panino Classico', d:'Mortadelle pistache, stracciatella, pesto', w:'formule midi', p:8.5, c:'Da asporto'},
  {id:'pizza', n:'Pizza al taglio', d:'Margherita, jambon cru et roquette', w:'la part', p:4.5, c:'Da asporto'},
  {id:'focaccia', n:'Focaccia genovese', d:'Huile d’olive, tomates cerises, romarin', w:'la part', p:3.9, c:'Da asporto'},
  {id:'tiramisu2', ill:'tiramisu', n:'Tiramisù in vasetto', d:'Mascarpone, café serré, cacao', w:'1 pot', p:4.5, c:'Da asporto'},
  {id:'caffe', ill:'espresso', n:'Caffè espresso', d:'Miscela napolitaine, servi chaud', w:'1 tasse', p:1.8, c:'Da asporto'}
];
const _illus = illus;
illus = (id) => { const a = (window.PA || []).find(x => x.id === id); return _illus(a && a.ill ? a.ill : id); };

const CI = (() => {
  const paris = () => new Date(new Date().toLocaleString('en-US', {timeZone:'Europe/Paris'}));
  const DAYS = ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'];
  const MONTHS = ['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
  function days(n = 6) {
    const out = [], d = paris(); d.setHours(0, 0, 0, 0);
    for (let i = 0; out.length < n && i < 14; i++) { const x = new Date(d); x.setDate(d.getDate() + i); if (x.getDay() !== 1) out.push(x); }
    return out;
  }
  function slots(day) {
    const dow = day.getDay(), list = [];
    const ranges = dow === 4 ? [[16, 19.5]] : dow === 0 ? [[10, 13]] : [[10, 12.5], [16, 19.5]];
    ranges.forEach(([a, b]) => { for (let h = a; h < b; h += .5) list.push(h); });
    const now = paris(), today = now.toDateString() === day.toDateString(), nowH = now.getHours() + now.getMinutes() / 60;
    return list.map((h, i) => ({h, label:`${Math.floor(h)}h${h % 1 ? '30' : '00'}`, full: (day.getDate() * 7 + i * 3) % 9 === 0, past: today && h < nowH + 2}));
  }
  /* sélecteur jour + créneau réutilisable */
  function picker(root, onChange) {
    const ds = days();
    let sel = {day:null, slot:null};
    root.innerHTML = `<div class="pk-days" role="radiogroup" aria-label="Jour de retrait">${ds.map((d, i) => `<button type="button" class="pk-day" data-i="${i}"><small>${DAYS[d.getDay()]}</small><b>${d.getDate()}</b><small>${MONTHS[d.getMonth()]}</small></button>`).join('')}</div><div class="pk-slots" aria-live="polite"></div>`;
    const sl = root.querySelector('.pk-slots');
    function pickDay(i) {
      root.querySelectorAll('.pk-day').forEach((b, j) => b.classList.toggle('on', j === i));
      sel = {day:ds[i], slot:null};
      const s = slots(ds[i]);
      const free = s.filter(x => !x.full && !x.past);
      sl.innerHTML = free.length ? s.map(x => `<button type="button" class="pk-slot" ${x.full || x.past ? 'disabled' : ''} data-h="${x.h}">${x.label}${x.full ? '<i>complet</i>' : ''}</button>`).join('') : '<p class="pk-none">Plus de créneau ce jour-là, choisissez le suivant.</p>';
      if (window.gsap) gsap.from(sl.children, {y:10, opacity:0, duration:.35, stagger:.025, ease:'power2.out'});
      onChange(sel);
    }
    root.addEventListener('click', e => {
      const d = e.target.closest('.pk-day'); if (d) return pickDay(+d.dataset.i);
      const s = e.target.closest('.pk-slot'); if (s && !s.disabled) { root.querySelectorAll('.pk-slot').forEach(b => b.classList.toggle('on', b === s)); sel.slot = +s.dataset.h; onChange(sel); }
    });
    const first = ds.findIndex(d => slots(d).some(x => !x.full && !x.past)); pickDay(first < 0 ? 0 : first);
    return () => sel;
  }
  const fmt = sel => sel.day && sel.slot != null ? `${DAYS[sel.day.getDay()].replace('.', '')} ${sel.day.getDate()} ${MONTHS[sel.day.getMonth()]} à ${Math.floor(sel.slot)}h${sel.slot % 1 ? '30' : '00'}` : '';
  const ref = () => 'CI-' + Math.floor(1000 + Math.random() * 9000);
  return {picker, fmt, ref};
})();

/* ---------- À emporter ---------- */
(() => {
  const box = document.getElementById('asporto'); if (!box) return;
  const q = {};
  const menu = box.querySelector('.as-menu');
  menu.innerHTML = PA.map((p, i) => `<article class="as-item" data-id="${p.id}">
    <div class="as-ill">${illus(p.id)}</div>
    <div class="as-txt">${p.tag ? `<span class="as-tag">${p.tag}</span>` : ''}<h3>${p.n}</h3><p>${p.d}</p><span class="as-w">${p.w}</span></div>
    <div class="as-buy"><b>${eur(p.p)}</b><div class="stepper"><button type="button" data-m="-1" aria-label="Retirer">−</button><span>0</span><button type="button" data-m="1" aria-label="Ajouter">+</button></div></div></article>`).join('');
  const lines = box.querySelector('.tk-lines'), tot = box.querySelector('.tk-total'), btn = box.querySelector('#as-go'), when = box.querySelector('.tk-when');
  let sel = {};
  const getSel = CI.picker(box.querySelector('.as-picker'), s => { sel = s; refresh(); });
  function refresh() {
    const ids = Object.keys(q).filter(k => q[k] > 0);
    lines.innerHTML = ids.length ? ids.map(k => { const p = PA.find(x => x.id === k); return `<div class="tk-l"><span>${q[k]} × ${p.n}</span><b>${eur(q[k] * p.p)}</b></div>`; }).join('') : '<p class="tk-empty">Choisissez vos panini, parts de pizza ou douceurs dans la carte.</p>';
    const t = ids.reduce((s, k) => s + q[k] * PA.find(x => x.id === k).p, 0);
    tot.textContent = eur(t);
    when.textContent = CI.fmt(sel) || 'Choisissez un créneau';
    const ok = ids.length && sel.slot != null && box.querySelector('#as-name').value.trim().length > 1;
    btn.disabled = !ok;
    btn.querySelector('span').textContent = !ids.length ? 'Ajoutez un produit' : sel.slot == null ? 'Choisissez un créneau' : !ok ? 'Indiquez votre prénom' : `Réserver mon retrait · ${eur(t)}`;
  }
  menu.addEventListener('click', e => {
    const b = e.target.closest('[data-m]'); if (!b) return;
    const it = b.closest('.as-item'), id = it.dataset.id;
    q[id] = Math.max(0, (q[id] || 0) + +b.dataset.m);
    it.querySelector('.stepper span').textContent = q[id];
    it.classList.toggle('on', q[id] > 0);
    if (window.gsap && +b.dataset.m > 0) { gsap.fromTo(it.querySelector('.as-ill svg'), {rotate:-14, scale:1.15}, {rotate:0, scale:1, duration:.7, ease:'elastic.out(1,.5)'}); }
    refresh();
  });
  box.querySelector('#as-name').addEventListener('input', refresh);
  box.querySelector('.as-form').addEventListener('submit', e => {
    e.preventDefault(); if (btn.disabled) return;
    const t = box.querySelector('.ticket'), r = CI.ref();
    t.classList.add('done');
    box.querySelector('.tk-done').innerHTML = `<div class="stamp">Pronto !</div><p class="tk-ref">Commande <b>${r}</b></p><p>Retrait <b>${CI.fmt(sel)}</b><br>Casa Innocenti, 30 Grande Rue</p><p class="tk-small">${box.querySelector('[name=paye]:checked').value === 'ligne' ? 'Payé en ligne (démo)' : 'À régler sur place'} · un SMS de rappel vous est envoyé 30 min avant.</p><button type="button" class="btn ghost" id="as-new">Nouvelle commande</button>`;
    if (window.gsap) { gsap.from('.tk-done .stamp', {scale:3, rotate:-40, opacity:0, duration:.6, ease:'back.out(2.2)'}); gsap.from('.tk-done p,.tk-done button', {y:12, opacity:0, stagger:.08, delay:.3}); }
  });
  box.addEventListener('click', e => { if (e.target.id === 'as-new') { box.querySelector('.ticket').classList.remove('done'); Object.keys(q).forEach(k => q[k] = 0); box.querySelectorAll('.as-item').forEach(it => { it.classList.remove('on'); it.querySelector('.stepper span').textContent = 0; }); refresh(); } });
  refresh();
})();

/* ---------- Commande depuis le panier ---------- */
(() => {
  const co = document.getElementById('checkout'); if (!co) return;
  let step = 0, mode = 'retrait', sel = {};
  const total = () => Object.keys(cart).reduce((s, k) => s + cart[k] * ALL().find(p => p.id === k).p, 0);
  const fee = () => 0;
  CI.picker(co.querySelector('.co-picker'), s => { sel = s; sum(); });
  function sum() {
    const ids = Object.keys(cart).filter(k => cart[k] > 0);
    co.querySelector('.co-lines').innerHTML = ids.map(k => { const p = ALL().find(x => x.id === k); return `<div class="co-l"><span class="line-ill" style="--tint:${TINT[p.c]}">${illus(k)}</span><span>${cart[k]} × ${p.n}</span><b>${eur(cart[k] * p.p)}</b></div>`; }).join('');
    co.querySelector('.co-fee').textContent = 'Gratuit';
    co.querySelector('.co-tot').textContent = eur(total() + fee());
    co.querySelector('.co-when').textContent = 'Retrait ' + (CI.fmt(sel) || '');
    co.querySelector('#co-pay').textContent = `Payer ${eur(total() + fee())}`;
  }
  function go(n) {
    step = n;
    co.querySelectorAll('.co-step').forEach((s, i) => s.hidden = i !== n);
    co.querySelectorAll('.co-bar li').forEach((l, i) => { l.classList.toggle('on', i <= n); });
    if (window.gsap) gsap.from(co.querySelectorAll('.co-step')[n].children, {y:16, opacity:0, duration:.45, stagger:.05, ease:'power2.out'});
    sum();
  }
  function open() {
    if (!Object.values(cart).some(v => v > 0)) return;
    openCart(false); document.documentElement.classList.add('co-open'); go(0);
  }
  document.querySelector('.drawer .pay').addEventListener('click', open);
  co.addEventListener('click', e => {
    if (e.target.closest('[data-co-close]')) { document.documentElement.classList.remove('co-open'); return; }
    const m = e.target.closest('[data-mode]'); if (m) { mode = m.dataset.mode; co.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b === m)); sum(); }
    const n = e.target.closest('[data-next]'); if (n) { if (step === 1 && sel.slot == null) return; go(step + 1); }
    const b = e.target.closest('[data-back]'); if (b) go(Math.max(0, step - 1));
  });
  const cc = co.querySelector('#co-card'); cc.addEventListener('input', () => { cc.value = cc.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); });
  const ex = co.querySelector('#co-exp'); ex.addEventListener('input', () => { const v = ex.value.replace(/\D/g, '').slice(0, 4); ex.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v; });
  co.querySelector('.co-payform').addEventListener('submit', e => {
    e.preventDefault();
    const b = co.querySelector('#co-pay'); b.classList.add('load'); b.textContent = 'Paiement en cours…';
    setTimeout(() => {
      b.classList.remove('load'); const r = CI.ref();
      co.querySelector('.co-ok .ref').textContent = r; co.querySelector('.co-ok .when').textContent = co.querySelector('.co-when').textContent;
      go(4); Object.keys(cart).forEach(k => cart[k] = 0); renderCart();
      if (window.gsap) gsap.fromTo('.co-ok .stamp', {scale:3, rotate:-40, opacity:0, y:0}, {scale:1, rotate:-8, opacity:1, y:0, duration:.6, ease:'back.out(2.2)', overwrite:true});
    }, 1300);
  });
})();

/* ---------- Fiche produit rapide ---------- */
(() => {
  const qv = document.getElementById('qv'); if (!qv) return;
  let cur, mult = 1;
  document.addEventListener('click', e => {
    const card = e.target.closest('.prod'); if (!card || e.target.closest('button')) return;
    const name = card.querySelector('.prod-name').textContent; cur = P.find(p => p.n === name); if (!cur) return;
    mult = 1;
    const byWeight = ['Salumeria', 'Formaggi'].includes(cur.c);
    qv.querySelector('.qv-ill').style.setProperty('--tint', TINT[cur.c]);
    qv.querySelector('.qv-ill').innerHTML = illus(cur.id);
    qv.querySelector('.qv-cat').textContent = cur.c;
    qv.querySelector('.qv-name').textContent = cur.n;
    qv.querySelector('.qv-desc').textContent = cur.d;
    const w = qv.querySelector('.qv-w');
    w.innerHTML = byWeight ? [1, 2, 3].map(m => `<button type="button" class="chip${m === 1 ? ' on' : ''}" data-mult="${m}">${parseInt(cur.w) * m} g</button>`).join('') : `<span class="chip on">${cur.w}</span>`;
    price(); document.documentElement.classList.add('qv-open');
    if (window.gsap) { gsap.fromTo('.qv-ill svg', {scale:.6, rotate:-20}, {scale:1, rotate:0, duration:.9, ease:'elastic.out(1,.6)'}); gsap.from('.qv-txt>*', {y:14, opacity:0, stagger:.05, duration:.4}); }
  });
  function price() { qv.querySelector('.qv-price').textContent = eur(cur.p * mult); qv.querySelector('.qv-add').dataset.add = cur.id; }
  qv.addEventListener('click', e => {
    const m = e.target.closest('[data-mult]'); if (m) { mult = +m.dataset.mult; qv.querySelectorAll('[data-mult]').forEach(b => b.classList.toggle('on', b === m)); price(); }
    if (e.target.closest('.qv-add')) { for (let i = 1; i < mult; i++) cart[cur.id] = (cart[cur.id] || 0) + 1; renderCart(); setTimeout(() => document.documentElement.classList.remove('qv-open'), 250); }
    if (e.target.closest('[data-qv-close]')) document.documentElement.classList.remove('qv-open');
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.documentElement.classList.remove('qv-open', 'co-open'); });
})();
