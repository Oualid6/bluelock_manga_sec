import React, { createContext, useContext, ReactNode } from 'react';
import { en } from '../locales/en';
import { fr } from '../locales/fr';
import { es } from '../locales/es';
import { useLocation } from 'react-router-dom';

type Translations = typeof en;

export type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  lang: Language;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  // Assume the first part after the domain is the language (e.g. /fr/manga or /es/manga)
  const langParam = pathParts[1];
  
  const lang: Language = langParam === 'fr' ? 'fr' : (langParam === 'es' ? 'es' : 'en');
  const t = lang === 'fr' ? fr : (lang === 'es' ? es : en);

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
