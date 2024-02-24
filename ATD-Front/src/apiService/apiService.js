// apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const defaultHeaders = {
    'Content-Type': 'application/json',
};

export const postRequest = async (url, data, pushToast) => {

    try {
        const res = await axios.post(`${API_BASE_URL}/${url}`, data, {headers: defaultHeaders});
        pushToast({
            content: "L'élément a bien étais envoyer",
            type: "success"
        });
        return res.data
    } catch {
        pushToast({
            content: "Une erreur est survenue",
            type: "failure"
        });
        return null
    }
};

export const getRequest = async (url, params, pushToast) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/${url}`, { params });
        return res.data
    } catch {
        pushToast({
            content: "Une erreur est survenue lors de la récupération des éléments",
            type: "failure"
        });
        return null
    }
};


export const deleteRequest = async (url, params, pushToast) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}/${url}/${params}`);
        return res.data
    } catch {
        pushToast({
            content: "Une erreur est survenue lors de la suppression de élément",
            type: "failure"
        });
        return null
    }
};