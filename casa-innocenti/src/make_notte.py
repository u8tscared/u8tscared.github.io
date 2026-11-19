# Génère da/5-notte.html (version « Notte ») à partir de da/1-salumeria.html.
import os
D=os.path.dirname(os.path.abspath(__file__))+'/da/'
s=open(D+'1-salumeria.html').read()

def sub(a,b,new,keep_b=True):
    global s
    i=s.index(a); j=s.index(b,i)
    s=s[:i]+new+(s[j:] if keep_b else s[j+len(b):])
def rep(a,b):
    global s
    assert a in s, a[:70]
    s=s.replace(a,b,1)

rep('<title>Casa Innocenti · Salumeria</title>','<title>Casa Innocenti · Notte</title>')

# ---------- palette : une seule ambiance, nuit vert bouteille ----------
N='--bg:#0A1F18;--fg:#F3EEE2;--mute:#A9B5AC;--line:#21402F;--card:#123026;--verde:#8FD1AB;--rosso:#EE5A60;--oro:#E0BC74;--accent:#8FD1AB;--accent-fg:#0A1F18;--paper:#0F2A21;color-scheme:dark'
i=s.index(':root{--bg:'); j=s.index('.tri{display:flex')
k=s.index('@font-face{font-family:"EuroFix"')
s=s[:i]+':root{'+N+';\n--display:"EuroFix","Bodoni Moda","Didot","Bodoni 72",Georgia,serif;--body:"Jost","Futura","Avenir Next",system-ui,sans-serif}\n@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){'+N+'}}\n:root[data-theme="dark"]{'+N+'}\n{{COMMON_CSS}}\n'+s[k:]

# ---------- hero : produits en orbite ----------
sub('<section class="hero" id="hero">','<div class="marq" aria-hidden="true">','''<section class="hero2" id="hero">
  <div class="h2-ghost" aria-hidden="true"><span>Innocenti</span></div>
  <div class="h2-stage">
    <div class="orbit" id="orbit"></div>
    <div class="orb-core" aria-hidden="true"><svg viewBox="0 0 200 200"><defs><path id="corec" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text fill="currentColor" font-size="15" font-family="Jost,sans-serif"><textPath href="#corec" textLength="484">CASA INNOCENTI · EPICERIA FINE ITALIANA · SAINT-PRIEST ·</textPath></text></svg><b>CI</b></div>
    <div class="wrap hero-txt">
      <div class="eyebrow h-in">Casa Innocenti · 30 Grande Rue, Saint-Priest</div>
      <h1><span class="l"><span>L’épicerie italienne</span></span><span class="l"><span><em>de Saint-Priest.</em></span></span></h1>
      <p class="lead h-in">Charcuterie tranchée à la commande, fromages, pâtes fraîches maison et épicerie fine. Commandez en ligne, c’est prêt en boutique en 2 heures.</p>
      <div class="btns h-in"><a class="btn" href="#boutique">Faire mes courses <span>→</span></a><a class="btn ghost" href="#emporter">Commander à emporter</a></div>
    </div>
  </div>
  <div class="wrap"><div class="how h-in">
    <a href="#boutique"><small>Boutique</small><b>Click &amp; collect</b><span>Votre panier prêt en 2 h, Grande Rue</span></a>
    <a href="#emporter"><small>Le midi</small><b>À emporter</b><span>Panini et pizza, sur le créneau choisi</span></a>
    <a href="#anti-gaspi" class="how-ag"><small>Chaque soir</small><b>Anti-gaspi −50 %</b><span>Les dates courtes à moitié prix</span></a>
    <div><small>Avis Google</small><b>4,9 ★★★★★</b><span>23 avis · <span data-open></span></span></div>
  </div></div>
</section>

''')
# deuxième bandeau défilant, en sens inverse
rep('<section class="reparti">','<div class="marq marq2" aria-hidden="true"><div class="track"><span>Coupé à la commande</span><span>Fait maison</span><span>Prêt en 2 heures</span><span>Arrivage du mardi</span><span>Dal cuore dell’Italia</span><span>Coupé à la commande</span><span>Fait maison</span><span>Prêt en 2 heures</span><span>Arrivage du mardi</span><span>Dal cuore dell’Italia</span></div></div>\n\n<section class="reparti">')

# ---------- rayons : panneaux qui s'empilent ----------
R=[('Salumeria','charcuterie','Prosciutto di Parma, salame Felino, mortadelle à la pistache. Tranché devant vous.','prosciutto','#F4D5CF','#7E1A20','#13201A'),
   ('Formaggi','fromagerie','Burrata des Pouilles, Parmigiano 30 mois, pecorino. Arrivage deux fois par semaine.','burrata','#F6EBCB','#B3262E','#13201A'),
   ('Pasta fresca','maison','Tagliatelle, tortellini, ravioli : faites le matin, dans l’atelier.','tagliatelle','#F2C230','#7E1A20','#13201A'),
   ('Dispensa','épicerie','Huiles d’olive, pesto, sauces, café napolitain et biscuits.','olio','#BFD9C4','#0E3B2C','#13201A'),
   ('Vini','cave','Chianti, Primitivo, Prosecco : une cave courte, choisie bouteille par bouteille.','vino','#7E1A20','#F2C230','#F6EBDD'),
   ('Dolci','douceurs','Panettone au levain, tiramisù de la casa, cantucci.','panettone','#F3EEE2','#B3262E','#13201A')]
cards=''.join(f'''<a class="rpc" href="#shop" data-f="{n}" style="--c:{c};--k:{k};--t:{t};--i:{i}"><span class="rpc-n">0{i+1}</span><span class="rpc-b"><span class="rpc-t">{n}<em>{fr}</em></span><span class="rpc-c">{d}</span><span class="rpc-go">Voir le rayon <i>→</i></span></span><span class="rpc-ill" data-slot="{ill}"></span></a>\n''' for i,(n,fr,d,ill,c,k,t) in enumerate(R))
sub('<section class="reparti">','<section class="shop"><div class="wrap">','''<section class="rp"><div class="wrap">
  <div class="rp-head"><div class="eyebrow">I nostri reparti</div><h2>Six rayons, <span class="it">une seule Italie.</span></h2></div>
  <div class="rp-stack">
'''+cards+'''  </div>
</div></section>

''')
rep('<div class="flagline" id="flagline"','<div class="cur" id="cur" aria-hidden="true"><i></i><b></b></div>\n<div class="flagline" id="flagline"')

# ---------- script de page ----------
rep("(() => {\n  document.querySelectorAll('[data-slot]')","(() => {\n  window.NOTTE = true;\n  document.querySelectorAll('[data-slot]')")
sub("  const HANG = [[","  const reduce = matchMedia",r'''  /* orbite : les produits tournent autour du titre, en perspective */
  const ORB = ['prosciutto','burrata','vino','parmigiano','panettone','salame','olio','tagliatelle','espresso','pesto','tiramisu','pecorino'];
  const orbit = document.getElementById('orbit');
  orbit.innerHTML = ORB.map(id => { const p = P.find(x => x.id === id); return `<button type="button" class="orb" data-add="${id}" aria-label="Ajouter ${p.n} au panier"><span class="orb-i">${illus(id)}</span><span class="ptag"><b>${p.n}</b><span>${p.w} · ${eur(p.p)}</span><i>+ Ajouter</i></span></button>`; }).join('');
  const orbs = [...orbit.children];
  const O = {rot:-1.2, boost:0, app:1, slow:1, on:true};
  function place() {
    const w = orbit.clientWidth, h = orbit.clientHeight, mob = innerWidth <= 900;
    const rx = Math.min(w * (mob ? .4 : .46), 680) * O.app, ry = h * (mob ? .3 : .395) * O.app;
    orbs.forEach((el, i) => {
      const a = O.rot + i / orbs.length * Math.PI * 2, sn = Math.sin(a), d = (sn + 1) / 2;
      el.style.transform = `translate(-50%,-50%) translate(${(Math.cos(a) * rx).toFixed(1)}px,${(sn * ry).toFixed(1)}px) scale(${((mob ? .5 : .52) + d * (mob ? .6 : .72)).toFixed(3)})`;
      el.style.zIndex = d > .5 ? 3 : 1; el.style.opacity = (.3 + d * .7).toFixed(2);
    });
  }
  place(); addEventListener('resize', place);
''')
sub("  const cill = document.getElementById('cill');","\n  if (!window.gsap || reduce) return;",r'''  document.querySelectorAll('.rpc').forEach(a => a.addEventListener('click', () => { const b = document.querySelector(`#filters [data-f="${a.dataset.f}"]`); if (b) setTimeout(() => b.click(), 300); }));
''')
sub("  tl.from('.hang',","  document.querySelectorAll('[data-num]')",r'''  O.app = 0; place();
  tl.to(O, {app:1, duration:1.5, ease:'expo.out', onUpdate:place}, '+=.25')
    .from('.orb-i', {scale:0, rotate:() => gsap.utils.random(-140, 140), duration:1.1, stagger:.04, ease:'back.out(1.6)'}, '<')
    .add(() => { O.boost = 5; }, '<')
    .from('.h2-ghost span', {xPercent:12, opacity:0, duration:1.6, ease:'power3.out'}, '<')
    .from('.hero2 h1 .l>span', {yPercent:110, rotate:3, duration:1, stagger:.1}, '<.25')
    .from('.h-in', {y:24, opacity:0, duration:.8, stagger:.08}, '<.25')
    .from('.orb-core', {scale:0, rotate:-120, duration:.9, ease:'back.out(1.6)'}, '<');
  /* rotation continue : ralentit au survol, s'emballe au scroll et quand on balaie la souris */
  const stage = document.querySelector('.h2-stage'), hero = document.getElementById('hero');
  let pmx = null, lastY = scrollY;
  stage.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); hero.style.setProperty('--mx', (e.clientX - r.left) + 'px'); hero.style.setProperty('--my', (e.clientY - r.top) + 'px'); if (pmx != null) O.boost += (e.clientX - pmx) * .004 * (e.clientY > r.top + r.height / 2 ? -1 : 1); pmx = e.clientX; });
  stage.addEventListener('pointerleave', () => pmx = null);
  orbit.addEventListener('pointerover', e => { if (e.target.closest('.orb')) gsap.to(O, {slow:.12, duration:.4}); });
  orbit.addEventListener('pointerout', e => { if (e.target.closest('.orb')) gsap.to(O, {slow:1, duration:.8}); });
  addEventListener('scroll', () => { const dy = scrollY - lastY; lastY = scrollY; O.boost += dy * .004; }, {passive:true});
  new IntersectionObserver(es => O.on = es[0].isIntersecting).observe(stage);
  gsap.ticker.add((t, dt) => { if (!O.on) return; const h = Math.min(dt, 40) / 1000; O.boost *= Math.pow(.05, h); O.boost = Math.max(-9, Math.min(9, O.boost)); O.rot += (.16 * O.slow + O.boost) * h; place(); });
  gsap.to('.orb-core svg', {rotate:360, duration:22, repeat:-1, ease:'none'});
  gsap.to('.h2-ghost span', {xPercent:-18, ease:'none', scrollTrigger:{trigger:'#hero', start:'top top', end:'bottom top', scrub:true}});
  /* curseur : anneau qui suit, grossit sur les liens, affiche + sur les produits */
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const cur = document.getElementById('cur'), lab = cur.querySelector('b');
    const qx = gsap.quickTo(cur, 'x', {duration:.35, ease:'power3'}), qy = gsap.quickTo(cur, 'y', {duration:.35, ease:'power3'});
    addEventListener('pointermove', e => { qx(e.clientX); qy(e.clientY); cur.classList.add('on'); }, {passive:true});
    document.addEventListener('pointerover', e => { const add = e.target.closest('[data-add],[data-ag],.prod'), big = e.target.closest('.rpc,.agt,.ocard'), lk = e.target.closest('a,button'); cur.classList.toggle('add', !!add); cur.classList.toggle('big', !add && !!big); cur.classList.toggle('lk', !add && !big && !!lk); lab.textContent = add ? '+' : big ? 'Voir' : ''; });
    document.documentElement.addEventListener('pointerleave', () => cur.classList.remove('on'));
    /* cartes produit en relief */
    let tc = null;
    document.addEventListener('pointermove', e => { const c = e.target.closest('.prod,.agc'); if (tc && tc !== c) { gsap.to(tc, {rotateX:0, rotateY:0, duration:.7, ease:'power3.out'}); tc = null; } if (!c) return; tc = c; const r = c.getBoundingClientRect(); gsap.to(c, {rotateY:((e.clientX - r.left) / r.width - .5) * 14, rotateX:-((e.clientY - r.top) / r.height - .5) * 10, transformPerspective:900, duration:.4, ease:'power2.out'}); }, {passive:true});
  }
  /* titres : les mots montent un par un */
  const splitW = el => { [...el.childNodes].forEach(n => { if (n.nodeType === 3) { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(w => { if (!w) return; if (/^\s+$/.test(w)) f.appendChild(document.createTextNode(' ')); else { const o = document.createElement('span'); o.className = 'w'; o.innerHTML = '<span></span>'; o.firstChild.textContent = w; f.appendChild(o); } }); n.replaceWith(f); } else if (n.nodeType === 1) splitW(n); }); };
  gsap.utils.toArray('.rp-head h2,.sh h2,.sh h1,.orig h2,.casa h2,.agbox h2,.as-head h2').forEach(h => { splitW(h); gsap.from(h.querySelectorAll('.w>span'), {yPercent:115, rotate:5, duration:1, stagger:.06, ease:'power4.out', scrollTrigger:{trigger:h, start:'top 92%'}}); });
  /* rayons : chaque panneau recule quand le suivant le recouvre, l'illustration tourne */
  const rpc = gsap.utils.toArray('.rpc');
  rpc.forEach((c, i) => {
    gsap.fromTo(c.querySelector('.rpc-ill svg'), {rotate:-28, scale:.8}, {rotate:16, scale:1.08, ease:'none', scrollTrigger:{trigger:c, start:'top bottom', end:'top top', scrub:.5}});
    if (rpc[i + 1]) gsap.to(c, {scale:.93, '--dim':.55, ease:'none', scrollTrigger:{trigger:rpc[i + 1], start:'top 85%', end:'top 15%', scrub:true}});
  });
  const t2 = document.querySelector('.marq2 .track'); if (t2) gsap.fromTo(t2, {xPercent:-50}, {xPercent:0, duration:46, ease:'none', repeat:-1});
''')
i=s.index("  gsap.utils.toArray('.reparti h2"); j=s.index('\n',i); s=s[:i]+s[j+1:]
i=s.index("  gsap.from('.rlist li'"); j=s.index('\n',i); s=s[:i]+s[j+1:]

# ---------- CSS Notte ----------
css=r'''
/* ================= Notte ================= */
body{background:var(--bg)}
.top{background:#06130F;border-bottom:1px solid var(--line)}
header.site{background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.btn{background:#C8202F;color:#FFF8EC}.btn::before{background:#F3EEE2}.btn:hover{color:#0A1F18}
.btn.ghost{background:transparent;color:var(--fg);box-shadow:inset 0 0 0 1px rgba(243,238,226,.55)}
.cartbtn [data-count]{background:#C8202F;color:#fff}
.hero2{position:relative;overflow:hidden;padding-bottom:clamp(40px,5vw,70px);background:radial-gradient(120% 80% at 50% 0%,#12382B 0%,var(--bg) 62%)}
.hero2::before{content:"";position:absolute;inset:0;background:radial-gradient(520px circle at var(--mx,50%) var(--my,36%),rgba(143,209,171,.2),transparent 62%);pointer-events:none}
.h2-ghost{position:absolute;left:0;right:0;top:7%;text-align:center;font-family:var(--display);font-style:italic;font-size:clamp(150px,30vw,470px);line-height:.8;color:transparent;-webkit-text-stroke:1px rgba(243,238,226,.09);white-space:nowrap;pointer-events:none;user-select:none}
.h2-ghost span{display:inline-block}
.h2-stage{position:relative;height:clamp(640px,calc(100vh - 124px),840px);display:grid;place-items:center}
.orbit{position:absolute;inset:0}
.orb{position:absolute;left:50%;top:50%;width:clamp(96px,10.5vw,150px);padding:0;will-change:transform,opacity}
.orb-i{display:block;position:relative}
.orb-i svg{transition:transform .5s cubic-bezier(.3,1.6,.5,1)}
.orb-i svg{width:100%;height:auto;display:block}
.orb-i::after{content:"";position:absolute;left:14%;right:14%;bottom:-6%;height:14%;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.5),transparent);z-index:-1}
.orb-i svg>ellipse:first-child{display:none}
.orb:hover .orb-i svg,.orb:focus-visible .orb-i svg{transform:scale(1.18) rotate(-8deg)}
.orb .ptag{top:calc(100% + 2px)}
@media(hover:hover){.orb:hover .ptag,.orb:focus-visible .ptag{opacity:1;transform:translate(-50%,0)}}
.orb-core{display:none}
.hero2 .hero-txt{position:relative;z-index:2;margin-top:0;pointer-events:none}
.hero2 .hero-txt a{pointer-events:auto}
.hero2 h1{font-family:var(--display);font-weight:500;font-size:clamp(42px,6.6vw,104px);line-height:.96;letter-spacing:-.015em;margin:18px 0 0;text-shadow:0 2px 40px rgba(10,31,24,.9)}
.hero2 h1 .l{display:block;overflow:hidden;padding-bottom:.1em}.hero2 h1 .l>span{display:inline-block}
.hero2 h1 em{font-style:italic;color:#F2C230;font-weight:400}
.hero2 .eyebrow{color:#F2C230}
.hero2 .lead{opacity:.9;text-shadow:0 1px 24px rgba(10,31,24,.95)}
.how{position:relative;z-index:2;background:var(--paper)}
.how small,.how a.how-ag b,.how a.how-ag small{color:#F2C230}
.marq{background:#C8202F;color:#FFF8EC;border:0}
.marq2{background:transparent;color:transparent;padding:14px 0}
.marq2 .track{-webkit-text-stroke:1px rgba(243,238,226,.5);font-style:normal;font-size:clamp(30px,4vw,56px)}
.marq2 .track span::after{background:#F2C230}
.w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.14em;margin-bottom:-.14em}.w>span{display:inline-block;transform-origin:0 100%}
.rp{padding:clamp(60px,8vw,110px) 0 clamp(70px,9vw,130px)}
.rp-head{margin-bottom:34px}
.rp-head h2,.sh h2,.orig h2,.casa h2{font-family:var(--display);font-weight:400;font-size:clamp(40px,5vw,72px);line-height:.98;margin:12px 0 0;letter-spacing:-.01em}
.rpc{position:sticky;top:calc(96px + var(--i)*12px);display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:clamp(18px,4vw,60px);height:min(64vh,520px);margin-bottom:22px;padding:clamp(22px,4vw,56px);background:var(--c);color:var(--t);border-radius:26px;text-decoration:none;overflow:hidden;transform-origin:50% 0;box-shadow:0 -24px 50px -26px rgba(0,0,0,.7);will-change:transform}

.rpc::after{content:"";position:absolute;inset:0;background:#06130F;opacity:var(--dim,0);pointer-events:none}
.rpc-n{font-family:var(--display);font-style:italic;font-size:clamp(70px,12vw,190px);line-height:.8;color:transparent;-webkit-text-stroke:1.5px var(--k);align-self:start}
.rpc-b{display:grid;gap:14px;align-content:center;justify-items:start}
.rpc-t{font-family:var(--display);font-weight:500;font-size:clamp(44px,7vw,112px);line-height:.9;letter-spacing:-.02em}
.rpc-t em{display:block;font-size:.3em;font-weight:400;color:var(--k);letter-spacing:0;margin-top:.35em}
.rpc-c{max-width:38ch;font-size:clamp(15px,1.3vw,18px);line-height:1.45;opacity:.85}
.rpc-go{display:inline-flex;gap:10px;align-items:center;font-size:12.5px;letter-spacing:.18em;text-transform:uppercase;padding:14px 22px;background:var(--k);color:var(--c);margin-top:6px;transition:gap .35s}
.rpc:hover .rpc-go{gap:20px}
.rpc-ill{width:clamp(180px,30vw,430px);margin-right:-3vw}
.rpc-ill svg{width:100%;height:auto;display:block;transition:translate .6s cubic-bezier(.2,.8,.2,1)}
.rpc:hover .rpc-ill svg{translate:-14px -10px}
.rpc-ill svg>ellipse:first-child{display:none}
.prod,.agc{transform-style:preserve-3d;will-change:transform}
.prod-img{border-radius:999px 999px 0 0}
.agc{background:var(--paper)}
#pt{background:#F3EEE2}#pt .pt-col{display:none}.pt-txt{color:#0A1F18}
#pt[data-to="anti-gaspi"]{background:#C8202F}#pt[data-to="anti-gaspi"] .pt-txt{color:#FFF8EC}
.cur{position:fixed;left:0;top:0;z-index:99;pointer-events:none;width:0;height:0;opacity:0;transition:opacity .3s}
.cur.on{opacity:1}
.cur i{position:absolute;left:-17px;top:-17px;width:34px;height:34px;border-radius:50%;border:1.5px solid #F2C230;transition:transform .35s cubic-bezier(.3,1.4,.5,1),background .3s,border-color .3s}
.cur b{position:absolute;left:-40px;top:-11px;width:80px;text-align:center;font-family:var(--display);font-style:italic;font-weight:500;font-size:19px;line-height:22px;color:#0A1F18;opacity:0;transition:opacity .2s}
.cur.lk i{transform:scale(1.5);background:rgba(242,194,48,.18)}
.cur.add i{transform:scale(1.9);background:#F2C230}.cur.add b{opacity:1;font-size:30px;font-style:normal}
.cur.big i{transform:scale(2.5);background:#F2C230}.cur.big b{opacity:1}
@media(hover:none),(pointer:coarse){.cur{display:none}}
.tabs{background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.tabs a.ag{color:#F2C230}
@media(max-width:900px){
.h2-stage{height:auto;display:block}
.orbit{position:relative;inset:auto;width:100%;height:300px;justify-self:stretch}
.orb{width:92px}
.orb-core{display:grid;place-items:center;position:absolute;left:50%;top:150px;width:112px;height:112px;margin:-56px 0 0 -56px;color:#F2C230;z-index:2}
.orb-core svg{position:absolute;inset:0;width:100%;height:100%}
.orb-core b{font-family:var(--display);font-style:italic;font-weight:500;font-size:40px;color:#F3EEE2}
.h2-ghost{top:60px;font-size:54vw}
.hero2 .hero-txt{padding-top:6px}
.rpc{top:calc(74px + var(--i)*8px);grid-template-columns:1fr;grid-template-rows:auto 1fr;align-items:start;height:min(66vh,500px);border-radius:20px;padding:22px 20px;gap:6px}
.rpc-n{position:absolute;right:16px;top:18px;font-size:44px;-webkit-text-stroke-width:1px}
.rpc-t{font-size:clamp(36px,11vw,52px);padding-right:52px}
.rpc-ill{position:absolute;right:-30px;bottom:-34px;width:58vw;margin:0}
.rpc-c{max-width:26ch;font-size:15px}
.rpc-b{gap:10px}
}
'''
i=s.index('</style>'); s=s[:i]+css+s[i:]
open(D+'5-notte.html','w').write(s)

# ---------- transition circulaire dans pages.js (une seule fois) ----------
j=open(D+'pages.js').read()
if 'window.NOTTE' not in j:
    a="    busy = true;\n"
    assert a in j
    j=j.replace(a,"    busy = true;\n    pt.dataset.to = name;\n    if (window.NOTTE) { q('.pt-it', pt).textContent = TITLES[name][0]; q('.pt-fr', pt).textContent = TITLES[name][1]; pt.hidden = false; const x = lx == null ? innerWidth / 2 : lx, y = ly == null ? innerHeight / 2 : ly, R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 40, R2 = Math.hypot(innerWidth, innerHeight) / 2 + 40;\n      G.timeline({onComplete:() => { pt.hidden = true; busy = false; G.set(pt, {clearProps:'clipPath'}); G.set('.pt-txt', {clearProps:'all'}); }})\n        .fromTo(pt, {clipPath:`circle(0px at ${x}px ${y}px)`}, {clipPath:`circle(${R}px at ${x}px ${y}px)`, duration:.55, ease:'power3.inOut'})\n        .fromTo('.pt-it', {yPercent:110}, {yPercent:0, duration:.4, ease:'power4.out'}, '-=.25')\n        .fromTo('.pt-fr,.pt-rule i', {opacity:0, scaleX:0}, {opacity:1, scaleX:1, duration:.3, stagger:.04}, '<.05')\n        .add(() => show(name, target))\n        .set(pt, {clipPath:`circle(${R2}px at ${innerWidth / 2}px ${innerHeight / 2}px)`})\n        .to('.pt-txt', {scale:1.12, opacity:0, duration:.3, ease:'power2.in'}, '+=.14')\n        .to(pt, {clipPath:`circle(0px at ${innerWidth / 2}px ${innerHeight / 2}px)`, duration:.55, ease:'power3.inOut'}, '<.08');\n      return; }\n",1)
    a="  const pt = q('#pt');"
    assert a in j
    j=j.replace(a,"  const pt = q('#pt'); let lx = null, ly = null;\n  document.addEventListener('click', e => { lx = e.clientX; ly = e.clientY; }, true);",1)
    open(D+'pages.js','w').write(j)
print('notte ok')
