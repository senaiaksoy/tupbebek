# P0 yayın öncesi kontrol — 26 Eylül 2026

Kullanıcı, PR #179 hazırlandıktan sonra “onay” diyerek yayına izin verdi.

PR hazırlanmasından sonra main'e #176–178 üzerinden uzman katkısı, kaynak kimliği ve inceleme tarihi düzeltmeleri gelmişti. `f2ebec0b` main sürümü yayın branch'ine birleştirildi. İki çakışma (`tup-bebek-nedir`, `varikosel-nedir-ne-zaman-ameliyat-gerekir`) standart inceleyen adı/rolü ve main'in güncel `reviewDate: 2026-09-25` alanı korunarak çözüldü.

- 63 makale son main ile karşılaştırıldı: P0 inceleyen/görsel metadata alanları dışında klinik metin, kaynaklar, tarihler ve `expertContribution` aynen korundu.
- 63 makalede inceleyen standardı doğrulandı.
- Birleşmiş kaynakla `npm run build`: exit 0; 63 makale Pagefind indeksinde.
- `npm run verify:preflight`: exit 0; yeni PMID kontrolü dahil 24/24 geçti.
- `git diff --cached --check`: geçti; çakışma işareti kalmadı.
- Yerel yayın worktree'si kullanıldı; ana workspace'teki `.claude` ayarları, önceki audit raporu ve scratch betikleri bu commit'e alınmadı.

Bu kayıt yayın öncesi kanıttır. Production deployment kimliği, kaynak commit'i ve cache-bypass custom-domain HTML/görsel eşleşmeleri deploy sonrasında ayrıca doğrulanır. P1 bu yayının kapsamına dahil değildir.
