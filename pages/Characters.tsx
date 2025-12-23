import React from 'react';
import SEOHead from '../components/SEOHead';
import { CHARACTERS } from '../constants';

const Characters: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead
        title="Jujutsu Kaisen Manga Characters - Database"
        description="Detailed profiles of Jujutsu Kaisen Manga characters including Yuji Itadori, Satoru Gojo, Sukuna and more. Learn about their Cursed Techniques."
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl font-heading font-bold dark:text-white mb-4">Jujutsu Kaisen Manga Characters</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive database of every character in the Jujutsu Kaisen manga. Learn about their grades, abilities, and roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHARACTERS.map((char) => (
          <div key={char.id} className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-white/5 flex flex-col p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-jjk-red transition-colors">{char.name}</h2>
                <span className="inline-block px-2 py-1 text-xs font-bold text-jjk-red bg-red-50 dark:bg-red-900/10 rounded uppercase tracking-wider">
                  {char.role}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full">
                {char.grade}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
              {char.description}
            </p>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
              <button className="text-sm font-bold text-gray-900 dark:text-white hover:text-jjk-red transition-colors flex items-center gap-1">
                Read Full Profile <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;