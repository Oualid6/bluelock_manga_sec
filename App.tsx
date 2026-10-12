import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MangaProvider } from './context/MangaContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-GBEBWTWKZQ';

// Component to track page views on client-side route changes
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const gtag = window.gtag || (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
      });
    }
  }, [location]);

  return null;
};

// Home is eagerly imported — it's the landing page and must load instantly
// to avoid the JS chain: index → Home → SEOHead → icons (saves ~400ms TBT)
import Home from './pages/Home';

// Lazy load non-landing pages for performance
const MangaList = lazy(() => import('./pages/MangaList'));
const ChapterReader = lazy(() => import('./pages/ChapterReader'));
const Characters = lazy(() => import('./pages/Characters'));
const About = lazy(() => import('./pages/About'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Redirect helper for English chapter canonical pattern
const EnChapterRedirect: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  return <Navigate to={`/chapter/${chapterId || '1'}`} replace />;
};

// Wrapper to conditionally render layout based on path
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen" style={{ paddingBottom: '60px' }}>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const App: React.FC = () => {

  return (
    <MangaProvider>
      <ThemeProvider>
        <Router>
          <AnalyticsTracker />
          {/* Helps scroll to top on navigation */}
          <div className="font-sans antialiased text-gray-100 bg-[#121212] transition-colors duration-200 min-h-screen select-none">
            <Suspense fallback={<LoadingSpinner />}>
              <LanguageProvider>
                <Routes>
                  {/* Root and Legacy 301-equivalent client fallbacks */}
                  <Route path="/" element={<Navigate to="/en" replace />} />
                  <Route path="/manga" element={<Navigate to="/en/manga" replace />} />
                  <Route path="/characters" element={<Navigate to="/en/characters" replace />} />
                  <Route path="/about" element={<Navigate to="/en/about" replace />} />
                  <Route path="/terms" element={<Navigate to="/en/terms" replace />} />
                  <Route path="/privacy" element={<Navigate to="/en/privacy" replace />} />
                  <Route path="/dmca" element={<Navigate to="/en/dmca" replace />} />
                  <Route path="/disclaimer" element={<Navigate to="/en/disclaimer" replace />} />

                  {/* English Chapter Canonical Redirect: /en/chapter/:id -> /chapter/:id */}
                  <Route path="/en/chapter/:chapterId" element={<EnChapterRedirect />} />

                  {/* Multilingual Core Routes */}
                  <Route path="/:lang" element={<LayoutWrapper><Home /></LayoutWrapper>} />
                  <Route path="/:lang/manga" element={<LayoutWrapper><MangaList /></LayoutWrapper>} />
                  <Route path="/:lang/characters" element={<LayoutWrapper><Characters /></LayoutWrapper>} />
                  <Route path="/:lang/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
                  <Route path="/:lang/terms" element={<LayoutWrapper><Legal type="terms" /></LayoutWrapper>} />
                  <Route path="/:lang/privacy" element={<LayoutWrapper><Legal type="privacy" /></LayoutWrapper>} />
                  <Route path="/:lang/dmca" element={<LayoutWrapper><Legal type="dmca" /></LayoutWrapper>} />
                  <Route path="/:lang/disclaimer" element={<LayoutWrapper><Legal type="disclaimer" /></LayoutWrapper>} />

                  {/* Canonical English Reader */}
                  <Route path="/chapter/:chapterId" element={<ChapterReader />} />

                  {/* Localized Non-English Reader */}
                  <Route path="/:lang/chapter/:chapterId" element={<ChapterReader />} />

                  {/* 404 Not Found */}
                  <Route path="*" element={<LayoutWrapper><NotFound /></LayoutWrapper>} />
                </Routes>
              </LanguageProvider>
            </Suspense>
          </div>
        </Router>
      </ThemeProvider>
    </MangaProvider>
  );
};

export default App;