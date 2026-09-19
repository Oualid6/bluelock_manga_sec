import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Search, Send } from 'lucide-react';

const Navbar: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  type NavLink = { name: string; path: string; isExternal?: boolean };
  const navLinks: NavLink[] = [
    { name: t.nav.home, path: `/${lang}` },
    { name: t.nav.allChapters, path: `/${lang}/manga` },
    { name: t.nav.characters, path: `/${lang}/characters` },
    { name: 'Telegram', path: 'https://t.me/ManganexChannel', isExternal: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const switchLanguage = (newLang: 'en' | 'fr' | 'es') => {
    if (newLang === lang) return;
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    // If it's a chapter route like /chapter/1 (no lang prefix) or /en/chapter/1 or /fr/chapter/1 or /es/chapter/1
    if (pathParts[0] === 'chapter') {
        navigate(newLang === 'en' ? `/chapter/${pathParts.slice(1).join('/')}` : `/${newLang}/${pathParts.join('/')}`);
        return;
    } else if (pathParts[1] === 'chapter') {
        pathParts[0] = newLang;
        navigate(newLang === 'en' ? `/chapter/${pathParts.slice(1).join('/')}` : `/${pathParts.join('/')}`);
        return;
    }

    // Default replacement for /en/manga, /fr/characters, /es/manga, etc.
    if (pathParts.length > 0) {
        pathParts[0] = newLang;
    } else {
        pathParts.push(newLang);
    }
    navigate(`/${pathParts.join('/')}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/95 border-b border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to={`/${lang}`} className="flex-shrink-0 flex items-center gap-2 group">
            <img src="/logo.webp" alt="Blue Lock Manga" width="80" height="15" className="h-10 w-auto" loading="eager" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-base font-bold tracking-wide transition-colors text-gray-300 hover:text-bb-blue hover:bg-white/5"
                  >
                    <Send size={16} className="text-[#0088cc]" />
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-base font-bold tracking-wide transition-colors ${isActive(link.path)
                      ? 'text-bb-blue font-bold'
                      : 'text-gray-300 hover:text-bb-blue hover:bg-white/5'
                      }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex bg-gray-900 rounded-full border border-gray-800 p-0.5">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'en' ? 'bg-bb-blue text-white' : 'text-gray-400 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('fr')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'fr' ? 'bg-bb-blue text-white' : 'text-gray-400 hover:text-white'}`}
              >
                FR
              </button>
              <button
                onClick={() => switchLanguage('es')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'es' ? 'bg-bb-blue text-white' : 'text-gray-400 hover:text-white'}`}
              >
                ES
              </button>
            </div>
            <Link to={`/${lang}/manga`} className="p-2 text-gray-400 hover:text-bb-blue" aria-label="Search">
              <Search size={24} strokeWidth={2.5} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-bb-blue focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-bold tracking-wide text-gray-700 dark:text-gray-300 hover:text-bb-blue"
                >
                  <Send size={16} className="text-[#0088cc]" />
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-bold tracking-wide ${isActive(link.path)
                    ? 'text-bb-blue bg-gray-50 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:text-bb-blue'
                    }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="flex justify-between items-center px-3 py-2 border-b border-gray-800">
              <span className="text-gray-400 text-sm font-medium">Language</span>
              <div className="flex bg-gray-900 rounded-full border border-gray-800 p-0.5">
                <button
                  onClick={() => switchLanguage('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'en' ? 'bg-bb-blue text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLanguage('fr')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'fr' ? 'bg-bb-blue text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  FR
                </button>
                <button
                  onClick={() => switchLanguage('es')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'es' ? 'bg-bb-blue text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  ES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;