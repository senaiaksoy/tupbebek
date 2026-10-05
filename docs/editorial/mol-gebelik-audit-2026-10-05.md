# Mol gebelik — geniş audit ve düzeltme, 5 Ekim 2026

## Yetki ve sürüm

Kullanıcı isteği: "mol gebelik yazısını tekrar geniş audit yap", ardından "devam et". Taban: `origin/main` `40ebd6c7` (yazı #295 ile yayımlandı, #296 ile 2025 kılavuzlarına hizalandı). Düzeltmeler `content/mol-gebelik-audit` dalında; Dr. Aksoy'un onayı alınana kadar commit edilmez. Hekim metinlerinde (uzman kutusu) yalnızca Dr. Aksoy'un onayladığı üç dil düzeltmesi yapıldı; SSS yanıtları değişmedi.

## Yöntem

- İddia–kaynak: makaleyi yazmamış iki bağımsız alt ajan; biri her sayısal iddia ve atfı, diğeri popülasyon, iç tutarlılık, mantık, hekim metni ve portal kurallarını denetledi. Bulgular ayrıca tam metinlerden yeniden doğrulandı: FIGO 2025 (Ngan, PMID 40631439, açık erişim), FIGO 2026 (Ngan, PMID 42473063, açık erişim), EOTTD–ESGO–GCIG–ISSTD 2025 (Lok, PMID 40359461; yazar sürümü PDF, ORBi), RCOG Green-top 38 (Wiley açık erişim), Swift 2025 (PMC12041671), Bolze 2016 ve Bambaranda 2022 özetleri.
- Dil: senai-humanize `editorial-check.mjs --locale tr` (0 aday; anlam tekrarını görmez) + elle okuma (anlam tekrarı, kalıp sıklığı, uzun cümleler).
- Teknik: canlı HTML (başlık, meta açıklama, canonical, robots, JSON-LD `about`/breadcrumb/citation, H1), Search Console URL Inspection.

## Bulgular (düzeltme öncesi)

| # | Bulgu | Tür | Karar |
|---|---|---|---|
| 1 | Vakum bölümündeki "ileri gebelik haftasında rahim büyüklüğü ve anne riskleri işlemi belirler" cümlesi EOTTD 2025'te yalnızca komplet mol + normal ikiz gebeliğin sonlandırılması bağlamında | Bağlam dışı atıf | Çıkarıldı; "işlem öncesi kan hazır bulundurulur" (Lok) ile değiştirildi |
| 2 | Profilaktik kemoterapide "%3-8 azaltır": FIGO 2021 "%3-8'e indirir", FIGO 2025 "%3-8 azalma" diyor; Cochrane sonucu ("şu an önerilemez") yumuşatılmıştı | Rakam / aktarım | Rakam çıkarıldı; Cochrane sonucu aynen verildi |
| 3 | "Daha önceki kılavuzların akış şemaları" çoğulu kaynaksız; yalnızca EOTTD 2025 Şekil 2 kısa ölçüt kullanıyor | Atıf | Lok 2025'e bağlandı |
| 4 | Komplet mol sonrası GTN %15-20 (FIGO 2021); FIGO 2025 %13-20, FIGO 2026 %10-20 | Güncellik | Özet, tablo ve gövde FIGO 2025'e göre %13-20 |
| 5 | Sıklık "1.000 gebelikte 0,6-2" FIGO 2021'den; FIGO 2025 ülkeler arası aralık veriyor (ABD <1, Endonezya 11,5/1.000 doğum) | Güncellik | Güncellendi |
| 6 | Genotipleme Soper'a atfedilmişti; Soper metninde yok | Atıf | FIGO 2021 + Lok 2025 |
| 7 | Swift 2025 çerçevesinde geç risk gizlenmişti: normalleşme sonrası GTN gelişen 31 kadının 22'si (%71) 6 aylık takipten sonra tanı aldı | Eksik sınırlılık | Eklendi |
| 8 | Rahim büyümesi ve yumurtalık kistleri FIGO 2021'e atfedilmişti; listede yalnızca hiperemezis, preeklampsi, hipertiroidi var | Atıf | RCOG 2020 eklendi |
| 9 | RCOG 2020 "eski kılavuz" diye sunulmuştu; İngiltere'de geçerli. 72 saat istisnası eksikti | Aktarım | "Bazı ulusal kılavuzlar" + 72 saat |
| 10 | Doğurganlık: "tek ilaç etkilemez" (FIGO 2021 ilaç sayısı ayırmıyor) ve ESMO 2013 "~3 yıl" | Atıf / güncellik | RCOG 2020: gebelik olasılığı her iki tedavide ~%83; kombinasyonda erken menopoz 40 yaşa kadar %13, 45 yaşa kadar %36 |
| 11 | İkiz gebelikte komplet mol sıklığı Soper'dan (komplet+parsiyel birlikte) | Atıf | Lok 2025: 1:20.000-100.000 |
| 12 | Beslenme cümlesi: ESMO bunu yalnızca bölgesel sıklık farkı için söylüyor | Bağlam | Çıkarıldı |
| 13 | Düşük riskli GTN "tek ilaçla kür ~%100": direnç ve ikinci tedavi ihtiyacı görünmüyordu | Eksik | FIGO 2025: skor 5-6'da direnç daha sık, bir kısmında ikinci tedavi; kür ~%100 |
| 14 | Ölüm oranı (%2) popülasyonu belirsiz; mol hastalarına genellenebiliyordu | Popülasyon | Bolze: 974 GTN hastası (PSTT/ETT hariç); ölümlerin %52'si FIGO ≥13 alt grubunda; "mol hastalarının tümünü kapsamaz" |
| 15 | hCG sıklığı iki ayrı paragrafta; plato ölçütü haftalık ölçüme dayandığı hâlde iki haftalık izlem anlatılıyordu | İç tutarlılık | FIGO 2025: düşüş durursa/yükselirse sonraki ölçüm 1 hafta sonra; aynı laboratuvar ve test (Lok) |
| 16 | Takipte gebelik olursa ve takip bitince ne olacağı yoktu | Eksik | Yeni H3: takip bitince doğum kontrolü bırakılır (Soper); hCG yükselirse önce yeni gebelik dışlanır (Lok) |
| 17 | En çok aranan "parsiyel mol gebelik" için doğrudan yanıt yoktu | Arama niyeti | Yeni H3 "Parsiyel (kısmi) mol gebelik nedir?" |
| 18 | Histerektomide yumurtalıkların korunması eksik; %15-20→%3-5 yalnızca komplet mole ait | Eksik / popülasyon | FIGO 2025 + "komplet molde" |
| 19 | Tüp bebekte tetik iğnesinin (hCG) takip ölçümlerini bozması anlatılmıyordu | Eksik | Eklendi (Lok 2025: dışarıdan hCG kullanımı) |
| 20 | NLRP7/KHDC3L iki bölümde tekrar; tüp bebek başlığı altında "çözüm" izlenimi | Tekrar | Bölümler arası bağlantı; "kendi yumurtasıyla normal gebelik olasılığı düşük" (Soper) |
| 21 | Acil listede yalnızca kan tükürme ve nöbet; uzman kutusundaki akciğer/sinir sistemi belirtileriyle uyumsuz | İç tutarlılık | Nefes darlığı ve sinir sistemi belirtileri (FIGO 2025) |
| 22 | Bambaranda kapsamı (yalnız taze transfer), transfer günüyle ilişkisizlik ve 40 yaş üstü risk eksik | Popülasyon | Eklendi |
| 23 | Sun 2015 tek merkez; kanser bölümünde genel bulgu gibi | Popülasyon | "Tek bir merkezin verisinde" |
| 24 | "Kılavuzlar ... 3 hafta sonra test önerir" — tek kaynak (RCOG) | Atıf | "RCOG kılavuzu" |
| Dil | "Adı, bu görünümden gelir" tekrarı; "merkezlerin protokolleri farklı olabilir" ile "merkezinizin planına uyun" art arda; "tedavi ekibinizle konuşun" kalıbı; "konan, ya da" virgülü; 25+ kelimelik üç cümle (Cochrane, Joneborg, HFEA) | Dil | Sadeleştirildi, cümleler bölündü |
| Teknik | Meta açıklama 161 karakter; görsel altyazısı takibin amacını "sonraki gebelik" diye veriyordu | Teknik / dil | 150 karakter; altyazı "gerilemeyen mol dokusunu erken yakalamak" |

## Uygulanmayanlar

- "Tek ilaca %30 direnç" (alt ajan önerisi): FIGO 2025 metninde bu rakam bulunamadı; yalnızca "skor 5-6'da direnç daha sık" yazıldı.
- Acil kanama için "1-2 saat her saat bir ped" eşiği: atıf verilen kaynaklarda yok; kardeş makalelerle aynı ifade korundu.
- "Rahim 16 haftadan büyükse transfüzyon hazırlığı" (FIGO 2021): tam metin kutusu görsel olduğundan doğrulanamadı.
- Breadcrumb "Transfer Süreci": kardeş yazılar (boş gebelik, missed abortus) aynı hub'da; tutarlılık için değiştirilmedi.

## Hekim kararına bırakılanlar (uzman kutusu, Dr. Aksoy'un sözleri)

1. "plasental dokunun düzensiz ve kistik görünmesi": özgün yanıt "heterojen-kistik"; "düzensiz" şekil, "heterojen" iç yapı anlamı taşıyor.
2. "dört haftalık ölçüm boyunca, en az 3 hafta süreyle": FIGO 2026 "dört ölçüm (gün 1, 7, 14, 21), en az 3 hafta" diyor.
3. "üç ardışık haftalık ölçümde toplamda %10'dan fazla yükselmesi": FIGO 2026'da "toplamda" yok ("üç ardışık haftalık ölçümde %10'dan fazla artış").

**Karar (2026-10-05):** Dr. Aksoy üç önerinin üçüne de "evet" dedi: "heterojen (iç yapısı düzensiz) ve kistik", "dört ölçüm boyunca", "toplamda" çıkarıldı. Tüm düzeltmeler aynı mesajla onaylandı ("Onaylıyorum, üç öneri de evet, commit, push, PR aç").

## Teknik durum

- Canlı HTML (2026-10-05): başlık 65 karakter, canonical doğru, `index, follow`, `about` MedicalCondition + Wikidata Q881855 + Wikipedia, 23 atıf, H1 tek.
- Search Console URL Inspection (2026-10-05): `/makaleler/mol-gebelik/` "Gönderildi ve dizine eklendi" (son tarama 13:51, #296 öncesi sürüm). Eski `/blog/mol-gebelik-uzum-gebelik/` "Yönlendirmeli sayfa", son tarama 30 Eylül, Google canonical'ı hâlâ eski hedef (`dusuk-sonrasi-hamilelik-bekleme-suresi`); Search Console'dan "Dizine eklenmesini iste" ile yeniden taratılabilir.

## Doğrulama (yerel)

`npm run build`, `verify:preflight` 26/26, `verify:reference-pmids` (OK 1458, WARN 16 eski), `verify:fragment-links`, `editorial-check.mjs` 0 aday.
