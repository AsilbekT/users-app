import en from '@/assets/translations/en.json';
import ru from '@/assets/translations/ru.json';
import uz from '@/assets/translations/uz.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  en,
  ru,
  uz,
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    saveMissing: true,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('missingKey', (...args) => {
  console.log(args);
});

export default i18n;
