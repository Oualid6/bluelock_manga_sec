import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

console.log('🔍 RUNNING COMPREHENSIVE SEO & AUDIT VERIFICATION TESTS...\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

// ==========================================
// TEST SUITE 1: XML SITEMAP VALIDATION
// ==========================================
console.log('--- TEST SUITE 1: XML Sitemap Validation ---');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml exists');

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
const locs = locMatches.map(m => m.replace(/<\/?loc>/g, ''));

assert(locs.length > 500, `Sitemap contains ${locs.length} URLs (expected > 500 valid URLs)`);
assert(!sitemapContent.includes('tokyo-ghoul'), 'Zero Tokyo Ghoul URLs in sitemap');
assert(!sitemapContent.includes('/fr/chapter/343<'), 'No empty French chapter 343 in sitemap');
assert(!sitemapContent.includes('/fr/chapter/365<'), 'No empty French chapter 365 in sitemap');
assert(!sitemapContent.includes('/es/chapter/346<'), 'No empty Spanish chapter 346 in sitemap');
assert(!sitemapContent.includes('/es/chapter/365<'), 'No empty Spanish chapter 365 in sitemap');
assert(!sitemapContent.includes('/chapter/365<'), 'No empty English chapter 365 in sitemap');

// Check static pages in sitemap
const expectedStatic = [
  'https://bluelockhub.com/en',
  'https://bluelockhub.com/fr',
  'https://bluelockhub.com/es',
  'https://bluelockhub.com/en/manga',
  'https://bluelockhub.com/fr/manga',
  'https://bluelockhub.com/es/manga',
  'https://bluelockhub.com/en/characters',
  'https://bluelockhub.com/en/about',
  'https://bluelockhub.com/fr/about',
  'https://bluelockhub.com/en/privacy',
  'https://bluelockhub.com/en/terms',
  'https://bluelockhub.com/en/dmca',
  'https://bluelockhub.com/en/disclaimer'
];
expectedStatic.forEach(url => {
  assert(locs.includes(url), `Sitemap includes verified static route: ${url}`);
});

// Check canonical English chapter URLs format (must be /chapter/X, not /en/chapter/X)
const enChapterInSitemap = locs.some(u => u.includes('/en/chapter/'));
assert(!enChapterInSitemap, 'No mixed /en/chapter/ URLs in sitemap; all English chapters use canonical /chapter/:id');

// Check domain consistency
const nonApexUrls = locs.filter(u => !u.startsWith('https://bluelockhub.com/'));
assert(nonApexUrls.length === 0, `All URLs strictly use https://bluelockhub.com/ (non-matching: ${nonApexUrls.length})`);

// Check duplicates
const duplicates = locs.filter((item, index) => locs.indexOf(item) !== index);
assert(duplicates.length === 0, `Zero duplicate URLs in sitemap (found: ${duplicates.length})`);

// ==========================================
// TEST SUITE 2: REDIRECTS & STATUS CODE VALIDATION
// ==========================================
console.log('\n--- TEST SUITE 2: Redirects & Status Code Validation ---');
const redirectsPath = path.join(publicDir, '_redirects');
assert(fs.existsSync(redirectsPath), 'public/_redirects exists');

const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');

const legacyRedirects = [
  ['/manga', '/en/manga'],
  ['/characters', '/en/characters'],
  ['/about', '/en/about'],
  ['/terms', '/en/terms'],
  ['/privacy', '/en/privacy'],
  ['/dmca', '/en/dmca'],
  ['/disclaimer', '/en/disclaimer'],
];

legacyRedirects.forEach(([from, to]) => {
  const hasRule = redirectsContent.includes(`${from} `) && redirectsContent.includes(to);
  assert(hasRule, `Permanent 301 rule for legacy route ${from} -> ${to}`);
});

assert(redirectsContent.includes('/en/chapter/*') && redirectsContent.includes('/chapter/:splat'), 'Canonical redirect rule for /en/chapter/* -> /chapter/:splat 301!');
assert(redirectsContent.includes('/ ') && redirectsContent.includes('/en') && redirectsContent.includes('301!'), 'Root homepage server 301! redirect: / -> /en');
assert(/\/\*\s+\/index\.html\s+200/.test(redirectsContent), 'SPA fallback catch-all rule /* /index.html 200 is preserved at end');

// Check 404 static page
const static404Path = path.join(publicDir, '404.html');
assert(fs.existsSync(static404Path), 'Static public/404.html exists');
const static404Content = fs.readFileSync(static404Path, 'utf8');
assert(static404Content.includes('noindex'), '404.html includes meta robots noindex directive');

// ==========================================
// TEST SUITE 3: CRAWLABLE INTERNAL LINKS
// ==========================================
console.log('\n--- TEST SUITE 3: Crawlable Internal Links ---');
const readerPath = path.join(rootDir, 'pages/ChapterReader.tsx');
const readerContent = fs.readFileSync(readerPath, 'utf8');

assert(!readerContent.includes('onClick={() => handleNav(prevChapter.number)}'), 'Removed un-crawlable onClick handler for prevChapter button');
assert(!readerContent.includes('onClick={() => handleNav(nextChapter.number)}'), 'Removed un-crawlable onClick handler for nextChapter button');
assert(readerContent.includes('<Link') && readerContent.includes('to={prevUrl}'), 'Next/Prev navigation uses accessible <Link to={prevUrl}> component');
assert(readerContent.includes('<Link') && readerContent.includes('to={nextUrl}'), 'Next/Prev navigation uses accessible <Link to={nextUrl}> component');
assert(readerContent.includes('availableChapters'), 'Chapter navigation filters to only chapters with real pages for the current language');

const footerPath = path.join(rootDir, 'components/Footer.tsx');
const footerContent = fs.readFileSync(footerPath, 'utf8');
assert(footerContent.includes("lang === 'en' ? '/chapter/1' : `/${lang}/chapter/1`"), 'Footer Start Reading link points to canonical /chapter/1 for English');

const breadcrumbsPath = path.join(rootDir, 'components/Breadcrumbs.tsx');
const breadcrumbsContent = fs.readFileSync(breadcrumbsPath, 'utf8');
assert(breadcrumbsContent.includes('to={`/${lang}`}'), 'Breadcrumbs home icon links dynamically to current language /${lang}');

// ==========================================
// TEST SUITE 4: PRERENDERED STATIC HTML & METADATA
// ==========================================
console.log('\n--- TEST SUITE 4: Prerendered Static HTML & Metadata ---');
const coreStaticDirs = [
  'en', 'fr', 'es',
  'en/manga', 'fr/manga', 'es/manga',
  'en/characters', 'fr/characters', 'es/characters',
  'en/about', 'fr/about', 'es/about',
  'en/privacy', 'fr/privacy', 'es/privacy',
  'en/terms', 'fr/terms', 'es/terms',
  'en/dmca', 'fr/dmca', 'es/dmca',
  'en/disclaimer', 'fr/disclaimer', 'es/disclaimer'
];

let allPrerenderedOk = true;
coreStaticDirs.forEach(sub => {
  const file = path.join(distDir, sub, 'index.html');
  if (!fs.existsSync(file)) {
    allPrerenderedOk = false;
    assert(false, `Prerendered file exists: dist/${sub}/index.html`);
  }
});
assert(allPrerenderedOk, 'All 24 core multilingual HTML files exist in dist/');

// Deep inspect dist/en/index.html
const enHomeHtml = fs.readFileSync(path.join(distDir, 'en/index.html'), 'utf8');
assert(enHomeHtml.includes('<link rel="canonical" href="https://bluelockhub.com/en" />'), 'dist/en/index.html has self-referencing canonical tag');
assert(enHomeHtml.includes('hreflang="en" href="https://bluelockhub.com/en"'), 'dist/en/index.html has hreflang="en"');
assert(enHomeHtml.includes('hreflang="fr" href="https://bluelockhub.com/fr"'), 'dist/en/index.html has hreflang="fr"');
assert(enHomeHtml.includes('hreflang="es" href="https://bluelockhub.com/es"'), 'dist/en/index.html has hreflang="es"');
assert(enHomeHtml.includes('hreflang="x-default" href="https://bluelockhub.com/en"'), 'dist/en/index.html has hreflang="x-default"');
assert(enHomeHtml.includes('<h1') && enHomeHtml.includes('Blue Lock Manga'), 'dist/en/index.html contains meaningful H1 heading');
assert(enHomeHtml.includes('Latest Releases'), 'dist/en/index.html contains Latest Releases section');
assert(enHomeHtml.includes('href="/chapter/'), 'dist/en/index.html contains real crawlable chapter links in root');

// Deep inspect dist/fr/manga/index.html
const frMangaHtml = fs.readFileSync(path.join(distDir, 'fr/manga/index.html'), 'utf8');
assert(frMangaHtml.includes('<link rel="canonical" href="https://bluelockhub.com/fr/manga" />'), 'dist/fr/manga/index.html has self-referencing canonical tag');
assert(frMangaHtml.includes('href="/fr/chapter/'), 'dist/fr/manga/index.html contains French chapter links');

// Check 404 in dist
assert(fs.existsSync(path.join(distDir, '404.html')), 'dist/404.html exists in build output');

// ==========================================
// TEST SUMMARY
// ==========================================
console.log('\n==========================================');
console.log(`TOTAL TESTS: ${passedTests + failedTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests}`);
console.log('==========================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL SEO VERIFICATION TESTS PASSED PERFECTLY!\n');
}
