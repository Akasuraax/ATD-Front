import React, {useEffect, useState} from "react";
import i18n from '../i18n';
import Cookies from 'js-cookie';

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const chooseLanguage = (e) => {
        e.preventDefault();
        const newLanguage = e.target.value;
        i18n.changeLanguage(newLanguage);
        setSelectedLanguage(newLanguage);
        Cookies.set('language', newLanguage,  { expires: 30 })
    }

    return (
        <select value={selectedLanguage} onChange={chooseLanguage}>
            <option value="fr">French</option>
            <option value="en">English</option>
        </select>
    );
};

export default LanguageSelector;
