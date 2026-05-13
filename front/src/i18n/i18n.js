import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'

import es from '../locales/es.json';
import en from '../locales/en.json';
import emojiEs from '../locales/emojis/es';
import emojiEn from '../locales/emojis/en';
import iconEs from '../locales/icons/es';
import iconEn from '../locales/icons/en';

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es, emojis: emojiEs.emojis, icons: iconEs.icons },
      en: { translation: en, emojis: emojiEn.emojis, icons: iconEn.icons }
    },
    fallbackLng: 'en', // If translation missing use English
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;