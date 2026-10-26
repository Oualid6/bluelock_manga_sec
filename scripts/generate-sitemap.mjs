import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://bluelockhub.com';

// 1. Static Pages Definition
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/manga', priority: '0.9', changefreq: 'daily' },
  { path: '/characters', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  { path: '/dmca', priority: '0.5', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
];

const languages = ['en', 'fr', 'es'];

// 2. Chapters Data Definition (matches constants.ts exactly)
// Integer chapters 1-366
// English: ch 1-364 (ch 365 is empty []) + 346.2 + 364.2 + ch 366 (coming soon, empty pages)
// French: ch 1-342 (ch > 342 are empty [])
// Spanish: ch 1-345 (ch >= 346 are empty [])
const chapters = [];

for (let i = 1; i <= 366; i++) {
  // ch 365: En only (pages exist in EN)
  // ch 366: En only (coming soon — no pages in any language, but still a valid indexed URL)
  const hasEn = i !== 365; // 365 has pages, 366 is coming-soon but still indexed EN
  const hasFr = i <= 342;
  const hasEs = i <= 345;
  if (hasEn || hasFr || hasEs) {
    chapters.push({
      number: i,
      hasEn,
      hasFr,
      hasEs,
    });
  }
}

// Sub-chapters
chapters.push({
  number: 346.2,
  hasEn: true,
  hasFr: false,
  hasEs: false,
});

chapters.push({
  number: 364.2,
  hasEn: true,
  hasFr: false,
  hasEs: false,
});

// Sort chapters numerically ascending
chapters.sort((a, b) => a.number - b.number);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

// Helper to escape XML
function xmlEscape(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

// 3. Add Static Multilingual Pages
for (const page of staticPages) {
  for (const lang of languages) {
    const loc = `${DOMAIN}/${lang}${page.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${xmlEscape(loc)}</loc>\n`;
    for (const altLang of languages) {
      const altHref = `${DOMAIN}/${altLang}${page.path}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${xmlEscape(altHref)}" />\n`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(`${DOMAIN}/en${page.path}`)}" />\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${lang === 'en' ? page.priority : (parseFloat(page.priority) > 0.6 ? (parseFloat(page.priority) - 0.1).toFixed(1) : page.priority)}</priority>\n`;
    xml += `  </url>\n`;
  }
}

// 4. Add Real Chapters
// Canonical URLs:
// English: https://bluelockhub.com/chapter/${num}
// French:  https://bluelockhub.com/fr/chapter/${num}
// Spanish: https://bluelockhub.com/es/chapter/${num}
for (const ch of chapters) {
  // Build available alternates list for this chapter
  const alternates = [];
  if (ch.hasEn) alternates.push({ lang: 'en', href: `${DOMAIN}/chapter/${ch.number}` });
  if (ch.hasFr) alternates.push({ lang: 'fr', href: `${DOMAIN}/fr/chapter/${ch.number}` });
  if (ch.hasEs) alternates.push({ lang: 'es', href: `${DOMAIN}/es/chapter/${ch.number}` });

  const defaultHref = ch.hasEn ? `${DOMAIN}/chapter/${ch.number}` : alternates[0]?.href;

  // Add English entry if available
  if (ch.hasEn) {
    const loc = `${DOMAIN}/chapter/${ch.number}`;
    xml += `  <url>\n`;
    xml += `    <loc>${xmlEscape(loc)}</loc>\n`;
    for (const alt of alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${xmlEscape(alt.href)}" />\n`;
    }
    if (defaultHref) {
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(defaultHref)}" />\n`;
    }
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // Add French entry if available
  if (ch.hasFr) {
    const loc = `${DOMAIN}/fr/chapter/${ch.number}`;
    xml += `  <url>\n`;
    xml += `    <loc>${xmlEscape(loc)}</loc>\n`;
    for (const alt of alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${xmlEscape(alt.href)}" />\n`;
    }
    if (defaultHref) {
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(defaultHref)}" />\n`;
    }
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  // Add Spanish entry if available
  if (ch.hasEs) {
    const loc = `${DOMAIN}/es/chapter/${ch.number}`;
    xml += `  <url>\n`;
    xml += `    <loc>${xmlEscape(loc)}</loc>\n`;
    for (const alt of alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${xmlEscape(alt.href)}" />\n`;
    }
    if (defaultHref) {
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(defaultHref)}" />\n`;
    }
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }
}

xml += `</urlset>\n`;

const publicDir = path.join(__dirname, '../public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');

const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
}

const urlCount = (xml.match(/<loc>/g) || []).length;
console.log(`✅ Clean Sitemap generated at ${sitemapPath}`);
console.log(`Total URLs: ${urlCount}`);
console.log(`Static pages: ${staticPages.length * languages.length}`);
console.log(`Chapters: EN (${chapters.filter(c => c.hasEn).length}), FR (${chapters.filter(c => c.hasFr).length}), ES (${chapters.filter(c => c.hasEs).length})`);
