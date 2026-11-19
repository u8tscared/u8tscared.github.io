import base64,re,os,glob,json,html
D=os.path.dirname(os.path.abspath(__file__))+'/'
css=open(D+'da/common.css').read(); js=open(D+'da/illus.js').read()+'\n'+open(D+'da/common.js').read(); cart=open(D+'da/cart.html').read()
COL={'board':'#8a5a3c','prosciutto':'#c4706a','burrata':'#e9e4d8','parmigiano':'#d9b56a','tagliatelle':'#e8c97a','salame':'#8c3b35','tortellini':'#e2c48a','olio':'#7d8a3a','panettone':'#c9924a','pecorino':'#e6dcc2','pesto':'#4f7a3a','vino':'#5a1f2a','espresso':'#4a3226','tiramisu':'#9b7356','pizza':'#c8553d','pasta':'#d9a441','bruschetta':'#b8452e','shop':'#6b7a5e','table':'#a4483a','lemon':'#e8c547'}
NAMES={'prosciutto':'Prosciutto','burrata':'Burrata','parmigiano':'Parmigiano','tagliatelle':'Tagliatelle','salame':'Salame','tortellini':'Tortellini','olio':'Olio','panettone':'Panettone','pecorino':'Pecorino','pesto':'Pesto','vino':'Chianti','espresso':'Caffè','tiramisu':'Tiramisù'}
ALIAS={'board':'plateau'}
def uri(k):
    k0=k; k=ALIAS.get(k,k)
    for ext in ('webp','jpg','png'):
        p=D+'img/'+k+'.'+ext
        if os.path.exists(p): return 'data:image/%s;base64,'%('jpeg' if ext=='jpg' else ext)+base64.b64encode(open(p,'rb').read()).decode()
    k=k0; c=COL.get(k,'#999'); name=NAMES.get(k,k); r,g,b=(int(c[i:i+2],16) for i in (1,3,5)); tc='#3a2a20' if (0.299*r+0.587*g+0.114*b)>170 else '#fff'
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="{c}"/><circle cx="200" cy="230" r="120" fill="rgba(255,255,255,.12)"/><text x="200" y="245" font-family="Georgia,serif" font-style="italic" font-size="34" fill="{tc}" text-anchor="middle">{name}</text><text x="200" y="430" font-family="Helvetica,Arial,sans-serif" font-size="12" letter-spacing="3" fill="{tc}" opacity=".6" text-anchor="middle">PHOTO PRODUIT À VENIR</text></svg>'
    return 'data:image/svg+xml;base64,'+base64.b64encode(svg.encode()).decode()
LOGO='<a class="ci" href="#" aria-label="Casa Innocenti, accueil"><span class="ci-n">CASA<br>INNOCENTI</span><span class="ci-l"><i></i><i></i></span><span class="ci-t">EPICERIE FINE ITALIENNE</span></a>'
ids=re.findall(r"\{id:'([a-z]+)'",js)
os.makedirs(D+'out',exist_ok=True)
for f in sorted(glob.glob(D+'da/[0-9]-*.html')):
    s=open(f).read()
    keys=set(re.findall(r'\{\{img:([a-z_]+)\}\}',s))
    cache={k:uri(k) for k in keys|set(ids)}
    for k in keys: s=s.replace('{{img:%s}}'%k,cache[k])
    s=s.replace('{{LOGO}}',LOGO).replace('<style>','<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap">\n<style>',1)
    s=re.sub(r'\{\{INCLUDE:([\w.-]+)\}\}',lambda m:open(D+'da/'+m.group(1)).read(),s)
    s=s.replace('{{COMMON_CSS}}',css).replace('{{CART}}',cart+'<script>window.__IMG='+json.dumps({k:cache[k] for k in ids})+';</script><script>'+js+'</script>')
    out=D+'out/'+os.path.basename(f)
    open(out,'w').write(s); print(os.path.basename(f),round(len(s)/1e6,2),'MB')
