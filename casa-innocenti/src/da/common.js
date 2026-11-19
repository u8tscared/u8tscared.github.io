/* Casa Innocenti — logique commune aux 4 pistes : catalogue, panier, transitions */
const IMG = window.__IMG || {};
const P = [
  {id:'prosciutto',n:'Prosciutto di Parma DOP',d:'Affiné 24 mois, tranché minute',w:'100 g',p:6.9,c:'Salumeria',tag:'Coupé à la commande'},
  {id:'burrata',n:'Burrata des Pouilles',d:'Arrivage mardi et vendredi',w:'125 g',p:4.9,c:'Formaggi',tag:'Ultra frais'},
  {id:'parmigiano',n:'Parmigiano Reggiano DOP',d:'30 mois, coupé à la meule',w:'250 g',p:9.8,c:'Formaggi'},
  {id:'tagliatelle',n:'Tagliatelle all’uovo',d:'Pâtes fraîches aux œufs, maison',w:'250 g',p:4.2,c:'Pasta fresca',tag:'Fait maison'},
  {id:'salame',n:'Salame Felino IGP',d:'Pièce entière, poivre noir',w:'300 g',p:12.5,c:'Salumeria'},
  {id:'tortellini',n:'Tortellini ricotta & épinards',d:'Pâtes fraîches farcies',w:'250 g',p:5.9,c:'Pasta fresca'},
  {id:'olio',n:'Olio extra vergine',d:'Coratina des Pouilles, récolte 2026',w:'50 cl',p:14.9,c:'Dispensa'},
  {id:'panettone',n:'Panettone artigianale',d:'Levain naturel, Milan',w:'750 g',p:24,c:'Dolci',tag:'Noël'},
  {id:'pecorino',n:'Pecorino Romano DOP',d:'Lait de brebis, 8 mois',w:'200 g',p:6.5,c:'Formaggi'},
  {id:'pesto',n:'Pesto alla genovese',d:'Basilic DOP, pignons, Parmigiano',w:'180 g',p:6.2,c:'Dispensa'},
  {id:'vino',n:'Chianti Classico DOCG',d:'Sangiovese, Toscane 2022',w:'75 cl',p:16.5,c:'Vini'},
  {id:'espresso',n:'Caffè miscela bar',d:'Torréfaction napolitaine',w:'250 g',p:7.9,c:'Dispensa'},
  {id:'tiramisu',n:'Tiramisù della casa',d:'Mascarpone, café serré',w:'2 parts',p:8,c:'Dolci',tag:'Fait maison'},
  {id:'board',n:'Coffret Aperitivo',d:'Charcuterie, fromages, olives, grissini',w:'4 pers.',p:39,c:'Coffrets',tag:'Best-seller'}
];
const ALL = () => P.concat(window.PA || []);
const eur = v => v.toFixed(2).replace('.', ',') + ' €';
const cart = {};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const TINT = {Salumeria:'#F6E3DF',Formaggi:'#F7EFD9','Pasta fresca':'#F8EBC8',Dispensa:'#E5EDDC',Vini:'#F1E0E2',Dolci:'#F4E6D6',Coffrets:'#EFE6DA','Da asporto':'#F7E8D0'};
function card(p, i) {
  return `<article class="prod rv" style="--i:${i % 4};--tint:${TINT[p.c] || '#EEE'}">
    <div class="prod-img">${typeof illus === 'function' ? illus(p.id) : ''}${p.tag ? `<span class="prod-tag">${p.tag}</span>` : ''}
      <button class="quick" data-add="${p.id}" aria-label="Ajouter ${p.n} au panier">Ajouter au panier</button></div>
    <div class="prod-meta"><span class="prod-cat">${p.c}</span>
      <h3 class="prod-name">${p.n}</h3>
      <p class="prod-desc">${p.d} · ${p.w}</p>
      <div class="prod-row"><span class="prod-price">${eur(p.p)}</span><button class="add" data-add="${p.id}" aria-label="Ajouter ${p.n}">+</button></div>
    </div></article>`;
}

function renderGrid(sel, n, filter) {
  const g = $(sel); if (!g) return;
  let list = P;
  if (filter && filter !== 'Tout') list = P.filter(p => p.c === filter);
  g.innerHTML = list.slice(0, n).map(card).join('');
  observe($$('.rv', g));
}

function filters(sel, gridSel, n) {
  const f = $(sel); if (!f) return;
  const cats = ['Tout', ...new Set(P.map(p => p.c))];
  f.innerHTML = cats.map((c, i) => `<button class="chip${i ? '' : ' on'}" data-f="${c}">${c}</button>`).join('');
  f.addEventListener('click', e => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    $$('.chip', f).forEach(x => x.classList.toggle('on', x === b));
    const g = $(gridSel);
    g.classList.add('swap');
    setTimeout(() => { renderGrid(gridSel, n, b.dataset.f); g.classList.remove('swap'); }, 220);
  });
}

function renderCart() {
  const ids = Object.keys(cart).filter(k => cart[k] > 0);
  const count = ids.reduce((s, k) => s + cart[k], 0);
  const total = ids.reduce((s, k) => s + cart[k] * ALL().find(p => p.id === k).p, 0);
  $$('[data-count]').forEach(el => { el.textContent = count; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); });
  const body = $('#cart-items');
  body.innerHTML = ids.length ? ids.map(k => { const p = ALL().find(x => x.id === k); return `
    <div class="line"><span class="line-ill" style="--tint:${TINT[p.c]}">${illus(k)}</span><div><strong>${p.n}</strong><small>${p.w} · ${eur(p.p)}</small>
    <div class="qty"><button data-dec="${k}" aria-label="Retirer un">−</button><span>${cart[k]}</span><button data-add="${k}" aria-label="Ajouter un">+</button></div></div>
    <b>${eur(p.p * cart[k])}</b></div>`; }).join('') : '<p class="empty">Votre panier est vide. Commencez par une burrata, elle part vite.</p>';
  $('#cart-total').textContent = eur(total);
  const left = Math.max(0, 60 - total);
  $('#cart-free').innerHTML = left > 0 ? `Plus que <b>${eur(left)}</b> pour la livraison offerte à Saint-Priest` : 'Livraison offerte à Saint-Priest et alentours';
  $('#cart-bar').style.setProperty('--pct', Math.min(100, total / 60 * 100) + '%');
}

function openCart(o = true) { document.documentElement.classList.toggle('cart-open', o); }

document.addEventListener('click', e => {
  const a = e.target.closest('[data-add]');
  if (a) { const k = a.dataset.add; cart[k] = (cart[k] || 0) + 1; renderCart(); fly(a); toast(ALL().find(p => p.id === k).n); return; }
  const d = e.target.closest('[data-dec]');
  if (d) { const k = d.dataset.dec; cart[k] = Math.max(0, (cart[k] || 0) - 1); renderCart(); return; }
  if (e.target.closest('[data-cart]')) { openCart(true); return; }
  if (e.target.closest('[data-close]')) openCart(false);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') openCart(false); });

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function fly(btn) {
  if (reduce) return;
  const t = $('[data-cart]'); if (!t) return;
  const a = btn.getBoundingClientRect(), b = t.getBoundingClientRect();
  const dot = document.createElement('i'); dot.className = 'fly';
  dot.style.left = a.left + a.width / 2 + 'px'; dot.style.top = a.top + a.height / 2 + 'px';
  document.body.appendChild(dot);
  dot.animate([{ transform: 'translate(-50%,-50%) scale(1)' },
    { transform: `translate(${b.left + b.width / 2 - a.left - a.width / 2 - 0}px, ${b.top + b.height / 2 - a.top - a.height / 2}px) translate(-50%,-50%) scale(.3)`, opacity: .4 }],
    { duration: 650, easing: 'cubic-bezier(.6,0,.2,1)' }).onfinish = () => dot.remove();
}
let tt;
function toast(n) {
  const el = $('#toast'); el.textContent = n + ' ajouté au panier';
  el.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('on'), 1800);
}

/* Révélations au défilement : visibles par défaut, animées seulement si JS tourne */
const io = 'IntersectionObserver' in window && !reduce ? new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { rootMargin: '0px 0px -8% 0px' }) : null;
function observe(els) {
  if (!io) return;
  els.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) { el.classList.add('in'); } else { el.classList.add('pre'); io.observe(el); } });
}

function hours() {
  const els = $$('[data-open]'); if (!els.length) return;
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  const d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const start = d === 4 ? 15.5 : 9.5;
  const open = d !== 1 && h >= start && h < 19.5 && !(d === 0 && h >= 13);
  const next = d === 3 ? 'jeudi à 15h30' : (d === 1 || d === 0) ? 'mardi à 9h30' : (h < start ? (d === 4 ? 'à 15h30' : 'à 9h30') : 'demain à ' + (d === 3 ? '15h30' : '9h30'));
  const html = open ? '<i class="dot ok"></i>Ouvert maintenant' : `<i class="dot"></i>Fermé · ouvre ${next}`;
  els.forEach(el => el.innerHTML = html);
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');
  renderGrid('#grid', +($('#grid')?.dataset.n || 8));
  filters('#filters', '#grid', +($('#grid')?.dataset.n || 8));
  renderCart(); hours();
  observe($$('.rv'));
  requestAnimationFrame(() => document.documentElement.classList.add('loaded'));
});
