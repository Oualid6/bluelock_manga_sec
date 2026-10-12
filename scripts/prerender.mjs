import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://bluelockhub.com';

// Import locales
const { en } = await import('../locales/en.ts');
const { fr } = await import('../locales/fr.ts');
const { es } = await import('../locales/es.ts');

const locales = { en, fr, es };

const CHARACTERS = [
  { id: "isagi", name: "Yoichi Isagi", role: "Protagonist", grade: "Forward", description: "The central striker of Blue Lock. Uses spatial awareness and adaptability to devour rivals and become the ultimate egoist striker." },
  { id: "bachira", name: "Meguru Bachira", role: "Main Character", grade: "Forward", description: "An intuitive striker guided by his inner 'monster', known for explosive dribbling and creative playmaking." },
  { id: "kunigami", name: "Rensuke Kunigami", role: "Rival", grade: "Forward", description: "A powerhouse forward with an unshakeable moral compass and a deadly left-footed strike." },
  { id: "chigiri", name: "Hyoma Chigiri", role: "Rival", grade: "Forward", description: "A prodigious sprinter who broke past his fear of re-injury to unleash unmatched top-speed bursts on the wing." },
  { id: "nagi", name: "Seishiro Nagi", role: "Rival", grade: "Forward", description: "An effortlessly talented prodigy whose extraordinary ball-trapping skills awaken his dormant passion for victory." },
  { id: "reo", name: "Reo Mikage", role: "Rival", grade: "Midfielder", description: "A versatile midfielder and tactician capable of copying high-level plays to complement his strategic mindset." },
  { id: "barou", name: "Shoei Barou", role: "Villain", grade: "Forward", description: "The self-proclaimed 'King' of the pitch who dominates matches with physical dominance and powerful curved shots." },
  { id: "rin", name: "Rin Itoshi", role: "Rival", grade: "Forward", description: "The top-ranked striker in Blue Lock who controls the field with cold, calculating precision and ruthless efficiency." }
];

// Helper to escape HTML text
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Generate chapter numbers list for rendering
function getChaptersForLang(lang) {
  const max = lang === 'fr' ? 342 : (lang === 'es' ? 345 : 364);
  const list = [];
  if (lang === 'en') {
    list.push({ number: 364.2, title: 'Blue Lock Chapter 364.2' });
  }
  for (let i = max; i >= 1; i--) {
    if (lang === 'en' && i === 346) {
      list.push({ number: 346.2, title: 'Blue Lock Chapter 346.2' });
    }
    list.push({ number: i, title: `Blue Lock Chapter ${i}` });
  }
  return list;
}

function getChapterUrl(lang, num) {
  return lang === 'en' ? `/chapter/${num}` : `/${lang}/chapter/${num}`;
}

// Render Nav HTML
function renderNav(lang, activePath) {
  const t = locales[lang];
  return `
    <nav class="sticky top-0 z-50 w-full bg-black/95 border-b border-gray-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="/${lang}" class="flex-shrink-0 flex items-center gap-2 group">
            <img src="/logo.webp" alt="Blue Lock Manga" width="80" height="15" class="h-10 w-auto" loading="eager" />
          </a>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="/${lang}" class="px-3 py-2 rounded-md text-base font-bold tracking-wide transition-colors ${activePath === '' ? 'text-bb-blue' : 'text-gray-300 hover:text-bb-blue'}">${esc(t.nav.home)}</a>
              <a href="/${lang}/manga" class="px-3 py-2 rounded-md text-base font-bold tracking-wide transition-colors ${activePath === '/manga' ? 'text-bb-blue' : 'text-gray-300 hover:text-bb-blue'}">${esc(t.nav.allChapters)}</a>
              <a href="/${lang}/characters" class="px-3 py-2 rounded-md text-base font-bold tracking-wide transition-colors ${activePath === '/characters' ? 'text-bb-blue' : 'text-gray-300 hover:text-bb-blue'}">${esc(t.nav.characters)}</a>
              <a href="https://t.me/ManganexChannel" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-base font-bold tracking-wide transition-colors text-gray-300 hover:text-bb-blue">Telegram</a>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex bg-gray-900 rounded-full border border-gray-800 p-0.5">
              <a href="/en${activePath}" class="px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'en' ? 'bg-bb-blue text-white' : 'text-gray-400 hover:text-white'}">EN</a>
              <a href="/fr${activePath}" class="px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'fr' ? 'bg-bb-blue text-white' : 'text-gray-400 hover:text-white'}">FR</a>
              <a href="/es${activePath}" class="px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'es' ? 'bg-bb-blue text-white' : 'text-gray-400 hover:text-white'}">ES</a>
            </div>
          </div>
        </div>
      </div>
    </nav>`;
}

// Render Footer HTML
function renderFooter(lang) {
  const t = locales[lang];
  const year = new Date().getFullYear();
  const startReadingUrl = lang === 'en' ? '/chapter/1' : `/${lang}/chapter/1`;

  return `
    <footer class="bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div class="max-w-md">
            <h3 class="text-xl font-heading font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              BLUE <span class="text-bb-blue">LOCK MANGA</span>
            </h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              ${esc(t.footer.description)}
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-600">
              ${esc(t.footer.disclaimer)}
            </p>
          </div>
          <div class="grid grid-cols-2 gap-8 md:justify-items-end">
            <div>
              <h4 class="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">${esc(t.footer.explore)}</h4>
              <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="/${lang}/manga" class="hover:text-bb-blue transition-colors">${esc(t.nav.allChapters)}</a></li>
                <li><a href="${startReadingUrl}" class="hover:text-bb-blue transition-colors">${esc(t.footer.startReading)}</a></li>
                <li><a href="/${lang}/characters" class="hover:text-bb-blue transition-colors">${esc(t.nav.characters)}</a></li>
                <li><a href="/${lang}/about" class="hover:text-bb-blue transition-colors">${esc(t.footer.aboutUs)}</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">${esc(t.footer.legal)}</h4>
              <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="/${lang}/privacy" class="hover:text-bb-blue transition-colors">${esc(t.footer.privacy)}</a></li>
                <li><a href="/${lang}/terms" class="hover:text-bb-blue transition-colors">${esc(t.footer.terms)}</a></li>
                <li><a href="/${lang}/dmca" class="hover:text-bb-blue transition-colors">${esc(t.footer.dmca)}</a></li>
                <li><a href="/${lang}/disclaimer" class="hover:text-bb-blue transition-colors">Disclaimer</a></li>
                <li><a href="mailto:Support@bluelockhub.com" class="hover:text-bb-blue transition-colors">${esc(t.footer.contact)}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-gray-400 dark:text-gray-600 text-center md:text-left">
            &copy; ${year} ${esc(t.footer.allRightsReserved)}
          </p>
          <div class="flex gap-6 text-xs text-gray-400 dark:text-gray-600 font-medium">
            <span>${esc(t.footer.madeForFans)}</span>
          </div>
        </div>
      </div>
    </footer>`;
}

// 1. Home Page Prerender
function renderHomeContent(lang) {
  const t = locales[lang];
  const chapters = getChaptersForLang(lang);
  const latest12 = chapters.slice(0, 12);
  const latestChapter = chapters[0];

  return `
    <div class="flex flex-col min-h-screen" style="padding-bottom: 60px;">
      ${renderNav(lang, '')}
      <main class="flex-grow">
        <!-- Hero Section -->
        <section class="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-bb-dark py-20">
          <div class="absolute inset-0 z-0 opacity-30 select-none pointer-events-none">
            <img src="/imagebackgournd.webp" alt="Blue Lock Manga background" width="1920" height="1080" fetchpriority="high" loading="eager" class="w-full h-full object-cover" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-bb-dark via-bb-dark/60 to-transparent z-0 pointer-events-none"></div>

          <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <h1 class="mb-6 flex justify-center items-center">
              <span class="sr-only">Blue Lock Manga Online</span>
              <img src="/logo.webp" alt="Blue Lock Manga" width="450" height="120" fetchpriority="high" loading="eager" class="h-16 sm:h-24 md:h-32 lg:h-36 w-auto max-w-[85vw] sm:max-w-xl object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" />
            </h1>
            <p class="text-gray-300 text-lg md:text-xl max-w-3xl text-center mb-10 font-light leading-relaxed">
              ${esc(t.hero.subtitle)}
            </p>

            <!-- Hero Meta Card -->
            <div class="manga-hero-card w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
              <div class="flex flex-col lg:flex-row gap-8">
                <div class="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
                  <div class="space-y-1">
                    <span class="text-gray-500 text-xs font-bold uppercase tracking-wider block">${esc(t.home.rank)}</span>
                    <span class="text-white font-medium">${esc(t.home.stats.rankValue)}</span>
                  </div>
                  <div class="space-y-1">
                    <span class="text-gray-500 text-xs font-bold uppercase tracking-wider block">${esc(t.home.release)}</span>
                    <span class="text-white font-medium">2018</span>
                  </div>
                  <div class="space-y-1">
                    <span class="text-gray-500 text-xs font-bold uppercase tracking-wider block">${esc(t.home.status)}</span>
                    <span class="text-green-400 font-bold">${esc(t.home.stats.statusValue)}</span>
                  </div>
                  <div class="space-y-1">
                    <span class="text-gray-500 text-xs font-bold uppercase tracking-wider block">${esc(t.home.type)}</span>
                    <span class="text-white font-medium">${esc(t.home.stats.typeValue)}</span>
                  </div>
                  <div class="col-span-2 sm:col-span-4 flex flex-col gap-3 mt-2">
                    <div class="border-t border-white/5 pt-3">
                      <span class="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">${esc(t.home.author)}</span>
                      <span class="text-white">Muneyuki Kaneshiro &amp; Yusuke Nomura</span>
                    </div>
                    <div class="border-t border-white/5 pt-3">
                      <span class="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">${esc(t.home.synopsis)}</span>
                      <p class="text-sm text-gray-300 leading-relaxed mt-1">${esc(t.home.stats.synopsisValue)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            ${latestChapter ? `
            <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <a href="${getChapterUrl(lang, latestChapter.number)}" class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-bb-blue hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
                ${esc(t.hero.readChapter)} ${latestChapter.number}
              </a>
            </div>` : ''}
          </div>
        </section>

        <!-- Latest Releases Grid -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section class="mb-16">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-3xl font-heading font-bold text-gray-900 dark:text-white">
                ${esc(t.home.latestReleases)}
              </h2>
              <a href="/${lang}/manga" class="text-bb-blue hover:underline font-bold">
                ${esc(t.home.viewAll)} &rarr;
              </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              ${latest12.map(c => `
                <a href="${getChapterUrl(lang, c.number)}" class="group relative flex flex-col justify-between h-full bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-white/10 p-5 hover:border-bb-blue/50 transition-all">
                  <span class="text-xs font-bold text-bb-blue uppercase tracking-wider">${esc(t.home.chapter)} ${c.number}</span>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight mt-1 mb-3">${esc(c.title)}</h3>
                  <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">${esc(t.home.readNow)} &rarr;</span>
                </a>
              `).join('')}
            </div>
          </section>

          <!-- About Editorial Section -->
          <section class="mb-16">
            <div class="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
              <h2 class="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">${esc(t.home.aboutTitle)}</h2>
              <div class="text-gray-700 dark:text-gray-300 space-y-4">
                <p>${esc(t.home.about.p1)}</p>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">${esc(t.home.about.h2)}</h3>
                <p>${esc(t.home.about.p2)}</p>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">${esc(t.home.about.h3)}</h3>
                <p>${esc(t.home.about.p3)}</p>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">${esc(t.home.about.h4)}</h3>
                <p>${esc(t.home.about.p4)}</p>
              </div>
            </div>
          </section>

          <!-- FAQ Section -->
          <section class="mb-16">
            <h2 class="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">${esc(t.home.faqTitle)}</h2>
            <div class="grid gap-6 md:grid-cols-2">
              <div class="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">${esc(t.home.faq.q1)}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">${esc(t.home.faq.a1)}</p>
              </div>
              <div class="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">${esc(t.home.faq.q2)}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">${esc(t.home.faq.a2)}</p>
              </div>
              <div class="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">${esc(t.home.faq.q3)}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">${esc(t.home.faq.a3)}</p>
              </div>
              <div class="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">${esc(t.home.faq.q4)}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">${esc(t.home.faq.a4)}</p>
              </div>
            </div>
          </section>

          <!-- SEO Content Section -->
          <section class="mb-12">
            <div class="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
              <h2 class="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">${esc(t.home.readOnlineTitle)}</h2>
              <div class="text-gray-700 dark:text-gray-300 space-y-4">
                <p>${esc(t.home.seo.p1)}</p>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">${esc(t.home.seo.h2)}</h3>
                <p>${esc(t.home.seo.p2)}</p>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">${esc(t.home.seo.h3)}</h3>
                <p>${esc(t.home.seo.p3)}</p>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">${esc(t.home.seo.h4)}</h3>
                <p>${esc(t.home.seo.p4)}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      ${renderFooter(lang)}
    </div>`;
}

// 2. Manga List Prerender
function renderMangaListContent(lang) {
  const t = locales[lang];
  const chapters = getChaptersForLang(lang);

  return `
    <div class="flex flex-col min-h-screen" style="padding-bottom: 60px;">
      ${renderNav(lang, '/manga')}
      <main class="flex-grow min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
        <div class="relative bg-[#111] border-b border-white/5 py-16 px-4 text-center">
          <span class="text-bb-blue font-bold tracking-widest uppercase text-xs mb-3 block">${esc(t.mangaList.completeCollection)}</span>
          <h1 class="text-4xl md:text-6xl font-heading font-bold text-white mb-6">${esc(t.mangaList.libraryTitle)}</h1>
          <p class="text-gray-400 max-w-2xl mx-auto text-lg font-light">${esc(t.mangaList.libraryDesc)}</p>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div class="text-gray-400 font-bold mb-6">${chapters.length} ${esc(t.mangaList.chaptersCount)}</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            ${chapters.map(c => `
              <a href="${getChapterUrl(lang, c.number)}" class="group relative flex flex-col justify-between h-32 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-white/5 p-5 hover:border-bb-blue/50 transition-all">
                <div>
                  <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">${esc(t.mangaList.chapter)} ${c.number}</span>
                  <h2 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-bb-blue transition-colors line-clamp-1">${esc(c.title)}</h2>
                </div>
                <div class="text-xs font-bold text-gray-400 group-hover:text-bb-blue transition-colors mt-auto pt-2">${esc(t.mangaList.readNow)} &rarr;</div>
              </a>
            `).join('')}
          </div>
        </div>
      </main>
      ${renderFooter(lang)}
    </div>`;
}

// 3. Characters Prerender
function renderCharactersContent(lang) {
  const t = locales[lang];

  return `
    <div class="flex flex-col min-h-screen" style="padding-bottom: 60px;">
      ${renderNav(lang, '/characters')}
      <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-6">${esc(t.characters.title)}</h1>
          <p class="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">${esc(t.characters.subtitle)}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${CHARACTERS.map(char => {
            const transChar = t.characters.list?.[char.id] || char;
            const transRole = t.characters.roles?.[char.role] || char.role;
            return `
              <div class="group flex flex-col bg-[#1a1a1a] rounded-xl border border-white/5 p-6 hover:border-bb-blue/50 transition-all">
                <div class="flex flex-col gap-2 mb-4">
                  <h2 class="text-2xl font-bold text-white group-hover:text-bb-blue transition-colors">${esc(transChar.name || char.name)}</h2>
                  <span class="self-start px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 rounded-md">${esc(transRole)}</span>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed">${esc(transChar.description || char.description)}</p>
              </div>`;
          }).join('')}
        </div>
      </main>
      ${renderFooter(lang)}
    </div>`;
}

// 4. About Page Prerender
function renderAboutContent(lang) {
  const isFr = lang === 'fr';
  const isEs = lang === 'es';
  const title = isFr ? "À Propos de Nous" : (isEs ? "Sobre Nosotros" : "About Our Platform");

  return `
    <div class="flex flex-col min-h-screen" style="padding-bottom: 60px;">
      ${renderNav(lang, '/about')}
      <main class="flex-grow max-w-4xl mx-auto px-4 py-16 min-h-screen">
        <h1 class="text-3xl md:text-4xl font-bold mb-8 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">${esc(title)}</h1>
        <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6">
          <p class="lead text-xl text-gray-600 dark:text-gray-400">
            Welcome to <strong>Blue Lock Manga Hub</strong>, a reader platform crafted specifically for enthusiasts of Muneyuki Kaneshiro and Yusuke Nomura's iconic sports series.
          </p>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Commitment to Readers</h2>
          <p>Our goal is to deliver a smooth, responsive, and distraction-free reading experience. We ensure every panel retains crisp clarity so you can appreciate the intricate art and high-octane drama of every match.</p>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Contact &amp; Feedback</h2>
          <p>Email: <a href="mailto:Support@bluelockhub.com" class="text-bb-blue hover:underline">Support@bluelockhub.com</a></p>
          <div class="bg-gray-100 dark:bg-white/5 p-6 rounded-xl mt-12 border border-gray-200 dark:border-white/10">
            <p class="text-sm text-gray-500 dark:text-gray-400 italic">
              <strong>Disclaimer:</strong> This website is an independent fan project and is not affiliated with Muneyuki Kaneshiro, Yusuke Nomura, Kodansha, or VIZ Media. All manga content, characters, and trademarks remain the property of their respective copyright holders.
            </p>
          </div>
        </div>
      </main>
      ${renderFooter(lang)}
    </div>`;
}

// 5. Legal Page Prerender
function renderLegalContent(lang, type) {
  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    dmca: "DMCA Notice",
    disclaimer: "Disclaimer"
  };
  const title = titles[type] || "Legal";

  return `
    <div class="flex flex-col min-h-screen" style="padding-bottom: 60px;">
      ${renderNav(lang, `/${type}`)}
      <main class="flex-grow max-w-4xl mx-auto px-4 py-16 min-h-screen">
        <h1 class="text-3xl md:text-4xl font-bold mb-8 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">${esc(title)}</h1>
        <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
          <p>At Blue Lock Manga, accessible from our website, we take user experience and transparency seriously.</p>
          <p>For questions or formal inquiries regarding our ${esc(title)}, please reach out to us at <a href="mailto:Support@bluelockhub.com" class="text-bb-blue hover:underline">Support@bluelockhub.com</a>.</p>
        </div>
      </main>
      ${renderFooter(lang)}
    </div>`;
}

// Core routes map
const routes = [
  { path: '', title: "Blue Lock Manga - Read Online High Quality", desc: "Read Blue Lock Manga online in high quality. The best place for Blue Lock chapters, character info, and latest updates. All chapters available.", render: (l) => renderHomeContent(l) },
  { path: '/manga', title: "Blue Lock Manga Library - All Chapters", desc: "Browse the complete collection of Blue Lock manga chapters. Read online in high quality.", render: (l) => renderMangaListContent(l) },
  { path: '/characters', title: "Blue Lock Manga Characters - Database", desc: "Detailed profiles of Blue Lock Manga characters including Yoichi Isagi, Meguru Bachira, Rensuke Kunigami and more.", render: (l) => renderCharactersContent(l) },
  { path: '/about', title: "About Us - Blue Lock Manga", desc: "Learn about our dedicated reader platform built for fans to follow Blue Lock manga chapters and story updates.", render: (l) => renderAboutContent(l) },
  { path: '/privacy', title: "Privacy Policy - Blue Lock Manga", desc: "Read our Privacy Policy.", render: (l) => renderLegalContent(l, 'privacy') },
  { path: '/terms', title: "Terms of Service - Blue Lock Manga", desc: "Read our Terms of Service.", render: (l) => renderLegalContent(l, 'terms') },
  { path: '/dmca', title: "DMCA Notice - Blue Lock Manga", desc: "Read our DMCA Notice.", render: (l) => renderLegalContent(l, 'dmca') },
  { path: '/disclaimer', title: "Disclaimer - Blue Lock Manga", desc: "Read our Disclaimer.", render: (l) => renderLegalContent(l, 'disclaimer') }
];

const distDir = path.join(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('❌ dist/index.html not found! Run "vite build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');

let generatedCount = 0;

for (const route of routes) {
  for (const lang of ['en', 'fr', 'es']) {
    const canonicalUrl = `${DOMAIN}/${lang}${route.path}`;
    const enUrl = `${DOMAIN}/en${route.path}`;
    const frUrl = `${DOMAIN}/fr${route.path}`;
    const esUrl = `${DOMAIN}/es${route.path}`;

    // Custom titles per language if needed
    let pageTitle = route.title;
    if (lang === 'fr') {
      if (route.path === '/about') pageTitle = "À Propos - Blue Lock Manga";
      if (route.path === '/manga') pageTitle = "Bibliothèque Manga Blue Lock - Tous les Chapitres";
    } else if (lang === 'es') {
      if (route.path === '/about') pageTitle = "Sobre Nosotros - Blue Lock Manga";
      if (route.path === '/manga') pageTitle = "Biblioteca Manga Blue Lock - Todos los Capítulos";
    }

    // Build head tags to inject
    const headAdditions = `
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="en" href="${enUrl}" />
  <link rel="alternate" hreflang="fr" href="${frUrl}" />
  <link rel="alternate" hreflang="es" href="${esUrl}" />
  <link rel="alternate" hreflang="x-default" href="${enUrl}" />`;

    // Replace in template
    let pageHtml = templateHtml
      .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(pageTitle)}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(route.desc)}" />`)
      .replace('</head>', `${headAdditions}\n</head>`);

    // Inject prerendered content into <div id="root"></div>
    const renderedBody = route.render(lang);
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${renderedBody}</div>`);

    // Target directory
    const targetDir = route.path === ''
      ? path.join(distDir, lang)
      : path.join(distDir, lang, route.path.replace(/^\//, ''));

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');
    generatedCount++;
  }
}

// Copy 404.html into dist
const public404 = path.join(__dirname, '../public/404.html');
if (fs.existsSync(public404)) {
  fs.copyFileSync(public404, path.join(distDir, '404.html'));
  console.log('✅ Copied public/404.html to dist/404.html');
}

console.log(`✅ Successfully prerendered ${generatedCount} static HTML pages in dist/!`);
