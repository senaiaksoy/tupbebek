# Menü sadeleştirme — 26 Eylül 2026

Başlangıç: PR #187 sonrası `main`, `1725ea58e615d2b9f2a04c803e2c35ad98e5005d`. Aşama 1 bulgusu #17 ve kalan üç menü tekrarı ele alındı.

## Değişiklikler

| Önce | Sonra |
|---|---|
| İnfertilite 101 | Kısırlık Rehberi |
| Kadın / Erkek / Açıklanamayan İnfertilite | Kadınlarda / Erkeklerde / Açıklanamayan Kısırlık |
| Yaş ve Fertilite | Yaş ve Doğurganlık |
| IVF Protokolleri | Tüp Bebek Protokolleri |
| Fertilite Koruma | Doğurganlığı Koruma |
| Kanun, Maliyet ve Haklar | SGK ve Hasta Hakları |
| İmzalı Perspektif, birinci tekil ses, add-on testler | Baş Editörün Yazıları; araştırmalar, ek testler ve tedavi seçenekleri üzerine değerlendirmeler |

Üst menü ve mobil akordeon aynı merkezi veriyi kullanıyor. İlgili footer etiketleri de eşitlendi. Hastalık ve yöntem adlarının tamamı yeniden yazılmadı; ilk yön bulma etiketleri sadeleştirildi.

- Doğurganlığı Koruma: cerrahi ve yaşam tarzı menülerindeki iki çağrı yerine Tedavi Yöntemleri altında bir çağrı.
- Başarı Oranları: SGK/haklar grubundan kaldırıldı; Tedavi Yöntemleri altında korundu.
- Editöryal Politika: SGK/haklar grubundan kaldırıldı; Baş Editör Köşesi altında korundu.
- Hakkımızda: SGK/haklar grubundan Baş Editör Köşesi altına taşındı.
- Alt menüdeki 59 bağlantı 56'ya indi. 56 farklı hedefin tamamı korunuyor. Menü kimlikleri, üst hedefler, featured bağlantıları ve footer hedefleri aynı.

Tarayıcı kontrolünde Tedavi Yöntemleri panelinin 720 px yüksekliğindeki ekranda 1486,7 px alt sınıra kadar uzandığı ve `overflow-y: visible` kullandığı görüldü. Panele `max-height: calc(100dvh - 80px)`, dikey kaydırma ve overscroll sınırı eklendi. Son bağlantı klavye odağı aldığında panel içinde görünür oluyor. Mobil panelin mevcut kaydırma davranışı değiştirilmedi.

## Doğrulama

- Son `npm run build`: çıkış 0; içerik kalitesi 0 hata, 7 uyarı (önce 10). Kalan yedi metin eşleşmesinin bağlamı önceki video bakım raporunda kayıtlı. Koruma betiği değiştirilmedi.
- Son `npm run verify:preflight`: 25/25, çıkış 0.
- 99 sayfanın URL, title, H1, canonical ve bütün JSON-LD verileri aynı.
- 63 makalenin kaynak dosyaları başlangıç commit'iyle aynı. Bu işte yeni klinik metin, hekim yanıtı, inceleme tarihi veya hukuki/SGK bilgi güncellemesi yok.
- 59 farklı üst/alt/featured hedef ve varsa fragment karşılıkları build çıktısında mevcut. Alt menü tekilleşti; başka navigation export'ları aynı.
- Masaüstü: Enter ile menü açılıyor; Tab ile 18. ve son tedavi bağlantısına ulaşılınca bağlantı 651,8–719,4 px arasında, 720 px ekran içinde. Escape paneli kapatıp odağı düğmeye döndürüyor.
- Mobil: 390 px genişlikte menü/akordeon açılıp kapanıyor; yeni etiketler ve SGK/editör grupları doğru. `scrollWidth = clientWidth = 382`.
- 1024 px masaüstü kırılımında `scrollWidth = clientWidth = 1016`; yatay taşma yok. Ortak menü ayrıca PCOS makalesinde açılarak kontrol edildi.
- Makine kaydı: [MENU-BAKIM-KANIT.json](MENU-BAKIM-KANIT.json). Yerel UI kayıtları ve ekranlar `.tmp/menu-*` içinde.

## Kapsam ve yayın kapısı

Kaynak değişikliği yalnızca `src/data/navigation.ts` ve `src/components/header/MegaMenuItem.astro` içindedir. Görseller, ana sayfa bölüm düzeni, makale şablonu ve tıbbi makale dosyaları değişmedi. Baş Editör sayfasının kendi “İmzalı Perspektif” metni bu menü bakımının dışında kaldı.

Görünür menü etiketleriyle birlikte Analytics `nav_section` / `nav_label` değerleri de yeni metinleri taşır. Hedef URL ve `nav_location` aynı; etiket bazında eski/yeni dönemi karşılaştırırken bu isim değişikliği dikkate alınmalıdır.

Bu PR için açık birleştirme/yayın onayı beklenir; `main` birleştirmesi otomatik yayındır. Onay sonrası üretim commit'i ve cache bypass ile canlı menü/etiket/şema doğrulaması yapılmalıdır.
