// ticketsApi.js
import {postRequest, getRequest, deleteRequest} from './apiService.js';
import axios from "axios";
import Cookies from "js-cookie";
import {API_BASE_URL} from "./apiService.js";

const getHeaders = () => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin" : "*",
    };
    axios.defaults.headers.common['Authorization'] = `${ Cookies.get("token")}`;
    return headers;
};
export const postType = async (typeData, pushToast) => {
    try {
        const formData = new FormData();
        formData.append('name', typeData.name);
        formData.append('description', typeData.description);
        formData.append('display', typeData.display ? '1' : '0');
        formData.append('type_image', typeData.type_image);
        formData.append('access_to_warehouse', typeData.access_to_warehouse ? '1' : '0');
        formData.append('access_to_journey', typeData.access_to_journey ? '1' : '0');
        const res = await axios.post(`${API_BASE_URL}/type`, formData, { headers: getHeaders() });
        pushToast({
            content: "L'élément a bien été envoyé",
            type: "success"
        });
        return res.data;
    } catch (error) {
        pushToast({
            content: "Une erreur est survenue",
            type: "failure"
        });
        throw error;
    }
};

export const getTypes = async (params, pushToast) => {
    return getRequest('type',params, pushToast);
};

export const getType = async (params, pushToast) => {
    return getRequest('type/' + params,'', pushToast);
};

export const getTypesAll = async (pushToast) => {
    return getRequest('type/all' , null, pushToast);
};

export const downloadFile = async (params, pushToast) => {
    try {
        return await axios.get(`${API_BASE_URL}/type/${params}/file`, {
            headers: {
                "Content-Type": ["image/png", "image/jpeg", "image/jpg"]
            },
            responseType: 'blob'
        });
    } catch (error) {
        console.error('Error downloading file:', error);
        pushToast({
            content: "An error occurred while fetching the file",
            type: "failure"
        });
        return null;
    }
};

export const patchType = async (typeData, pushToast, id) => {

    try{
        const formData = new FormData();
        formData.append('name', typeData.name);
        formData.append('description', typeData.description);
        formData.append('display', typeData.display ? '1' : '0');
        if (typeData.type_image != null)formData.append('type_image', typeData.type_image);
        formData.append('access_to_warehouse', typeData.access_to_warehouse ? '1' : '0');
        formData.append('access_to_journey', typeData.access_to_journey ? '1' : '0');
        const res = await axios.post(`${API_BASE_URL}/type/${id}`, formData, { headers: getHeaders() });
        pushToast({
            content: "L'élément a bien été envoyé",
            type: "success"
        });
        return res.data;
    } catch (error) {
        pushToast({
            content: "Une erreur est survenue",
            type: "failure"
        });
        throw error;
    }
};

export const deleteType = async (id, pushToast) => {
    return deleteRequest(`type/${id}`, "", pushToast);
};
