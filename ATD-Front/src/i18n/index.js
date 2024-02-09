import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInFr from '../locales/fr/translation.json';
import translationsInEng from '../locales/en/translation.json';
import Cookies from "js-cookie";


const storedLanguage = Cookies.get('language') || 'en'; // Utilise "fr" si le cookie n'est pas défini.

// the translations
const resources = {
    fr: {
        translation: translationsInFr
    },
    en: {
        translation: translationsInEng
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources, // resources are important to load translations for the languages.
        lng: storedLanguage, // It acts as default language. When the site loads, content is shown in this language.
        debug: true,
        fallbackLng: "fr", // use de if selected language is not available
        interpolation: {
            escapeValue: false
        },
        ns: "translation", // namespaces help to divide huge translations into multiple small files.
        defaultNS: "translation"
    });

export default i18n;