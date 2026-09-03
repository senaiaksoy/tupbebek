import { defineCollection, z } from 'astro:content';

/**
 * Editoryal Is Akisi Statusleri
 * draft      → Taslak (yayinlanmaz)
 * in_review  → Tibbi Danisma Kurulu incelemesinde
 * published  → Yayinda (tibbi inceleyen/onaylayan ayri alanlarda kayitlidir)
 */
const statusEnum = z.enum(['draft', 'in_review', 'published']);
const recommendationGradeEnum = z.enum(['A', 'B', 'C', 'D/E']);
const contentTypeEnum = z.enum(['portal_article', 'editor_column']).default('portal_article');
const imageSourceTypeEnum = z.enum(['original', 'licensed', 'ai-assisted']);
const templateVersionEnum = z.enum(['2026-07', '2026-08', '2026-09']);
const reviewTypeEnum = z.enum(['medical', 'editorial']);
const referenceTypeEnum = z.enum([
  'journalArticle',
  'systematicReview',
  'guideline',
  'regulation',
  'officialWebPage',
  'book',
  'report',
]);

/**
 * Bilimsel Referans Semasi
 */
const referenceSchema = z.object({
  title: z.string(),
  type: referenceTypeEnum.optional(),
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

const videoChapterSchema = z.object({
  name: z.string(),
  startOffset: z.number().int().nonnegative(),
  endOffset: z.number().int().positive(),
  url: z.string().url().optional(),
}).refine((chapter) => chapter.endOffset > chapter.startOffset, {
  message: 'Video chapter endOffset must be greater than startOffset.',
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

const expertContributionSchema = z.object({
  title: z.string().optional(),
  question: z.string().min(10),
  text: z.string().min(1),
  evidenceNote: z.string().min(20).optional(),
  author: z.literal('Doç. Dr. Senai Aksoy'),
  authorTitle: z.string().optional(),
  authorUrl: z.string().url().optional(),
  answeredAt: z.date(),
  approvalStatus: z.literal('approved'),
});

const articleFrontmatterSchema = z.object({
  // --- Temel Icerik ---
  title: z.string(),
  description: z.string(),
  // Meta description'dan bağımsız, ilk ekranda tek kez gösterilen 2-3 cümlelik BLUF.
  // Mevcut makaleler gövde içi HizliCevap kullandığı için geçiş sürecinde opsiyoneldir.
  summary: z.string().optional(),
  // BLUF altinda gosterilen guclu bilimsel dayanaklar (en fazla 4).
  // Tam bibliyografik kayit references alaninda da bulunmalidir; burada yalnizca kisa etiket ve URL tutulur.
  summaryReferences: z.array(summaryReferenceSchema).max(4).optional(),
  category: z.string(),
  contentType: contentTypeEnum,
  // Yeni şablon sözleşmesini açıkça etkinleştirir. Legacy makalelerde opsiyoneldir.
  templateVersion: templateVersionEnum.optional(),
  image: z.string().optional(),
  // Arama ve sosyal yüzeyler için insan tarafından kontrol edilmiş alternatif oranlar.
  imageSquare: z.string().optional(),
  imageFourThree: z.string().optional(),
  imageAlt: z.string().optional(),
  imageCaption: z.string().optional(),
  imageCredit: z.string().optional(),
  imageSourceType: imageSourceTypeEnum.optional(),
  imageCreator: z.string().optional(),
  imageLicenseUrl: z.string().url().optional(),
  imageAcquireLicensePage: z.string().url().optional(),
  imageCopyrightNotice: z.string().optional(),
  // Hero görsel intrinsic boyutları (CLS önleme + schema/OG meta için).
  // Yeni hero standardı: 1600x900 (16:9 master). Boş bırakılırsa manifest kullanılır.
  imageWidth: z.number().int().positive().optional(),
  imageHeight: z.number().int().positive().optional(),
  featured: z.boolean().default(false),

  // --- Editoryal Is Akisi ---
  // Status bilinçli bir yayın kararıdır; eksik değer artık published sayılmaz.
  status: statusEnum,
  publishDate: z.date().optional(),
  lastModified: z.date().optional(),
  evidenceAsOf: z.date().optional(),
  reviewScope: z.string().optional(),
  editorialMethodNote: z.string().optional(),

  // --- E-E-A-T Seffaflik ---
  // Yazar açıkça belirtilir; yayın kurulu veya başka bir yazar otomatik olarak
  // Dr. Aksoy kimliğine dönüştürülmez.
  author: authorSchema,
  authorTitle: z.string().optional(),
  authorCredentials: z.string().optional(),
  authorYoutube: z.string().url().optional(),
  medicalReviewer: z.string().optional(),
  reviewerTitle: z.string().optional(),
  reviewType: reviewTypeEnum.optional(),
  reviewDate: z.date().optional(),
  approvedBy: z.string().optional(),
  // Yalnızca Dr. Aksoy'a sorulmuş konuya özel soru, gerçek yanıt ve açık yayın
  // onayı birlikte kaydedildiğinde imzalı katkı gösterilir.
  expertContribution: expertContributionSchema.optional(),

  // --- Bilimsel Referanslar ---
  // Makale duzeyindeki editoryal kanit derecesi (opsiyonel).
  // hideEvidenceGrade veya karma kanit turu olan makalelerde verilmeyebilir.
  // Yazi ici kritik iddialar icin markdown/MDX icinde {{kanit:A}}, {{kanit:B}},
  // {{kanit:C}} veya {{kanit:D/E}} inline etiketleri kullanilir.
  recommendationGrade: recommendationGradeEnum.optional(),
  // Ulusal kayit / mevzuat / coklu kanit turu iceren makalelerde
  // tekil "A-B-C oneri derecesi" kartini gizler.
  hideEvidenceGrade: z.boolean().optional(),
  // Bilimsel inceleme ve editoryal yontem notunu ustten alta tasiir.
  deferEditorialMeta: z.boolean().optional(),
  references: z.array(referenceSchema).optional(),

  // --- Video Embed ---
  videoId: z.string().optional(),
  videoTitle: z.string().optional(),
  videoUploadDate: z.date().optional(),
  videoDescription: z.string().optional(),
  videoDuration: z.string().regex(/^PT(?=.*\d)(?:\d+H)?(?:\d+M)?(?:\d+(?:\.\d+)?S)?$/u).optional(),
  videoThumbnailUrl: z.string().url().optional(),
  videoChapters: z.array(videoChapterSchema).optional(),

  // --- SEO ---
  seoTitle: z.string().optional(),
  canonical: z.string().url().optional(),
  noindex: z.boolean().default(false),
}).superRefine((data, ctx) => {
  if (data.status !== 'published') return;

  const requiredPublishedFields = [
    ['publishDate', data.publishDate],
    ['lastModified', data.lastModified],
    ['medicalReviewer', data.medicalReviewer],
    ['reviewDate', data.reviewDate],
  ] as const;

  for (const [field, value] of requiredPublishedFields) {
    if (!value) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [field],
        message: `Published articles must include ${field}.`,
      });
    }
  }

  if (!data.references || data.references.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['references'],
      message: 'Published articles must include at least one direct scientific or official source.',
    });
  }

  if (data.image && !data.imageAlt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['imageAlt'],
      message: 'Published articles with a hero image must include imageAlt.',
    });
  }

  if (!data.recommendationGrade && !data.hideEvidenceGrade) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['recommendationGrade'],
      message: 'Published articles must include recommendationGrade or explicitly hide the grade card.',
    });
  }

  if (data.templateVersion === '2026-09' && !data.expertContribution) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['expertContribution'],
      message: 'Published 2026-09 articles require a topic-specific Dr. Aksoy question, answer, date, and approval record.',
    });
  }
});

const articlesCollection = defineCollection({
  type: 'content',
  schema: articleFrontmatterSchema,
});

export const collections = {
  'articles': articlesCollection,
};
