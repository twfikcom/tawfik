import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'es' | 'fr';

interface TranslationContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  // Fix: Changed return type to any to allow for both string and object translations, resolving ReactNode type errors.
  t: (key: string) => any;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const getNestedValue = (obj: any, key: string) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};


export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<Language, any> | null>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const languages: Language[] = ['en', 'ar', 'es', 'fr'];
        // Get base path - Vite sets BASE_URL during build
        const basePath = (import.meta as any).env?.BASE_URL || '/tawfik/';
        const responses = await Promise.all(
            languages.map(lang => fetch(`${basePath}locales/${lang}.json`))
        );
        const data = await Promise.all(responses.map(res => res.json()));
        
        const translationsData = languages.reduce((acc, lang, index) => {
            acc[lang] = data[index];
            return acc;
        }, {} as Record<Language, any>);
        
        setTranslations(translationsData);

      } catch (error) {
        console.error("Failed to load translation files", error);
        setTranslations({ en: {}, ar: {}, es: {}, fr: {} });
      }
    };

    fetchTranslations();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  // Fix: Changed return type to any to allow for both string and object translations, resolving ReactNode type errors.
  const t = (key: string): any => {
    if (!translations) {
      return key;
    }
    const currentTranslations = translations[language];
    const translation = getNestedValue(currentTranslations, key);
    return translation || key;
  };
  
  if (!translations) {
    return null; 
  }

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
