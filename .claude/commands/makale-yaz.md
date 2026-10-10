# /makale-yaz

Use this command for every article-writing task in tupbebek.com.

1. Read `D:\A-klasör\obsidian-vaults\draksoyivf-knowledge\wiki\brand\senai-aksoy-makale-stil-rehberi.md`.
2. Before drafting, reply exactly: `Stil rehberi okundu: Dr. Senai Aksoy Makale Stil Rehberi`.
3. Read `CLAUDE.md`, `AGENTS.md`, and the closest existing article/template.
4. Write in sade Türkçe with BLUF structure and a clear `Kısa cevap:` where appropriate.
5. Keep Dr. Aksoy’s calm, explanatory, patient-friendly medical voice.
6. Do not use promotional language, success guarantees, “mucize”, “kesin çözüm”, or “en iyi”.
7. Include evidence and a measured disclaimer when medical claims need context. Give the plain-language conclusion in the main text; put study-by-study detail and interpretation in a `<Accordion title="Kanıt kutusu: …">` at the end of the section, keeping at least one source next to each key claim (AGENTS.md "Okunabilirlik ve kanıt kutusu").
8. Run `npm run verify:readability -- <slug>` and resolve its warnings (target 8–10. sınıf; özet ve gövde nötr Bezirci–Yılmaz ≤ 12) or state why a warning stays; report the scores at handoff.
9. Before handoff, human-check the title, `seoTitle`, `description`, image alt text and structured data, not only the body; mark every AI image (`imageSourceType: "ai-assisted"` for the cover, `npm run images:tag-ai -- <file>` for every AI file) and never tag real photos. See the style guide section "Google Arama Güncellemeleri Kaydı (2026)".
10. If the style guide cannot be read, stop and report the blocker.
