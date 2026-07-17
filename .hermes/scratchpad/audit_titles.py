#!/usr/bin/env python3
"""
Audit tupbebek articles for SEO title/description length issues.
Checks frontmatter title, seoTitle, description against character budgets.
"""

import os
import re
import yaml
import json
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import Optional, List, Dict, Any

ARTICLES_DIR = Path('/mnt/d/A-klasör/tupbebek/src/content/articles')

# SEO budgets (Google SERP guidelines)
TITLE_MAX = 60
DESC_MAX = 160

@dataclass
class ArticleAudit:
    slug: str
    filepath: str
    title: str
    seoTitle: Optional[str]
    description: str
    title_len: int
    seoTitle_len: int
    desc_len: int
    title_flag: bool
    seoTitle_flag: bool
    desc_flag: bool
    needs_fix: bool

def parse_frontmatter(filepath: Path) -> Dict[str, Any]:
    """Parse YAML frontmatter from MDX file."""
    content = filepath.read_text(encoding='utf-8')
    if not content.startswith('---'):
        return {}
    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}
    try:
        return yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError:
        return {}

def audit_article(filepath: Path) -> ArticleAudit:
    fm = parse_frontmatter(filepath)
    slug = filepath.stem.replace('.mdx', '')
    
    title = fm.get('title', '') or ''
    seoTitle = fm.get('seoTitle')
    description = fm.get('description', '') or ''
    
    # Clean up quotes
    title = title.strip().strip('"\'')
    if seoTitle:
        seoTitle = seoTitle.strip().strip('"\'')
    description = description.strip().strip('"\'')
    
    # Use seoTitle for title check if present, else title
    effective_title = seoTitle if seoTitle else title
    
    title_len = len(effective_title)
    seoTitle_len = len(seoTitle) if seoTitle else 0
    desc_len = len(description)
    
    title_flag = title_len > TITLE_MAX
    seoTitle_flag = seoTitle_len > TITLE_MAX if seoTitle else False
    desc_flag = desc_len > DESC_MAX
    
    return ArticleAudit(
        slug=slug,
        filepath=str(filepath),
        title=title,
        seoTitle=seoTitle,
        description=description,
        title_len=title_len,
        seoTitle_len=seoTitle_len,
        desc_len=desc_len,
        title_flag=title_flag,
        seoTitle_flag=seoTitle_flag,
        desc_flag=desc_flag,
        needs_fix=title_flag or seoTitle_flag or desc_flag
    )

def main():
    if not ARTICLES_DIR.exists():
        print(f"Directory not found: {ARTICLES_DIR}")
        return
    
    articles = []
    for filepath in ARTICLES_DIR.glob('*.mdx'):
        audit = audit_article(filepath)
        articles.append(audit)
    
    # Sort by severity (flagged first, then by length)
    articles.sort(key=lambda x: (not x.needs_fix, -x.title_len, -x.desc_len))
    
    # Summary
    total = len(articles)
    flagged = [a for a in articles if a.needs_fix]
    title_flagged = [a for a in articles if a.title_flag or a.seoTitle_flag]
    desc_flagged = [a for a in articles if a.desc_flag]
    
    print(f"Total articles: {total}")
    print(f"Flagged (title or desc): {len(flagged)}")
    print(f"  Title flagged: {len(title_flagged)}")
    print(f"  Desc flagged: {len(desc_flagged)}")
    print()
    
    print("=== FLAGGED ARTICLES ===")
    for i, a in enumerate(flagged, 1):
        flags = []
        if a.title_flag or a.seoTitle_flag:
            which = 'seoTitle' if a.seoTitle_flag else 'title'
            flags.append(f"{which.upper()}({a.title_len if not a.seoTitle_flag else a.seoTitle_len} chars)")
        if a.desc_flag:
            flags.append(f"DESC({a.desc_len} chars)")
        print(f"  {i:2d}. {a.slug:<50} | {' + '.join(flags)}")
    
    # Output JSON for cross-reference
    output = {
        'total': total,
        'flagged': len(flagged),
        'articles': [asdict(a) for a in articles]
    }
    
    out_path = Path('/mnt/d/A-klasör/tupbebek/.hermes/scratchpad/audit_results.json')
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(output, ensure_ascii=False, indent=2))
    print(f"\nResults written to {out_path}")

if __name__ == '__main__':
    main()