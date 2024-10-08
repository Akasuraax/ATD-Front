// apiService.js
import axios from 'axios';
import Cookies from "js-cookie";

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*",
    };
    axios.defaults.headers.common['Authorization'] = `${ Cookies.get("token")}`;
    return headers;
};

export const logIn = async (login) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/logIn`, login, {headers: getHeaders()});
        return res;
    } catch (error) {
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

        return res
    } catch(res) {
        if(res.response.status !== 409)
        pushToast({
            content: "Une erreur est survenue",
            type: "failure"
        });
        return res.response
    }
};

export const postRequestNoToast = async (url, data) => {

    try {
        return await axios.post(`${API_BASE_URL}/${url}`, data, {headers: getHeaders()});
    } catch(res) {
        return res.response
    }
};


export const patchRequest = async (url, data, pushToast) => {

    try {
        const res = await axios.patch(`${API_BASE_URL}/${url}`, data, {headers: getHeaders()});
        pushToast({
            content: "L'élément a bien été modifié",
            type: "success"
        });
        return res.data
    } catch(res) {
        if(res.response.status === 409) {
            return res.response
        }
        pushToast({
            content: "Une erreur est survenue",
            type: "failure"
        });
        return res.response
    }
};

export const getRequest = async (url, params, pushToast) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/${url}`, { params }, {headers: getHeaders()});
        return res.data
    } catch(error) {
        pushToast({
            content: "Une erreur est survenue lors de la récupération des éléments",
            type: "failure"
        });
        return error
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