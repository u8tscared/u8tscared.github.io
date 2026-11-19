# Enveloppe un artefact (out/*.html) en page HTML autonome. Usage : export_site.py <source> <cible> <titre>
import sys,os,re
src,dst,title=sys.argv[1:4]
s=open(src).read()
s=re.sub(r'<title>.*?</title>','<title>'+title+'</title>',s,1)
j=s.index('<div class="top">')
head='<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="description" content="Casa Innocenti, épicerie fine italienne à Saint-Priest : boutique en ligne, à emporter, anti-gaspi. Maquette de démonstration.">\n<meta name="robots" content="noindex">\n'
os.makedirs(os.path.dirname(dst),exist_ok=True)
open(dst,'w').write(head+s[:j]+'</head>\n<body>\n'+s[j:]+'\n</body>\n</html>\n')
