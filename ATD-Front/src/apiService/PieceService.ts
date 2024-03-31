import {getRequest, deleteRequest, patchRequest, postRequest, API_BASE_URL} from './apiService.js';
import axios from "axios";
import Cookies from "js-cookie";

export const postPiece = async (params, pushToast) => {
    return postRequest(`piece/`,params, pushToast);
};
export const getPieces = async (params, pushToast) => {
    return getRequest('piece',params, pushToast);
};

export const getPiece = async (params, pushToast) => {
    return getRequest('piece/' + params,'', pushToast);
};

export const deletePiece = async ( pushToast, url?) => {
    return deleteRequest(`piece/${url}`,"", pushToast);
};

export const patchPiece = async (params, pushToast,userId) => {
    return patchRequest(`piece/${userId}`,params, pushToast);
};

const getHeaders = () => {
    const headers = {
        'Content-Type': 'text/html; charset=UTF-8',
        "Access-Control-Allow-Origin" : "*",
    };
    axios.defaults.headers.common['Authorization'] = `${ Cookies.get("token")}`;
    return headers;
};

export const generateQr = async (params, pushToast) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/qr/${params}`, {headers: getHeaders()});
        return res.data
    } catch {
        pushToast({
            content: "Une erreur est survenue lors de la récupération des éléments",
            type: "failure"
        });
        return null
    }
}