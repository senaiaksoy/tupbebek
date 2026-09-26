# Reference PMID audit — proposed corrections (2026-09-25)

Source: `npm run verify:reference-pmids` (772 PubMed citations, 286 unique PMIDs, 63 articles).
Result: 729 OK · 27 MISMATCH · 16 WARN. Every WARN is a collective-author guideline (ESHRE/ASRM working group listed as the first author) and needs no action.

**No article was edited.** Each proposal below was checked against a live NCBI esummary/esearch lookup. The Bas Editor must approve each one before it is applied, and the article style guide must be read before any edit.

## A. PMID points to an unrelated paper (fix first)

| # | Article (line) | Current PMID → actual paper | Proposed PMID | Proposed DOI | Notes |
|---|---|---|---|---|---|
| 1 | dusuk-sonrasi-hamilelik-bekleme-suresi.mdx (62; also summaryReferences 9–10) | 27872173 → George 2017, "Medical morbidity and mortality conferences" | **27864302** | 10.1093/humupd/dmw043 (unchanged) | Kangatharan 2017, Hum Reprod Update. Exact title: "Interpregnancy interval following miscarriage and adverse pregnancy outcomes: systematic review and meta-analysis" |
| 2 | endoskopik-cerrahi-histeroskopi.mdx (69) | 32080031 → otology implant study | **32080054** | 10.1097/AOG.0000000000003712 (unchanged) | ACOG Committee Opinion No. 800. The DOI already matches |
| 3 | endoskopik-cerrahi-histeroskopi.mdx (76) | 38723932 → Pirtea 2024, "Altered endometrial receptivity" (the DOI 10.1016/j.fertnstert.2024.05.001 points to this same wrong paper) | **38556964** | **10.1016/j.fertnstert.2024.02.033** | ASRM Practice Committee 2024, "Evidence-based diagnosis and treatment for uterine septum: a guideline" |
| 4–6 | hiperprolaktinemi-ve-kisirlik.mdx (61, 68, 75) | 37347576 / 38512643 / 35512345 → unrelated papers | 37670148 (Petersenn 2023) · 21296991 (Melmed 2011) | 10.1038/s41574-023-00886-5 · 10.1210/jc.2010-1692 | **Already fixed** in commit 3fc35afe on branch `claude/compassionate-lederberg-c8c54e`, but **not yet on main**. Merging that branch closes these three |
| 7 | imsi-picsi-macs-sperm-secimi.mdx (94) | 31341042 → mouse norovirus paper | **31425620** | 10.1002/14651858.CD010461.pub3 (unchanged) | Lepine 2019 Cochrane. Note: a 2026 update exists (Garg 2026, PMID 42227305, .pub4). The editor may want to cite the newer version |
| 8 | imsi-picsi-macs-sperm-secimi.mdx (110) | 34068305 → proton therapy review | **34066115** | 10.3390/biology10050430 (unchanged) | The real paper is Gil Juliá M, …, Pacheco A, … Garrido N. Biology 2021. The frontmatter title "…48,586 Cycles" does not exist. Actual title: "Sperm Selection by Magnetic-Activated Cell Sorting before Microinjection of Autologous Oocytes Increases Cumulative Live Birth Rates with Limited Clinical Impact…". Body line 221 names the author as "Pacheco 2021" (first author is Gil Juliá) and calls the 48,586 "döngü" (the abstract counts 46,807 + 1,779 *patients*). The claim of no difference in live birth rate matches the abstract, apart from a small rise in CLBR per embryo transferred |
| 9 | imsi-picsi-macs-sperm-secimi.mdx (147) | 18616888 = Franco JG Jr 2008 RBMO (the authors match) | keep 18616888 | **10.1016/S1472-6483(10)60291-X** | The frontmatter title "An evaluation of MSOME and sperm chromatin dispersion" and DOI …60506-6 match no PubMed record. The real title is "Significance of large nuclear vacuoles in human spermatozoa: implications for ICSI". Check that the claim in the text still fits this paper |
| 10 | opk-ve-ivf.mdx (68; also summaryReferences 12–13) | 21896549 → ENDOCARE questionnaire (the DOI humrep/der277 is the same wrong paper) | **21450755** *or* **28638367** | 10.1093/humupd/dmr008 *or* 10.3389/fendo.2017.00116 | The entry mixes two papers. The authors and year (Humaidan, Kol, Papanikolaou 2011) fit Humaidan 2011 HRU, "GnRH agonist for triggering of final oocyte maturation: time for a change of practice?". The title fits Haahr 2017 Front Endocrinol (systematic PRISMA review and meta-analysis). The editor picks whichever one supports the sentence |
| 11 | over-prp-yumurtalik-genclestirme-bas-editor-kosesi.mdx (20) | 32629762 → rheumatoid arthritis methylation (the DOI jcm9072049 is the same wrong paper) | candidate **32532000** | 10.3390/jcm9061809 | Sfakianoudis 2020 J Clin Med, "Reactivating Ovarian Function through Autologous PRP Intraovarian Infusion: Pilot Data on POI, Perimenopausal, Menopausal, and Poor Responder Women". Alternative: Sfakianoudis 2019 Gynecol Obstet Invest, PMID 30134239. No paper with the exact frontmatter title exists |
| 12 | over-prp-yumurtalik-genclestirme-bas-editor-kosesi.mdx (32) | 38211762 → vNOTES uterine artery occlusion (the DOI fertnstert.2024.01.012 is the same wrong paper) | **no match; probably fabricated** | — | No "Atkinson 2024, Ovarian rejuvenation techniques: a systematic review" is on PubMed. The nearest real paper is Atkinson L 2021 Hum Reprod, "Intraovarian injection of platelet-rich plasma in assisted reproduction: too much too soon?" (PMID 33963408, DOI 10.1093/humrep/deab106). That is an opinion piece, not a systematic review. Remove the reference or replace it with one the editor chooses |
| 13 | pgt-m.mdx (43; also summaryReferences 26, body 106) | 37839352 → corrigendum on a rat cholestasis study (the DOI fertnstert.2023.07.015 is a Pirtea reply letter) | **37162432** | **10.1016/j.fertnstert.2023.03.003** | ASRM 2023, "Indications and management of preimplantation genetic testing for monogenic conditions: a committee opinion" |
| 14 | varikosel-nedir-ne-zaman-ameliyat-gerekir.mdx (49; also summaryReferences 11–12, body 91 and 225) | 33728650 → CNS extracellular vesicles | **33890288** | 10.1002/14651858.CD000479.pub6 (unchanged) | Persad 2021 Cochrane. Exact title: "Surgical or radiological treatment for varicoceles in subfertile men" |
| 15 | yumurta-dondurma-rehberi.mdx (89) | 33324624 → silver nanoparticles | **33225079** | 10.1093/hropen/hoaa052 (unchanged) | ESHRE 2020 female fertility preservation guideline |

## B. Right paper, wrong metadata (lower priority)

| Article (line) | PMID | Issue | Proposed fix |
|---|---|---|---|
| akraba-evliligi.mdx (62) | 20832202 ✓ | wrong DOI (…08.022 is a retinoblastoma paper) | DOI → 10.1016/j.earlhumdev.2010.08.003 |
| azospermi-mikro-tese.mdx (24) | 39145501 ✓ | wrong DOI (…4088 is the AUA incontinence guideline) | DOI → 10.1097/JU.0000000000004180 |
| varikosel-nedir-ne-zaman-ameliyat-gerekir.mdx (40) | 39145501 ✓ | title paraphrased, no DOI | title → "Updates to Male Infertility: AUA/ASRM Guideline (2024)"; add DOI 10.1097/JU.0000000000004180 |
| endoskopik-cerrahi-histeroskopi.mdx (62) | 30991443 ✓ | DOI missing its version suffix | DOI → 10.1002/14651858.CD012856.pub2 |
| endoskopik-cerrahi-histeroskopi.mdx (83) | 37332387 ✓ (DOI matches) | title paraphrased | title → "ESHRE good practice recommendations on recurrent implantation failure" |
| hiperprolaktinemi-ve-kisirlik.mdx (40) | 24347930 ✓ (DOI matches) | title paraphrased | title → "Hyperprolactinemia" (Majumdar & Mangal 2013, J Hum Reprod Sci) |
| kimyasal-gebelik.mdx (119) | 29370045 = the *Summary* version | the DOI points to the full bulletin | PMID → 29232273 (full PB 191). Note that ACOG replaced PB 191 with PB 193 in 2018 (PMID 29470343). The editor may want to update it |

## Coverage limits

- Only citations that carry a PubMed ID are checked: a `pmid` field, a pubmed.ncbi.nlm.nih.gov URL, or a body link. References that have only a DOI are not checked.
- Body and summary labels are checked only when they contain an author surname or a known organisation (ASRM/ESHRE/ACOG/Cochrane/…) plus a year. I read the 23 body labels without a year by hand. The only bad one was varikosel 33728650, which is already listed above.
