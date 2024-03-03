// apiService.js
import axios from 'axios';

let authToken = null;
const API_BASE_URL = 'http://127.0.0.1:8000/api';
const defaultHeaders = {
    'Content-Type': 'application/json',
};

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    return headers;
};

export const logIn = async (login) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/logIn`, login, {headers: getHeaders()});
        authToken = res.data.token;
        return res;
    } catch (error) {
console.log(error.response)
        return error.response;
    }
};
export const postRequest = async (url, data, pushToast) => {

    try {
        const res = await axios.post(`${API_BASE_URL}/${url}`, data, {headers: getHeaders()});
        pushToast({
            content: "L'élément a bien été envoyé",
            type: "success"
        });
        return res.data
    } catch(res) {

        pushToast({
            content: "Une erreur est survenue",
            type: "failure"
        });
        console.log(res)
        return res
    }
};

export const patchRequest = async (url, data, pushToast) => {

    try {
        const res = await axios.patch(`${API_BASE_URL}/${url}`, data, {headers: getHeaders()});
        pushToast({
            content: "L'élément a bien étais modifier",
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
        const res = await axios.get(`${API_BASE_URL}/${url}`, { params }, {headers: getHeaders()});
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
        const res = await axios.delete(`${API_BASE_URL}/${url}`, { params }, {headers: getHeaders()});
        return res.data
    } catch {
        pushToast({
            content: "Une erreur est survenue lors de la suppression de élément",
            type: "failure"
        });
        return null
    }
};