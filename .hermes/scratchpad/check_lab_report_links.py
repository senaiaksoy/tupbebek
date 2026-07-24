# -*- coding: utf-8 -*-
import re
import ssl
import sys
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError

sys.stdout.reconfigure(encoding="utf-8")
t = Path(r"D:/A-klasör/tupbebek/src/content/articles/laboratuvar-raporu-yorumlama.mdx").read_text(encoding="utf-8")
urls = sorted(set(re.findall(r"https://[^\s)\"']+", t)))
print("urls", len(urls))
for u in urls:
    try:
        req = Request(u, headers={"User-Agent": "Mozilla/5.0"}, method="GET")
        with urlopen(req, context=ssl.create_default_context(), timeout=20) as r:
            print("OK", r.status, u[:100])
    except HTTPError as e:
        print("FAIL", e.code, u[:100])
    except Exception as e:
        print("ERR", type(e).__name__, u[:80])

for p in sorted(set(re.findall(r"\]\((/[^)]+)\)", t))):
    if p.startswith("/makaleler/"):
        slug = p.strip("/").split("/")[-1]
        exists = any(
            Path(rf"D:/A-klasör/tupbebek/src/content/articles/{slug}{ext}").exists()
            for ext in (".mdx", ".md")
        )
        print(("OK" if exists else "MISS"), p)
    else:
        print("OTHER", p)
