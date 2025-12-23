import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="max-w-md">
            <h3 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              JUJUTSU <span className="text-jjk-red">KAISEN MANGA</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Your premiere destination for reading Jujutsu Kaisen manga online.
              High quality scans, fast loading, and the latest chapter updates.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Fan Project. Not affiliated with Gege Akutami or Shueisha.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Explore</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/manga" className="hover:text-jjk-red transition-colors">All Chapters</Link></li>
                <li><Link to="/chapter/1" className="hover:text-jjk-red transition-colors">Start Reading</Link></li>
                <li><Link to="/characters" className="hover:text-jjk-red transition-colors">Characters</Link></li>
                <li><Link to="/about" className="hover:text-jjk-red transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/privacy" className="hover:text-jjk-red transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-jjk-red transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/dmca" className="hover:text-jjk-red transition-colors">DMCA</Link></li>
                <li><Link to="/disclaimer" className="hover:text-jjk-red transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center md:text-left">
            &copy; {currentYear} Jujutsu Kaisen Manga Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-600 font-medium">
            <span>Made for fans by fans</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;