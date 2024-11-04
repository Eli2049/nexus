import React, { useContext } from 'react';
import { Globe } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
      aria-label="Switch language"
    >
      <Globe size={20} />
      <span className="font-medium">{language.toUpperCase()}</span>
    </button>
  );
}