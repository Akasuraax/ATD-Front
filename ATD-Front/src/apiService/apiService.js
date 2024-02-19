// apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const defaultHeaders = {
    'Content-Type': 'application/json',
};

const handleRequest = async (request, pushToast) => {
        const response = await request();

        pushToast({
            content: "L'élément a bien étais envoyer",
        });
        return response.data;
};

export const postRequest = async (url, data, pushToast) => {

    try {
        const res = await axios.post(`${API_BASE_URL}/${url}`, data, {headers: defaultHeaders});
        pushToast({
            content: "L'élément a bien étais envoyer",
            type: "success"
        });
        return res
    } catch {
        pushToast({
            content: "Une erreur est survenue",
            type: "failure"
        });
        return null
    }
};

export const getRequest = async (url, pushToast) => {
    return handleRequest(() => axios.get(`${API_BASE_URL}/${url}`, { headers: defaultHeaders }), pushToast);
};
