import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import de from '../locales/de/common.json';
import en from '../locales/en/common.json';

// Define the available languages
export type Language = 'de' | 'en';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  setLanguage: () => {},
  t: (key) => key,
  tArray: (key) => [],
});

// Translations map
const translations = {
  de,
  en,
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load the language from localStorage if available
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage as Language) || 'de';
    }
    return 'de';
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Enhanced translation function that supports nested keys
  const t = (key: string): string | string[] => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let result: any = translations[language];
    
    // Traverse the nested structure
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key itself if translation is not found
      }
    }
    
    // Handle string interpolation with simple variables
    if (typeof result === 'string') {
      // Replace {year} with the current year
      result = result.replace('{year}', new Date().getFullYear().toString());
    }
    
    return result;
  };

  // Type-safe translation functions
  const tString = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  };

  const tArray = (key: string): string[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [result];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: tString, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
