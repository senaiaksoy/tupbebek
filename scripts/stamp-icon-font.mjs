// /fonts/* CDN'de 1 yıl "immutable" önbelleklenir. Aynı adla değişen dosya
// ziyaretçiye ulaşmaz; bu yüzden içerik hash'i sorgu parametresi olarak eklenir:
//   deferred.css  → material-symbols.woff2?v=<font-hash>
//   BaseLayout    → deferred.css?v=<css-hash>
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 10);

const cssPath = path.join(root, 'public/fonts/deferred.css');
const fontHash = hash(path.join(root, 'public/fonts/material-symbols.woff2'));
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(/\/fonts\/material-symbols\.woff2(\?v=[a-f0-9]+)?/, `/fonts/material-symbols.woff2?v=${fontHash}`);
fs.writeFileSync(cssPath, css);

const layoutPath = path.join(root, 'src/layouts/BaseLayout.astro');
const cssHash = hash(cssPath);
let layout = fs.readFileSync(layoutPath, 'utf8');
const before = layout;
layout = layout.replace(/\/fonts\/deferred\.css(\?v=[a-f0-9]+)?/g, `/fonts/deferred.css?v=${cssHash}`);
fs.writeFileSync(layoutPath, layout);
console.log(`font v=${fontHash}, deferred.css v=${cssHash}${before === layout ? ' (değişiklik yok)' : ''}`);
