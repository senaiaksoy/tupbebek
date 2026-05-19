import { defineCollection, z } from 'astro:content';

/**
 * Editoryal Is Akisi Statusleri
 * draft      → Taslak (yayinlanmaz)
 * in_review  → Tibbi Danisma Kurulu incelemesinde
 * published  → Onaylanmis ve yayinda
 */
const statusEnum = z.enum(['draft', 'in_review', 'published']).default('published');
const recommendationGradeEnum = z.enum(['A', 'B', 'C', 'D/E']);

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
    category: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // Hero görsel intrinsic boyutları (CLS önleme + schema/OG meta için).
    // Yeni hero standardı: 1600x900 (16:9 master). Boş bırakılırsa varsayılan kullanılır.
    imageWidth: z.number().int().positive().optional(),
    imageHeight: z.number().int().positive().optional(),
    featured: z.boolean().default(false),

    // --- Editoryal Is Akisi ---
    status: statusEnum,
    publishDate: z.date().optional(),
    lastModified: z.date().optional(),

    // --- E-E-A-T Seffaflik ---
    author: authorSchema.default('Doç. Dr. Senai Aksoy'),
    authorTitle: z.string().optional(),
    authorCredentials: z.string().optional(),
    authorYoutube: z.string().url().optional(),
    medicalReviewer: z.string().default('tupbebek.com Yayin Kurulu'),
    reviewerTitle: z.string().optional(),
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
    canonical: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

export const collections = {
  'articles': articlesCollection,
};
