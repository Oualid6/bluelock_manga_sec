import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowDown, ArrowRight, Send, ArrowLeft, ArrowUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useManga } from '../context/MangaContext';
import { useLanguage } from '../context/LanguageContext';
import { Chapter } from '../types';
import ResponsiveBanner from '../components/ads/ResponsiveBanner';

const ChapterReader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { chapters } = useManga();
  const { lang, t } = useLanguage();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [readingMode, setReadingMode] = useState<'vertical' | 'horizontal'>('vertical');

  const [showScrollTop, setShowScrollTop] = useState(false);
  // Use a number for parsing
  const currentNum = parseFloat(chapterId || "0");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const found = chapters.find(c => c.number === currentNum);
      if (found) {
        setChapter(found);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    }, 500);
  }, [currentNum, chapters]);

  // Hide controls on scroll down, show on scroll up
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
      setShowScrollTop(currentScrollY > 600);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload first 2 images for LCP optimization
  useEffect(() => {
    if (chapter) {
      const displayPages = lang === 'fr' ? (chapter.pagesFr || []) : chapter.pages;
      const pagesToLoad = displayPages;
      pagesToLoad.slice(0, 2).forEach((url) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      });
    }
  }, [chapter]);


  const isLocked = chapter?.number === 354;

  useEffect(() => {
    if (isLocked) {
      const scriptId = 'ogjs';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.src = 'https://appsave.online/cl/js/grjkjr';
        document.head.appendChild(script);
      }
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isLocked]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-bb-dark">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-bb-blue"></div>
      </div>
    );
  }

  if (!chapter) {
    return <div className="p-10 text-center dark:text-white">Chapter not found.</div>;
  }

  // Find adjacent chapters using sorted array position (supports sub-chapters like 346.2)
  const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);
  const currentIndex = sortedChapters.findIndex(c => c.number === currentNum);
  const prevChapter = currentIndex > 0 ? sortedChapters[currentIndex - 1] : undefined;
  const nextChapter = (lang === 'fr' && currentNum >= 343 && currentNum !== 354) ? undefined : (currentIndex < sortedChapters.length - 1 ? sortedChapters[currentIndex + 1] : undefined);

  let displayPages = lang === 'fr' ? (chapter.pagesFr || []) : chapter.pages;

  if (isLocked && displayPages.length === 0) {
    displayPages = chapter.pages; // Use english pages as fallback for blurred background
  }

  const handleNav = (num: number) => {
    if (num !== undefined) navigate(lang === 'fr' ? `/fr/chapter/${num}` : `/chapter/${num}`);
  }

  return (
    <div className="bg-gray-100 dark:bg-[#121212] min-h-screen flex flex-col" style={{ paddingBottom: '60px' }}>
      <SEOHead
        title={`Blue Lock ${t.reader.chapter} ${chapter.number}${chapter.title ? `: ${chapter.title.replace('Chapter', t.reader.chapter)}` : ''} - Read Online`}
        description={`Read Blue Lock Manga ${t.reader.chapter} ${chapter.number}${chapter.title ? `: ${chapter.title.replace('Chapter', t.reader.chapter)}` : ''} online in high quality free. Official English scans available.`}
        canonicalUrl={`https://bluelocken.com${lang === 'fr' ? '/fr' : ''}/chapter/${chapter.number}`}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `Blue Lock ${t.reader.chapter} ${chapter.number}${chapter.title ? `: ${chapter.title.replace('Chapter', t.reader.chapter)}` : ''}`,
            "image": displayPages[0] || "",
            "datePublished": chapter.releaseDate,
            "author": {
              "@type": "Person",
              "name": "Muneyuki Kaneshiro"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": t.reader.home,
                "item": `https://bluelocken.com/${lang}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Manga",
                "item": `https://bluelocken.com/${lang}/manga`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": `${t.reader.chapter} ${chapter.number}`
              }
            ]
          }
        ]}
      />



      {/* Sticky Top Controls */}
      <div className={`fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 shadow-md transition-transform duration-300 z-50 ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-2 md:px-4 h-16 flex items-center justify-between gap-2">
          {/* Left: Library Back and Title */}
          <div className="flex items-center gap-1 md:gap-3 min-w-0">
            <Link to={`/${lang}/manga`} className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0" title={t.reader.backToChapters}>
              <ArrowLeft size={22} className="dark:text-white md:w-6 md:h-6" />
            </Link>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] md:text-xs text-bb-blue font-bold uppercase tracking-wider hidden sm:block">Reading</span>
              <h1 className="font-bold text-sm md:text-lg dark:text-white whitespace-nowrap">
                Ch. {chapter.number}
              </h1>
            </div>
          </div>

          {/* Right: Controls (Toggle + Nav) */}
          <div className="flex items-center gap-1 md:gap-4 flex-shrink-0">

            {/* Mode Toggle */}
            <div className="flex items-center gap-0.5 md:gap-1 bg-gray-100 dark:bg-black/20 p-1 rounded-lg">
              <button
                onClick={() => setReadingMode('vertical')}
                className={`p-1.5 md:p-2 rounded-md transition-all ${readingMode === 'vertical' ? 'bg-white dark:bg-bb-blue text-bb-blue dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                title="Vertical Scroll"
              >
                <ArrowDown size={18} className="md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => setReadingMode('horizontal')}
                className={`p-1.5 md:p-2 rounded-md transition-all ${readingMode === 'horizontal' ? 'bg-white dark:bg-bb-blue text-bb-blue dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                title="Horizontal Slide"
              >
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </button>
            </div>

            {/* Prev/Next Nav */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                disabled={!prevChapter}
                onClick={() => prevChapter && handleNav(prevChapter.number)}
                className="p-1.5 md:p-2 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md dark:text-white transition-colors"
              >
                <ChevronLeft size={22} className="md:w-6 md:h-6" />
              </button>
              <button
                disabled={!nextChapter}
                onClick={() => nextChapter && handleNav(nextChapter.number)}
                className="p-1.5 md:p-2 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md dark:text-white transition-colors"
              >
                <ChevronRight size={22} className="md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div className={`flex-1 pt-16 relative ${readingMode === 'horizontal' ? 'h-[calc(100vh-64px)] overflow-hidden' : ''} ${isLocked ? 'blur-[8px] pointer-events-none select-none h-screen overflow-hidden' : ''}`}>
        {displayPages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-transparent">
            <div className="w-full max-w-3xl mb-8">
              <ResponsiveBanner />
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 max-w-md w-full shadow-2xl">
              {((lang === 'fr' && chapter.number >= 343) || (lang !== 'fr' && chapter.number >= 354)) && (
                <h1 className="text-xl md:text-2xl font-heading font-bold text-bb-blue mb-2 text-center">
                  Blue Lock Manga {t.reader.chapter} {chapter.number}
                </h1>
              )}
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">{t.reader.availableSoon}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {((lang === 'fr' && chapter.number >= 343) || (lang !== 'fr' && chapter.number >= 354)) 
                  ? t.reader.nextChapterSoon
                  : "This chapter is still being uploaded. You can try reading it early on our partner server."}
              </p>
              <div className="flex flex-col gap-3">
                {((lang === 'fr' && chapter.number >= 343) || (lang !== 'fr' && chapter.number >= 354)) && (
                  <a
                    href="https://t.me/Mangalix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold rounded-lg transition-all"
                  >
                    <Send size={20} />
                    {t.reader.joinTelegram}
                  </a>
                )}
                <button
                  onClick={() => navigate(`/${lang}/manga`)}
                  className="px-6 py-3 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold rounded-lg transition-all"
                >
                  {t.reader.backToChapters}
                </button>
              </div>
            </div>
          </div>
        ) : readingMode === 'vertical' ? (
          <div className="max-w-4xl mx-auto bg-white dark:bg-black shadow-2xl min-h-screen cursor-pointer" onClick={() => setShowControls(!showControls)}>
            {displayPages.map((pageUrl, idx) => (
              <React.Fragment key={idx}>
                <img
                  src={pageUrl}
                  alt={`Blue Lock Chapter ${chapter.number} Page ${idx + 1}`}
                  title={`Blue Lock Chapter ${chapter.number} - Page ${idx + 1}`}
                  width="800"
                  height="1200"
                  className="w-full h-auto block bg-gray-100 dark:bg-gray-900 mx-auto transition-opacity duration-500 opacity-0"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).classList.remove('opacity-0');
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {idx === 0 && (
                  <ResponsiveBanner />
                )}

              </React.Fragment>
            ))}
          </div>
        ) : (
          // Horizontal Layout
          <div className="h-full w-full flex overflow-x-auto snap-x snap-mandatory bg-black items-center scroll-smooth" id="horizontal-reader" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const isRight = e.clientX > rect.width / 2;
            const scrollAmount = rect.width;
            e.currentTarget.scrollBy({ left: isRight ? scrollAmount : -scrollAmount, behavior: 'smooth' });
          }}>
            {displayPages.map((pageUrl, idx) => (
              <React.Fragment key={idx}>
                <div className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-2 relative cursor-pointer">
                  <img
                    src={pageUrl}
                    alt={`Blue Lock Chapter ${chapter.number} Page ${idx + 1}`}
                    title={`Blue Lock Chapter ${chapter.number} - Page ${idx + 1}`}
                    width="800"
                    height="1200"
                    className="max-h-full max-w-full object-contain shadow-2xl bg-gray-900 mx-auto transition-opacity duration-500 opacity-0"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).classList.remove('opacity-0');
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      // Also hide the counter for this slide if image fails
                      const parent = target.parentElement;
                      if (parent) parent.style.display = 'none';
                    }}
                  />
                  <span className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-mono">
                    {idx + 1} / {displayPages.length}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}

      </div>



      {/* Navigation Footer (Visible in all modes, pushed to bottom) */}
      <div className="bg-white dark:bg-[#121212] relative z-10 block">
        <div className="max-w-4xl mx-auto pt-10 pb-20 px-4 flex flex-col items-center gap-10">

          <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500">
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-800"></div>
            <span className="uppercase tracking-[0.2em] text-xs font-bold">{t.reader.endOfChapter} {chapter.number}</span>
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl">
            {prevChapter ? (
              <button
                onClick={() => handleNav(prevChapter.number)}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 p-6 text-left hover:border-gray-300 dark:hover:border-white/20 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{t.reader.prev}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-bb-blue transition-colors">{t.reader.chapter} {prevChapter.number}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-bb-blue group-hover:text-white transition-all">
                    <ChevronLeft size={20} />
                  </div>
                </div>
              </button>
            ) : <div />}

            {nextChapter ? (
              <button
                onClick={() => handleNav(nextChapter.number)}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 p-6 text-right hover:border-bb-blue/50 dark:hover:border-bb-blue/50 transition-all hover:shadow-xl hover:shadow-bb-blue/10 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bb-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-center justify-between flex-row-reverse">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{t.reader.next}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-bb-blue transition-colors">{t.reader.chapter} {nextChapter.number}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-bb-blue/10 text-bb-blue flex items-center justify-center group-hover:bg-bb-blue group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </button>
            ) : (
              <button disabled className="rounded-2xl bg-gray-100 dark:bg-white/5 border border-transparent p-6 text-center cursor-not-allowed opacity-50">
                <span className="font-bold text-gray-500">{t.reader.latestChapter}</span>
              </button>
            )}
          </div>
        </div>

      </div>


      {/* SEO Footer (Visible in all modes, pushed to bottom) */}
      <div className="bg-black py-12 px-4 border-t border-white/10 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-bb-blue font-bold uppercase tracking-widest mb-4 text-xs">Blue Lock Manga</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
            You are reading <strong className="text-gray-400">Blue Lock {t.reader.chapter} {chapter.number}</strong> in English high quality.
            Read Blue Lock Manga Online.
            <br className="hidden sm:block" />
            Keywords: Blue Lock {t.reader.chapter} {chapter.number}, Read Blue Lock {t.reader.chapter} {chapter.number}, Yoichi Isagi, Meguru Bachira, Weekly Shonen Magazine, Sports Manga, Thriller.
          </p>
        </div>
      </div>
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 bg-bb-blue text-white rounded-full shadow-lg transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        title="Back to Top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default ChapterReader;