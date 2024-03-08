import {useState} from "react";
import i18n from '../i18n';
import Cookies from 'js-cookie';
import { fetchLanguageIcon } from "../apiService/translationService.js";

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const availableLanguages = Object.keys(i18n.options.resources);
    const chooseLanguage = (e) => {
        i18n.changeLanguage(e);
        setSelectedLanguage(e);
        Cookies.set('language', e,  { expires: 30 })
    }

    const getImageForLanguage = async (lang) => {

            return await fetchLanguageIcon(lang)
    }

    return (
        <div>
            <button
                type="button"
                data-dropdown-toggle="language-dropdown-menu"
                className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <img style={{width: '24px', height: '24px', marginRight: '8px'}}
                     src={getImageForLanguage(selectedLanguage)} alt={`Flag for ${selectedLanguage}`}/>
                <p>{i18n.t('languages.' + selectedLanguage)}</p>
            </button>
            <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                id="language-dropdown-menu"
            >
                <ul className="py-2 font-medium" role="none">
                    {availableLanguages.map((lang) => (
                        <li key={lang}>
                            <button
                                className={`block px-4 py-4 text-sm flex items-center ${selectedLanguage === lang ? 'font-semibold' : 'font-medium'} text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
                                role="menuitem"
                                onClick={() => chooseLanguage(lang)}
                            >
                                <img style={{width: '24px', height: '24px', marginRight: '8px'}}
                                     src={getImageForLanguage(lang)} alt={`Flag for ${lang}`}/>
                                <p>{i18n.t('languages.' + lang)}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
        ;
};

export default LanguageSelector;
