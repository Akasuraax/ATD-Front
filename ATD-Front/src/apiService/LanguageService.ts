import {getRequest, deleteRequest, postRequest} from './apiService.js';
import axios from "axios";
import Cookies from "js-cookie";
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*",
    };
    axios.defaults.headers.common['Authorization'] = `${ Cookies.get("token")}`;
    return headers;
};

const getHeaders2 = () => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin" : "*",
    };
    axios.defaults.headers.common['Authorization'] = `${ Cookies.get("token")}`;
    return headers;
};

export const postLanguage = async (languageData, pushToast) => {
    try {
        const formData = new FormData();
        formData.append('abbreviation', languageData.abbreviation);
        formData.append('language_file', languageData.file);
        const res = await axios.post(`${API_BASE_URL}/language`, formData, {headers: getHeaders2()});
        pushToast({
            content: "L'élément a bien été envoyé",
            type: "success"
        });
        return res.data
    } catch(error) {
        pushToast({
            content: "Une erreur est survenue",
            type: "failure"
        });
        throw error;
    }
};

export const getLanguages = async (pushToast) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/languages`, {headers: getHeaders()});
        return res.data
    } catch {
        pushToast({
            content: "Une erreur est survenue lors de la récupération des éléments",
            type: "failure"
        });
        return null
    }
};

export const getLanguage = async (abbreviation, pushToast) => {
    return getRequest(`languages/${abbreviation}`,'', pushToast);
};

export const deleteLanguage = async ( pushToast, url?) => {
    return deleteRequest(`language/${url}`,"", pushToast);
};
