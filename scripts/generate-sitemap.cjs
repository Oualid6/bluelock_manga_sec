const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://rejjk.com';

// Replicate logic from constants.ts to get all chapter IDs
const chapters = [];

// Chapter 271
// Chapter 271, 270, 269, 268, 267, 266, 265, 264, 263, 262, 261, 260
chapters.push(271);
chapters.push(270);
chapters.push(269);
chapters.push(268);
chapters.push(267);
chapters.push(266);
chapters.push(265);
chapters.push(264);
chapters.push(263);
chapters.push(262);
chapters.push(261);
chapters.push(260);

// Generated 250-269
for (let i = 0; i < 20; i++) {
  chapters.push(269 - i); // Reverse order in array, but for sitemap order doesn't strictly matter
}

// Chapters 3-10
for (let i = 3; i <= 10; i++) {
  chapters.push(i);
}

// Chapter 2 & 1
chapters.push(2);
chapters.push(1);

const pages = [
  '',
  '/manga',
  '/characters',
  '/privacy',
  '/dmca',
  '/disclaimer'
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add static pages
pages.forEach(page => {
  sitemap += `  <url>
    <loc>${DOMAIN}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
});

// Add chapters
chapters.forEach(num => {
  sitemap += `  <url>
    <loc>${DOMAIN}/chapter/${num}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
});

sitemap += `</urlset>`;

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log(`Sitemap generated at ${path.join(publicDir, 'sitemap.xml')} with ${pages.length + chapters.length} URLs`);
