import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { Home, BookOpen, AlertCircle } from 'lucide-react';

interface NotFoundProps {
  chapterNotFound?: boolean;
  chapterNumber?: number;
}

const NotFound: React.FC<NotFoundProps> = ({ chapterNotFound, chapterNumber }) => {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <SEOHead
        title="404 - Page Not Found | Blue Lock Manga"
        description="The requested page could not be found. Explore Blue Lock manga chapters and character guides."
        canonicalUrl={`https://bluelockhub.com/${lang}`}
        noindex={true}
      />
      <div className="max-w-md w-full text-center bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={36} />
        </div>
        <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
          404
        </h1>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {chapterNotFound
            ? `Chapter ${chapterNumber || ''} Not Found`
            : 'Page Not Found'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed">
          {chapterNotFound
            ? 'This chapter does not exist or has not been released yet. Check our complete chapter list to read all available releases.'
            : 'The page you are looking for does not exist, has been removed, or is temporarily unavailable.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={`/${lang}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-bb-blue hover:bg-blue-600 text-white font-bold text-sm transition-colors shadow-md"
          >
            <Home size={16} />
            {t.reader?.home || 'Homepage'}
          </Link>
          <Link
            to={`/${lang}/manga`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 font-bold text-sm transition-colors border border-gray-200 dark:border-white/10"
          >
            <BookOpen size={16} />
            {t.nav?.allChapters || 'All Chapters'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
