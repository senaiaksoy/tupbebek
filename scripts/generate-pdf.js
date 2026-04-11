#!/usr/bin/env node

/**
 * Generate PDF from HTML e-book using Puppeteer
 * Usage: node scripts/generate-pdf.js
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, '..', 'public', 'e-kitap', 'tup-bebek-beslenme-plani.html');
const outputPath = path.join(__dirname, '..', 'public', 'e-kitap', 'tup-bebek-beslenme-plani.pdf');

console.log('PDF oluşturuluyor...');
console.log(`Input:  ${htmlPath}`);
console.log(`Output: ${outputPath}`);

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--allow-file-access-from-files',
      '--disable-web-security'
    ]
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(120000);
  page.setDefaultNavigationTimeout(120000);

  // Harici ağ isteklerini engelle (Google Fonts vs.)
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.startsWith('file://')) {
      req.continue();
    } else {
      // Harici kaynakları (Google Fonts vb.) engelle
      req.abort();
    }
  });

  // HTML dosyasını file:// protokolü ile aç
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'load',
    timeout: 120000
  });

  // PDF oluştur
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      right: '12mm',
      bottom: '15mm',
      left: '12mm'
    },
    displayHeaderFooter: false,
    preferCSSPageSize: false
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
  console.log(`PDF başarıyla oluşturuldu! (${sizeMB} MB)`);
}

generatePDF().catch(err => {
  console.error('Hata:', err.message);
  process.exit(1);
});
