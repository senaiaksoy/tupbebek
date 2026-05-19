# SEO Baselines

Bu klasör SEO drift tespiti için kaydedilen baseline snapshot'larını saklar.

## Format

Her baseline dosyası `baseline-YYYY-MM-DD.json` adıyla saklanır.
İçeriği:

- `capturedAt`: ISO timestamp
- `context`: Snapshot'ın hangi commit/değişiklik bağlamında alındığı
- `urls[]`: Her URL için
  - HTTP status
  - title, description, canonical, robots
  - Open Graph (title, description, image, type)
  - h1 array, h2/h3 count
  - img/figure count
  - JSON-LD script count
  - HTML size + SHA-256 hash (kısaltılmış)

## Kullanım

Yeni baseline almak için:
```
node scripts/_seo-baseline.mjs
```

Karşılaştırma için (ileride): mevcut baseline dosyasıyla yeni snapshot diff'lenir.

## Karar matrisi

Hash değişti ama title/canonical/og değişmediyse → içerik güncellemesi (büyük olasılıkla iyi).
Title veya canonical değiştiyse → uyarı, manuel inceleme.
Status 200 değilse → kritik regresyon.
H1/h2 count belirgin düştü → içerik yapısı bozulmuş olabilir.
imgCount belirgin düştü → görsel eksikliği.

## Geçmiş

| Tarih | Bağlam | URL sayısı |
|---|---|---|
| 2026-05-19 | Post-imagery-overhaul + drafts cleanup + medical-reviewer schema change (commit 7ac85de7+). Production hâlâ eski deploy'daydı; pre-change reference baseline. | 8 |
