import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";
import { fetchTranslation, fetchLanguages } from "../apiService/translationService.js";

const storedLanguage = Cookies.get('language') || 'en';

const attrLanguages = async () => {
    return await fetchLanguages();
}

const initializeI18n = async () => {
    const languages = await attrLanguages();
    const translations = await Promise.all(languages.map(language => fetchTranslation(language)));

    const resources = languages.reduce((acc, language, index) => {
        acc[language] = { translation: translations[index] };
        return acc;
    }, {});

    return resources;
}

const resources = await initializeI18n();

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: storedLanguage,
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        ns: "translation",
        defaultNS: "translation"
    });

export default i18n;
