/* Pages, transition, anti-gaspi */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = window.gsap && !reduce ? window.gsap : null;
  const q = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- catalogue anti-gaspi ---------- */
  const AG = [
    {id:'ag-burrata', ill:'burrata', n:'Burrata des Pouilles', w:'125 g', old:4.9, off:50, dlc:1, stock:4},
    {id:'ag-tiramisu', ill:'tiramisu', n:'Tiramisù della casa', w:'2 parts', old:8, off:50, dlc:0, stock:2},
    {id:'ag-tagliatelle', ill:'tagliatelle', n:'Tagliatelle all’uovo', w:'250 g', old:4.2, off:50, dlc:1, stock:3},
    {id:'ag-panino', ill:'panino', n:'Panino du midi', w:'invendu du jour', old:8.5, off:50, dlc:0, stock:3},
    {id:'ag-tortellini', ill:'tortellini', n:'Tortellini ricotta & épinards', w:'250 g', old:5.9, off:40, dlc:2, stock:5},
    {id:'ag-focaccia', ill:'focaccia', n:'Focaccia genovese', w:'la part', old:3.9, off:50, dlc:0, stock:6},
    {id:'ag-mortadella', ill:'prosciutto', n:'Mortadella tranchée', w:'150 g', old:5.4, off:30, dlc:2, stock:4},
    {id:'ag-pesto', ill:'pesto', n:'Pesto frais alla genovese', w:'180 g', old:6.2, off:30, dlc:3, stock:5},
    {id:'ag-cestino', ill:'board', n:'Panier surprise du soir', w:'retrait 18h30 – 19h30', old:20, p:9.9, off:50, dlc:0, stock:5, box:true}
  ];
  AG.forEach(a => { if (a.p == null) a.p = Math.round(a.old * (100 - a.off)) / 100; a.c = 'Anti-gaspi'; a.d = 'Date courte'; a.max = a.stock; window.PA.push(a); });
  TINT['Anti-gaspi'] = '#F6E3DF';
  const DLC = ['aujourd’hui', 'demain', 'dans 2 jours', 'dans 3 jours'];
  let saved = 12;

  const grid = q('#ag-grid');
  if (grid) grid.innerHTML = AG.filter(a => !a.box).map(a => `<article class="agc" data-id="${a.id}" data-off="${a.off}">
    <div class="agc-img">${illus(a.id)}<span class="agc-stk"><b><u class="mn"></u>${a.off}</b><i>%</i></span></div>
    <span class="agc-dlc${a.dlc === 0 ? ' hot' : ''}"><i></i>À consommer ${a.dlc === 0 ? 'aujourd’hui' : 'avant ' + DLC[a.dlc]}</span>
    <h3>${a.n}</h3><span class="agc-w">${a.w}</span>
    <div class="agc-price"><s><span>${eur(a.old)}</span></s><b data-old="${a.old}" data-new="${a.p}">${eur(a.p)}</b></div>
    <div class="agc-stock"><div class="agc-bar"><i style="--p:${a.stock / 6 * 100}%"></i></div><span>Plus que <b>${a.stock}</b></span></div>
    <button type="button" class="btn agc-go" data-ag="${a.id}"><span>Je le sauve</span></button>
    <div class="agc-sold"><span class="stamp">Salvato !</span></div></article>`).join('');

  function agAdd(btn) {
    const a = AG.find(x => x.id === btn.dataset.ag); if (!a || a.stock <= 0) return;
    a.stock--; saved++;
    cart[a.id] = (cart[a.id] || 0) + 1; renderCart(); fly(btn); toast(a.n);
    qa('[data-saved]').forEach(el => { el.textContent = saved; if (G) G.fromTo(el, {scale:1.5, color:'#F2C230'}, {scale:1, color:'inherit', duration:.6, ease:'back.out(3)'}); });
    const card = btn.closest('.agc');
    if (card) {
      q('.agc-stock b', card).textContent = a.stock; q('.agc-bar i', card).style.setProperty('--p', a.stock / 6 * 100 + '%');
      if (G) G.fromTo(q('.agc-img svg', card), {rotate:-16, scale:1.18}, {rotate:0, scale:1, duration:.8, ease:'elastic.out(1,.45)'});
      if (a.stock === 0) { card.classList.add('sold'); if (G) G.fromTo(q('.agc-sold .stamp', card), {scale:3, rotate:-40, opacity:0}, {scale:1, rotate:-10, opacity:1, duration:.55, ease:'back.out(2.2)'}); }
    } else {
      qa('[data-box-left]').forEach(el => el.textContent = a.stock);
      if (G) G.fromTo('.agbox-ill svg', {rotate:-10, y:-20}, {rotate:0, y:0, duration:.9, ease:'elastic.out(1,.4)'});
      if (a.stock === 0) { btn.disabled = true; q('span', btn).textContent = 'Tous les paniers sont réservés'; }
    }
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-ag]'); if (b) agAdd(b); });
  qa('.ag-filter').forEach(f => f.addEventListener('click', e => {
    const b = e.target.closest('[data-off]'); if (!b) return;
    qa('.chip', f).forEach(c => c.classList.toggle('on', c === b));
    qa('.agc').forEach(c => c.hidden = b.dataset.off !== 'all' && c.dataset.off !== b.dataset.off);
    if (G) G.from(qa('.agc:not([hidden])'), {y:20, opacity:0, duration:.4, stagger:.04, clearProps:'opacity,transform'});
  }));

  /* compte à rebours jusqu'à la fermeture (19h30, 13h le dimanche, fermé le lundi) */
  function target() {
    const now = new Date(new Date().toLocaleString('en-US', {timeZone:'Europe/Paris'}));
    for (let i = 0; i < 8; i++) { const d = new Date(now); d.setDate(now.getDate() + i); const dow = d.getDay(); if (dow === 1) continue; d.setHours(dow === 0 ? 13 : 19, dow === 0 ? 0 : 30, 0, 0); if (d > now) return [d - now, i === 0]; }
    return [0, true];
  }
  function tick() {
    const [ms, today] = target(); const s = Math.floor(ms / 1000), v = [Math.floor(s / 3600), Math.floor(s % 3600 / 60), s % 60].map(x => String(x).padStart(2, '0'));
    qa('[data-cd]').forEach(root => {
      qa('b', root).forEach((b, i) => { if (b.textContent !== v[i]) { b.textContent = v[i]; if (G && !root.closest('[hidden]')) G.fromTo(b, {yPercent:-35, opacity:.2}, {yPercent:0, opacity:1, duration:.35, ease:'power2.out'}); } });
    });
    qa('[data-cd-label]').forEach(el => el.textContent = today ? 'Fin des offres du jour dans' : 'Prochaines offres jusqu’à la fermeture, dans');
  }
  tick(); setInterval(tick, 1000);

  /* étiquettes suspendues : ressorts amortis */
  const swing = qa('.ptag-hang').map((el, i) => ({el, sw:el.firstElementChild, a:0, v:0, k:34 + (i % 3) * 8, d:1.3 + (i % 2) * .5}));
  if (G) {
    let mx = null;
    const rail = q('.ag-rail');
    rail.addEventListener('pointermove', e => { if (mx != null) { const dx = e.clientX - mx; swing.forEach(o => { const r = o.el.getBoundingClientRect(), d = Math.abs(e.clientX - (r.left + r.width / 2)); if (d < 120) o.v += dx * 2.4 * (1 - d / 120); }); } mx = e.clientX; });
    rail.addEventListener('pointerleave', () => mx = null);
    let ly = scrollY; addEventListener('scroll', () => { const dy = scrollY - ly; ly = scrollY; swing.forEach((o, i) => o.v += dy * .5 * (i % 2 ? 1 : -1)); }, {passive:true});
    G.ticker.add((t, dt) => { const h = Math.min(dt, 40) / 1000; swing.forEach(o => { o.v += (-o.k * o.a - o.d * o.v) * h; o.v = Math.max(-500, Math.min(500, o.v)); o.a += o.v * h; if (Math.abs(o.a) > .01 || Math.abs(o.v) > .01) o.sw.style.transform = `rotate(${o.a.toFixed(2)}deg)`; }); });
  }

  /* entrée de la page anti-gaspi (rejouée à chaque visite) */
  let cardIO;
  function agEnter() {
    if (!G) return;
    const tl = G.timeline({defaults:{ease:'power4.out'}});
    tl.fromTo('.ag-rail .bar', {scaleX:0}, {scaleX:1, duration:.7, ease:'expo.out'})
      .fromTo('.ptag-hang', {y:-380}, {y:0, duration:.8, stagger:.06, ease:'power3.out'}, '<.05')
      .add(() => swing.forEach(o => o.v += G.utils.random(-300, 300)), '<.2')
      .fromTo('.ag-hero h1 .l>span', {yPercent:110}, {yPercent:0, duration:.9, stagger:.09}, '<.1')
      .fromTo('.ag-in', {y:22, opacity:0}, {y:0, opacity:1, duration:.7, stagger:.07}, '<.25')
      .fromTo('.ag-big', {scale:.6, rotate:-8, opacity:0}, {scale:1, rotate:-4, opacity:1, duration:.9, ease:'back.out(1.8)'}, '<-.5')
      .fromTo('.odc', {yPercent:0}, {yPercent:i => -(10 + (i ? 0 : 5)) * 5, duration:1.6, stagger:.12, ease:'power4.inOut'}, '<')
      .fromTo('.ag-seal', {scale:0, rotate:-200}, {scale:1, rotate:0, duration:.9, ease:'back.out(1.7)'}, '<.5');
    qa('[data-agn]').forEach(el => { const v = parseFloat(el.dataset.agn), o = {n:0}; G.to(o, {n:v, duration:1.6, delay:.5, ease:'power2.out', onUpdate:() => el.textContent = v % 1 ? o.n.toFixed(1).replace('.', ',') : Math.round(o.n)}); });
    qa('[data-saved]').forEach(el => el.textContent = saved);
    /* cartes : jouées quand elles entrent dans l'écran */
    if (cardIO) cardIO.disconnect();
    const cards = qa('.agc'); G.set(cards, {opacity:0, y:50, rotateY:-25, transformPerspective:900});
    cards.forEach(c => { G.set(q('.agc-stk', c), {scale:0}); G.set(q('.agc-price s', c), {'--w':'0%'}); });
    cardIO = new IntersectionObserver(es => es.forEach(en => { if (!en.isIntersecting) return; cardIO.unobserve(en.target); const c = en.target, i = cards.indexOf(c) % 4, b = q('.agc-price b', c), o = {n:+b.dataset.old};
      G.timeline({delay:i * .09}).to(c, {opacity:1, y:0, rotateY:0, duration:.8, ease:'power3.out'})
        .fromTo(q('.agc-stk', c), {scale:3.2, rotate:40}, {scale:1, rotate:-12, duration:.5, ease:'back.out(2.4)'}, '-=.35')
        .to(q('.agc-price s', c), {'--w':'100%', duration:.4, ease:'power2.inOut'}, '<.1')
        .to(o, {n:+b.dataset.new, duration:.7, ease:'power2.out', onUpdate:() => b.textContent = eur(o.n)}, '<')
        .fromTo(q('.agc-bar i', c), {scaleX:0}, {scaleX:1, duration:.7, ease:'power3.out'}, '<');
    }), {rootMargin:'0px 0px -6% 0px'});
    cards.forEach(c => cardIO.observe(c));
    G.fromTo('.agbox-ill svg', {rotate:-6}, {rotate:6, duration:1.6, yoyo:true, repeat:-1, ease:'sine.inOut', overwrite:true});
  }
  if (G) { G.to('.ag-seal svg', {rotate:360, duration:18, repeat:-1, ease:'none'}); }

  /* ---------- pages ---------- */
  const PAGES = ['accueil', 'boutique', 'emporter', 'anti-gaspi', 'la-casa'];
  const TITLES = {accueil:['Benvenuti', 'Accueil'], boutique:['La bottega', 'Boutique'], emporter:['Da asporto', 'À emporter'], 'anti-gaspi':['Ultimo minuto', 'Anti-gaspi'], 'la-casa':['La casa', 'La Casa']};
  const pages = qa('.page'); let cur = null, busy = false;
  const pt = q('#pt'); let lx = null, ly = null;
  document.addEventListener('click', e => { lx = e.clientX; ly = e.clientY; }, true);
  function show(name, target) {
    cur = name;
    pages.forEach(p => p.hidden = p.dataset.page !== name);
    qa('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === name));
    document.documentElement.dataset.page = name;
    window.scrollTo({top:0, behavior:'instant'});
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
      /* les apparitions au scroll de la page affichée repartent de zéro */
      if (G) { const pg = pages.find(p => p.dataset.page === name); ScrollTrigger.getAll().forEach(st => { if (!st.trigger || !st.animation || st.vars.scrub || !pg.contains(st.trigger)) return; if (ScrollTrigger.isInViewport(st.trigger)) st.animation.play(0); else st.animation.pause(0); }); }
    }
    if (target) { const y = target.getBoundingClientRect().top + scrollY - 84; window.scrollTo({top:y, behavior:'instant'}); }
    if (name === 'anti-gaspi') agEnter();
  }
  function go(name, target) {
    if (busy) return;
    if (name === cur) { window.scrollTo({top:target ? target.getBoundingClientRect().top + scrollY - 84 : 0, behavior:'smooth'}); return; }
    try { if (location.hash !== '#' + name) history.pushState(null, '', '#' + name); } catch (e) { location.hash = name; }
    document.documentElement.classList.remove('cart-open', 'qv-open', 'co-open');
    if (!G) { show(name, target); return; }
    busy = true;
    pt.dataset.to = name;
    if (window.NOTTE) { q('.pt-it', pt).textContent = TITLES[name][0]; q('.pt-fr', pt).textContent = TITLES[name][1]; pt.hidden = false; const x = lx == null ? innerWidth / 2 : lx, y = ly == null ? innerHeight / 2 : ly, R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 40, R2 = Math.hypot(innerWidth, innerHeight) / 2 + 40;
      G.timeline({onComplete:() => { pt.hidden = true; busy = false; G.set(pt, {clearProps:'clipPath'}); G.set('.pt-txt', {clearProps:'all'}); }})
        .fromTo(pt, {clipPath:`circle(0px at ${x}px ${y}px)`}, {clipPath:`circle(${R}px at ${x}px ${y}px)`, duration:.55, ease:'power3.inOut'})
        .fromTo('.pt-it', {yPercent:110}, {yPercent:0, duration:.4, ease:'power4.out'}, '-=.25')
        .fromTo('.pt-fr,.pt-rule i', {opacity:0, scaleX:0}, {opacity:1, scaleX:1, duration:.3, stagger:.04}, '<.05')
        .add(() => show(name, target))
        .set(pt, {clipPath:`circle(${R2}px at ${innerWidth / 2}px ${innerHeight / 2}px)`})
        .to('.pt-txt', {scale:1.12, opacity:0, duration:.3, ease:'power2.in'}, '+=.14')
        .to(pt, {clipPath:`circle(0px at ${innerWidth / 2}px ${innerHeight / 2}px)`, duration:.55, ease:'power3.inOut'}, '<.08');
      return; }
    pt.dataset.to = name; q('.pt-it', pt).textContent = TITLES[name][0]; q('.pt-fr', pt).textContent = TITLES[name][1];
    pt.hidden = false;
    G.timeline({onComplete:() => { pt.hidden = true; busy = false; }})
      .fromTo('.pt-col', {yPercent:100}, {yPercent:0, duration:.42, stagger:.05, ease:'power3.inOut'})
      .fromTo('.pt-it', {yPercent:110}, {yPercent:0, duration:.4, ease:'power4.out'}, '-=.2')
      .fromTo('.pt-fr,.pt-rule i', {opacity:0, scaleX:0}, {opacity:1, scaleX:1, duration:.3, stagger:.04}, '<.05')
      .add(() => show(name, target))
      .to('.pt-txt', {yPercent:-40, opacity:0, duration:.28, ease:'power2.in'}, '+=.12')
      .to('.pt-col', {yPercent:-100, duration:.5, stagger:.05, ease:'power3.inOut'}, '<.05')
      .set('.pt-txt', {yPercent:0, opacity:1});
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    e.preventDefault();
    if (a.dataset.add !== undefined || a.dataset.ag !== undefined) return;
    const id = a.getAttribute('href').slice(1);
    if (id === '') return go('accueil');
    if (PAGES.includes(id)) return go(id);
    const el = document.getElementById(id); if (!el) return;
    const pg = el.closest('.page'); go(pg ? pg.dataset.page : cur, el);
  });
  const fromHash = () => { const n = location.hash.slice(1); return PAGES.includes(n) ? n : 'accueil'; };
  addEventListener('hashchange', () => { const n = fromHash(); if (n !== cur) go(n); });
  addEventListener('popstate', () => { const n = fromHash(); if (n !== cur) go(n); });
  renderGrid('#grid-home', 4);
  show(fromHash());
})();
