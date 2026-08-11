# memory.md — Proje Hafızası ve Karar Geçmişi

Bu dosya, **tupbebek.com** portalı üzerindeki kritik geliştirme kararlarını, SEO/GEO teknik güncellemelerini ve yasal uyumluluk kurallarını gelecek ajanların okuyabilmesi için kayıt altında tutar.

---

## 📅 Son Güncelleme: 7 Haziran 2026

### 1. Yapılan Güncelleme (AEO/GEO İyileştirmeleri)
Yapay zeka arama motorlarında (ChatGPT, Perplexity, Gemini, Google AI Overviews) alıntılanma oranını (GEO/AEO) yükseltmek ve E-E-A-T sinyallerini kanonik hale getirmek amacıyla iki faz halinde şu değişiklikler yapıldı:
- **Faz 1 (Teknik & Şema):**
  - **Yazar Kimliği Eşitlemesi:** Doç. Dr. Senai Aksoy'un portal genelindeki benzersiz şema kimliği (`@id`) `https://senaiaksoy.net/#person` olarak birleştirildi ([EditorKunyesi.astro](file:///d:/A-klas%C3%B6r/tupbebek/src/components/EditorKunyesi.astro) ile [ArticleSchema.astro](file:///d:/A-klas%C3%B6r/tupbebek/src/components/ArticleSchema.astro) ve [senai-aksoy.astro](file:///d:/A-klas%C3%B6r/tupbebek/src/pages/yazar/senai-aksoy.astro) uyumlu hale getirildi).
  - **Otorite Bağlantıları (`sameAs`):** Dr. Aksoy'un biyografi sayfasına Wikidata (`Q139893832`), PubMed yazar arama adresi ve Doctoralia profili eklendi.
  - **Dinamik Prosedür Şeması:** Kategorisi `"Tedavi Yöntemleri"` veya `"Tüp Bebek"` olan sayfaların JSON-LD üzerinde `MedicalCondition` yerine **MedicalProcedure** olarak map edilmesi sağlandı.
- **Faz 2 (İçerik & Atıf):**
  - **Named Expert Alıntıları:** [update-quoteblocks.mjs](file:///d:/A-klas%C3%B6r/tupbebek/scripts/update-quoteblocks.mjs) betiği ile 29 makaledeki `<QuoteBlock>` yazar bilgisi `"tupbebek.com Yayın Kurulu"` yerine hekimin kendi adı olan **`"Doç. Dr. Senai Aksoy"`** ile değiştirildi.
  - **İlk %30 Dilimi PubMed Linkleri:** Sitede yer alan **tüm 59 makalenin** (başlangıçtaki 45 öncelikli makale ve ardından tamamlanan kalan 14 makale dahil) ilk paragraf / `<HizliCevap>` alanlarındaki bilimsel referanslar doğrudan PubMed/DOI/ASRM/ESHRE/Cochrane adreslerine köprülendi.

---

## ⚠️ Kritik Kararlar ve Kısıtlamalar

### Makale auditlerinde citability / AI-web raporu (2026-08-11)

Bundan sonraki her makale auditinde, teknik ve tıbbi bulgulara ek olarak şu üç sonuç ayrı ayrı raporlanır:

1. Hasta eğitimi açısından değerli mi?
2. AI/web yanıtlarında ikincil kaynak olarak güvenle alıntılanabilir mi?
3. Akademik kanıt sayılmasını engelleyen eksikler neler?

Bu değerlendirme; özgün klinik karar değeri, doğrudan cevap açıklığı, iddia-kaynak yakınlığı ve kaynak/iddia uyumu, eşik ve sayıların bağlamı, belirsizlik, tam bibliyografik kimlik, yazar/reviewer/güncelleme izlenebilirliği ve render edilmiş teknik keşfedilebilirliği kapsar. Hasta eğitimi ve ikincil kaynak olarak alıntılanabilirlik, birincil akademik kanıtın yerine geçirilmez. AI için yapay alıntı kutuları veya bot odaklı metin parçalama eklenmez.

### Yasal Uyumluluk (T.C. Sağlık Bakanlığı Tanıtım Yönetmeliği)
- **Tıbbi Referans Portalı Statüsü:** Site hiçbir klinik randevu CTA'i barındıramaz, fiyat karşılaştırması veya hasta yorumu gösteremez.
- **Klinik Şemaları (Banned):** Teknik GEO playbook'larının önerdiği `MedicalClinic` şeması, siteyi bağımsız referans portalından çıkarıp klinik statüsüne sokacağı için yasal cezalara yol açabilir. Bu nedenle root şema daima **`Organization`** olarak kalmalıdır.
- **301 Yönlendirme Yasağı:** `tupbebek.com` sitesinden hekimin klinik sitelerine (`senaiaksoy.net` veya `draksoyivf.com`) 301 yönlendirmesi yapılmamalıdır. Dış linkler daima `nofollow` veya pasif kariyer bilgisi şeklinde olmalıdır.

### Dil ve Bölge Odakları
- **tupbebek.com:** Sadece **Türkçe** yayındadır ve yerel bilgi aramalarına odaklanır.
- **draksoyivf.com:** Yabancı dildeki (EN/FR/AR) klinik turizmi bu ayrı depodan yönetilir. Fiyat listeleri ve Kıbrıs mevzuat karşılaştırmaları sadece orada uygulanmalıdır.

### Instagram Yayın Sonrası Link Kuralı
- `@tupbebekdergi` için her Instagram paylaşımı yayınlandıktan sonra, paylaşımda kullanılan makalenin slug/link'i `tupbebek.com/instagram/` sayfasındaki `src/pages/instagram.astro` içindeki `instagramSlugs` listesinin en üstüne eklenmelidir.
- Bu güncelleme, sosyal medya takipçisinin profildeki link sayfasında en son paylaşılan makaleyi ilk sırada görmesini sağlar.
- Paylaşım sonrası rutin: `tupbebekdergi/takvim-tr.md` içinde ilgili içerik `Yayınlandı` yapılır, ardından `D:\A-klasör\tupbebek\src\pages\instagram.astro` güncellenir, build/deploy çalıştırılır ve canlı `https://tupbebek.com/instagram/` üzerinde yeni makalenin ilk sırada olduğu doğrulanır.
