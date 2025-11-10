import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

void i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${process.env.PUBLIC_URL || ''}/locales/{{lng}}/{{ns}}.json`,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;