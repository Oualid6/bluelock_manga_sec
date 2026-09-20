import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { lang, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="max-w-md">
            <h3 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              BLUE <span className="text-bb-blue">LOCK MANGA</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              {t.footer.description}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              {t.footer.disclaimer}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{t.footer.explore}</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to={`/${lang}/manga`} className="hover:text-bb-blue transition-colors">{t.nav.allChapters}</Link></li>
                <li><Link to={`/${lang}/chapter/1`} className="hover:text-bb-blue transition-colors">{t.footer.startReading}</Link></li>
                <li><Link to={`/${lang}/characters`} className="hover:text-bb-blue transition-colors">{t.nav.characters}</Link></li>
                <li><Link to={`/${lang}/about`} className="hover:text-bb-blue transition-colors">{t.footer.aboutUs}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{t.footer.legal}</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to={`/${lang}/privacy`} className="hover:text-bb-blue transition-colors">{t.footer.privacy}</Link></li>
                <li><Link to={`/${lang}/terms`} className="hover:text-bb-blue transition-colors">{t.footer.terms}</Link></li>
                <li><Link to={`/${lang}/dmca`} className="hover:text-bb-blue transition-colors">{t.footer.dmca}</Link></li>
                <li><Link to={`/${lang}/disclaimer`} className="hover:text-bb-blue transition-colors">Disclaimer</Link></li>
                <li><a href="mailto:Support@bluelockhub.com" className="hover:text-bb-blue transition-colors">{t.footer.contact}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center md:text-left">
            &copy; {currentYear} {t.footer.allRightsReserved}
          </p>
          <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-600 font-medium">
            <span>{t.footer.madeForFans}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;