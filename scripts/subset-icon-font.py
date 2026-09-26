"""Material Symbols ikon fontunu yalnızca sitede kullanılan ikonlara indirger.

Kullanım (genellikle `npm run icons:subset` ile):
    python scripts/subset-icon-font.py <kaynak.woff2> <ikon-listesi.txt> <hedef.woff2> [manifest.json]

Font ligatür ile çalışır ("home" yazısı ev ikonuna dönüşür). Harf glifleri ve
seçilen ikonların ligatür glifleri tutulur; diğer ligatürler atılır.
Tam font scripts/fonts/ altında saklanır ve yayına çıkmaz; yayındaki
public/fonts/material-symbols.woff2 bu betiğin çıktısıdır.
"""
import sys
from fontTools.ttLib import TTFont
from fontTools import subset

src, names_file, dst = sys.argv[1:4]
names = [n.strip() for n in open(names_file, encoding='utf-8') if n.strip()]

font = TTFont(src)
cmap = font.getBestCmap()
gsub = font['GSUB'].table

# Ligatür tablosu: ilk karakter glifi -> [(bileşen glifleri, çıktı glifi)]
ligs = {}
for lookup in gsub.LookupList.Lookup:
    for st in lookup.SubTable:
        st = st.ExtSubTable if lookup.LookupType == 7 else st
        for first, entries in getattr(st, 'ligatures', {}).items():
            for lig in entries:
                ligs.setdefault(first, []).append((tuple(lig.Component), lig.LigGlyph))

keep, missing = set(), []
for name in names:
    try:
        glyphs = [font.getBestCmap()[ord(c)] for c in name]
    except KeyError:
        missing.append(name)
        continue
    found = next((out for comps, out in ligs.get(glyphs[0], []) if list(comps) == glyphs[1:]), None)
    if found:
        keep.add(found)
    else:
        missing.append(name)

# Ligatürü oluşturan karakterler (a-z, 0-9, _) ve boşluk korunur.
chars = set('abcdefghijklmnopqrstuvwxyz0123456789_ ')
keep |= {cmap[ord(c)] for c in chars if ord(c) in cmap}

opts = subset.Options()
opts.flavor = 'woff2'
opts.layout_features = ['rlig', 'liga']
opts.layout_closure = False  # yalnızca seçilen ligatür gliflerini tut
opts.notdef_outline = True
opts.name_IDs = ['*']
sub = subset.Subsetter(opts)
sub.populate(glyphs=sorted(keep), unicodes=[ord(c) for c in chars])
sub.subset(font)
font.flavor = 'woff2'
font.save(dst)

if len(sys.argv) > 4:
    import json
    matched = sorted(set(names) - set(missing))
    with open(sys.argv[4], 'w', encoding='utf-8') as fh:
        json.dump(matched, fh, ensure_ascii=False, indent=0)

print(f'{len(names)} ad, {len(names) - len(missing)} ikon eşleşti, {len(font.getGlyphOrder())} glif')
if missing:
    print('Fontta ligatürü olmayan adlar (ikon olarak değil düz yazı olarak görünür):', ', '.join(missing))
