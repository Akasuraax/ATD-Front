import { useState } from "react";
import i18n from '../i18n';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const availableLanguages = Object.keys(i18n.options.resources);
    const { t } = useTranslation();

    const chooseLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setSelectedLanguage(lang);
        Cookies.set('language', lang, { expires: 30 });
    }

    return (
        <li>
            <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
            >
                <i className="fi fi-br-language"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{t("sidebar.language")}</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <ul id="dropdown-example" className="hidden py-2 space-y-2">
                {availableLanguages.map((lang) => (

                    <li key={lang}>
                        <button
                            className={`block px-4 py-4 text-sm flex items-center ${selectedLanguage === lang ? 'font-semibold' : 'font-medium'} text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
                            role="menuitem"
                            onClick={() => chooseLanguage(lang)}
                        >
                            <p>{i18n.t('languages.' + lang)}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default LanguageSelector;
