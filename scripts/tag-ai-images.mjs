#!/usr/bin/env node
/**
 * Yapay zekâ ile üretilmiş görsellere IPTC DigitalSourceType
 * (trainedAlgorithmicMedia) XMP etiketi ekler.
 *
 * Görsel yeniden sıkıştırılmaz: yalnızca dosya kabına (WebP RIFF / JPEG APP1 /
 * PNG iTXt) bir XMP bloğu eklenir; piksel verisine dokunulmaz. Etiketi zaten
 * taşıyan dosyalar atlanır, bu yüzden betik tekrar çalıştırılabilir.
 *
 * Kaynak: Google Search Central, "Using generative AI content" (2026-10-01) ve
 * IPTC Digital Source Type sözlüğü.
 *
 * Kullanım:
 *   node scripts/tag-ai-images.mjs <dosya-veya-klasör> [...]
 *   node scripts/tag-ai-images.mjs --check <dosya-veya-klasör> [...]
 */
import { readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { crc32 } from 'node:zlib';

export const AI_SOURCE_TYPE =
  'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';

export const XMP_PACKET =
  '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>' +
  '<x:xmpmeta xmlns:x="adobe:ns:meta/">' +
  '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' +
  '<rdf:Description rdf:about="" ' +
  'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/">' +
  `<Iptc4xmpExt:DigitalSourceType>${AI_SOURCE_TYPE}</Iptc4xmpExt:DigitalSourceType>` +
  '</rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>';

const SUPPORTED = new Set(['.webp', '.jpg', '.jpeg', '.png']);

export function isTagged(buf) {
  return buf.includes('trainedAlgorithmicMedia');
}

// ---------- WebP ----------
function webpCanvas(chunkId, data) {
  if (chunkId === 'VP8 ') {
    // 3 bayt frame tag + 9d 01 2a başlangıç kodu + 14 bit genişlik/yükseklik
    if (data[3] !== 0x9d || data[4] !== 0x01 || data[5] !== 0x2a) throw new Error('VP8 başlangıç kodu yok');
    const w = data.readUInt16LE(6) & 0x3fff;
    const h = data.readUInt16LE(8) & 0x3fff;
    return { w, h, alpha: false };
  }
  if (chunkId === 'VP8L') {
    if (data[0] !== 0x2f) throw new Error('VP8L imzası yok');
    const bits = data.readUInt32LE(1);
    const w = (bits & 0x3fff) + 1;
    const h = ((bits >>> 14) & 0x3fff) + 1;
    const alpha = ((bits >>> 28) & 1) === 1;
    return { w, h, alpha };
  }
  throw new Error(`Beklenmeyen WebP parçası: ${chunkId}`);
}

function chunk(id, data) {
  const head = Buffer.alloc(8);
  head.write(id, 0, 'ascii');
  head.writeUInt32LE(data.length, 4);
  const pad = data.length % 2 ? Buffer.alloc(1) : Buffer.alloc(0);
  return Buffer.concat([head, data, pad]);
}

function tagWebp(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error('Geçerli WebP değil');
  }
  const chunks = [];
  let off = 12;
  while (off + 8 <= buf.length) {
    const id = buf.toString('ascii', off, off + 4);
    const size = buf.readUInt32LE(off + 4);
    const data = buf.subarray(off + 8, off + 8 + size);
    chunks.push({ id, data });
    off += 8 + size + (size % 2);
  }
  const xmp = { id: 'XMP ', data: Buffer.from(XMP_PACKET, 'utf8') };
  let out;
  if (chunks[0].id === 'VP8X') {
    const vp8x = Buffer.from(chunks[0].data);
    vp8x[0] |= 0x04; // XMP bayrağı
    out = [{ id: 'VP8X', data: vp8x }, ...chunks.slice(1).filter((c) => c.id !== 'XMP '), xmp];
  } else {
    const { w, h, alpha } = webpCanvas(chunks[0].id, chunks[0].data);
    const vp8x = Buffer.alloc(10);
    vp8x[0] = 0x04 | (alpha ? 0x10 : 0);
    vp8x.writeUIntLE(w - 1, 4, 3);
    vp8x.writeUIntLE(h - 1, 7, 3);
    out = [{ id: 'VP8X', data: vp8x }, ...chunks, xmp];
  }
  const body = Buffer.concat(out.map((c) => chunk(c.id, c.data)));
  const head = Buffer.alloc(12);
  head.write('RIFF', 0, 'ascii');
  head.writeUInt32LE(body.length + 4, 4);
  head.write('WEBP', 8, 'ascii');
  return Buffer.concat([head, body]);
}

// ---------- JPEG ----------
function tagJpeg(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error('Geçerli JPEG değil');
  const ns = Buffer.from('http://ns.adobe.com/xap/1.0/\0', 'latin1');
  const payload = Buffer.concat([ns, Buffer.from(XMP_PACKET, 'utf8')]);
  const seg = Buffer.alloc(4);
  seg[0] = 0xff;
  seg[1] = 0xe1;
  seg.writeUInt16BE(payload.length + 2, 2);
  // SOI ve varsa APP0 (JFIF) sonrasına ekle
  let insertAt = 2;
  if (buf[2] === 0xff && buf[3] === 0xe0) insertAt = 4 + buf.readUInt16BE(4);
  return Buffer.concat([buf.subarray(0, insertAt), seg, payload, buf.subarray(insertAt)]);
}

// ---------- PNG ----------
function tagPng(buf) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!buf.subarray(0, 8).equals(sig)) throw new Error('Geçerli PNG değil');
  const ihdrLen = buf.readUInt32BE(8);
  const afterIhdr = 8 + 12 + ihdrLen;
  const data = Buffer.concat([
    Buffer.from('XML:com.adobe.xmp\0', 'latin1'),
    Buffer.from([0, 0]), // sıkıştırma yok
    Buffer.from('\0\0', 'latin1'), // dil + çevrilmiş anahtar kelime boş
    Buffer.from(XMP_PACKET, 'utf8'),
  ]);
  const type = Buffer.from('iTXt', 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([type, data])) >>> 0);
  return Buffer.concat([buf.subarray(0, afterIhdr), len, type, data, crc, buf.subarray(afterIhdr)]);
}

export function tagBuffer(buf, ext) {
  if (isTagged(buf)) return null;
  if (ext === '.webp') return tagWebp(buf);
  if (ext === '.jpg' || ext === '.jpeg') return tagJpeg(buf);
  if (ext === '.png') return tagPng(buf);
  return null;
}

function* walk(p) {
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) yield* walk(join(p, name));
  } else if (SUPPORTED.has(extname(p).toLowerCase())) {
    yield p;
  }
}

export function tagPaths(paths, { check = false, log = console.log } = {}) {
  const stats = { tagged: 0, already: 0, missing: 0, failed: 0 };
  for (const root of paths) {
    for (const file of walk(root)) {
      const buf = readFileSync(file);
      if (isTagged(buf)) {
        stats.already++;
        continue;
      }
      if (check) {
        stats.missing++;
        log(`etiketsiz: ${file}`);
        continue;
      }
      try {
        writeFileSync(file, tagBuffer(buf, extname(file).toLowerCase()));
        stats.tagged++;
      } catch (err) {
        stats.failed++;
        log(`hata: ${file}: ${err.message}`);
      }
    }
  }
  return stats;
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('tag-ai-images.mjs')) {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const paths = args.filter((a) => a !== '--check');
  if (!paths.length) {
    console.error('Kullanım: node scripts/tag-ai-images.mjs [--check] <dosya-veya-klasör> [...]');
    process.exit(2);
  }
  const s = tagPaths(paths, { check });
  console.log(
    check
      ? `etiketli: ${s.already}, etiketsiz: ${s.missing}`
      : `etiketlendi: ${s.tagged}, zaten etiketli: ${s.already}, hata: ${s.failed}`,
  );
  if (s.failed || (check && s.missing)) process.exit(1);
}
