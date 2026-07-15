import { defineCollection, z } from 'astro:content';

/**
 * Editoryal Is Akisi Statusleri
 * draft      → Taslak (yayinlanmaz)
 * in_review  → Tibbi Danisma Kurulu incelemesinde
 * published  → Onaylanmis ve yayinda
 */
const statusEnum = z.enum(['draft', 'in_review', 'published']).default('published');
const recommendationGradeEnum = z.enum(['A', 'B', 'C', 'D/E']);
const contentTypeEnum = z.enum(['portal_article', 'editor_column']).default('portal_article');
const imageSourceTypeEnum = z.enum(['original', 'licensed', 'ai-assisted']);

/**
 * Bilimsel Referans Semasi
 */
const referenceSchema = z.object({
  title: z.string(),
  authors: z.string().optional(),
  journal: z.string().optional(),
  year: z.number().optional(),
  url: z.string().url().optional(),
  doi: z.string().optional(),
  pmid: z.string().regex(/^\d+$/).optional(),
});

const summaryReferenceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

/**
 * Yazar Kimlik Semasi (E-E-A-T)
 */
const authorSchema = z.object({
  name: z.string(),
  title: z.string().optional(),
  credentials: z.string().optional(),
  url: z.string().optional(),
}).or(z.string());

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // --- Temel Icerik ---
    title: z.string(),
    description: z.string(),
    // Meta description'dan bağımsız, ilk ekranda tek kez gösterilen 2-3 cümlelik BLUF.
    // Mevcut makaleler gövde içi HizliCevap kullandığı için geçiş sürecinde opsiyoneldir.
    summary: z.string().optional(),
    // BLUF altinda gosterilen 1-2 guclu bilimsel dayanak. Tam bibliyografik kayit
    // references alaninda da bulunmalidir; burada yalnizca kisa etiket ve URL tutulur.
    summaryReferences: z.array(summaryReferenceSchema).max(2).optional(),
    category: z.string(),
    contentType: contentTypeEnum,
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    imageCredit: z.string().optional(),
    imageSourceType: imageSourceTypeEnum.optional(),
    // Hero görsel intrinsic boyutları (CLS önleme + schema/OG meta için).
    // Yeni hero standardı: 1600x900 (16:9 master). Boş bırakılırsa varsayılan kullanılır.
    imageWidth: z.number().int().positive().optional(),
    imageHeight: z.number().int().positive().optional(),
    featured: z.boolean().default(false),

    // --- Editoryal Is Akisi ---
    status: statusEnum,
    publishDate: z.date().optional(),
    lastModified: z.date().optional(),
    evidenceAsOf: z.date().optional(),
    reviewScope: z.string().optional(),

    // --- E-E-A-T Seffaflik ---
    // Yazar açıkça belirtilir; yayın kurulu veya başka bir yazar otomatik olarak
    // Dr. Aksoy kimliğine dönüştürülmez.
    author: authorSchema,
    authorTitle: z.string().optional(),
    authorCredentials: z.string().optional(),
    authorYoutube: z.string().url().optional(),
    medicalReviewer: z.string(),
    reviewerTitle: z.string(),
    reviewDate: z.date().optional(),
    approvedBy: z.string().optional(),

    // --- Bilimsel Referanslar ---
    // Makale duzeyindeki zorunlu editoryal kanit derecesi.
    // Yazi ici kritik iddialar icin markdown/MDX icinde {{kanit:A}}, {{kanit:B}},
    // {{kanit:C}} veya {{kanit:D/E}} inline etiketleri kullanilir.
    recommendationGrade: recommendationGradeEnum,
    references: z.array(referenceSchema).optional(),

    // --- Video Embed ---
    videoId: z.string().optional(),
    videoTitle: z.string().optional(),

    // --- SEO ---
    seoTitle: z.string().optional(),
    canonical: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

export const collections = {
  'articles': articlesCollection,
};
