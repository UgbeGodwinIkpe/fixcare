import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './english';
import french from './french';
import spanish from './spanish';
import german from './german';
import india from './india';

const resources = {
  en: {
    translation: english
  },
  fr: {
    translation: french
  },
  es: {
    translation: spanish
  },
  de: {
    translation: german
  },
  hi: {
    translation: india, 
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  interpolation: {
    escapeValue: false // React already handles escaping
  }
});

export default i18n;