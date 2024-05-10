import {deleteRequest, getRequest, logIn, patchRequest, postRequest} from './apiService.js';
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

export const getDonations = async (params, pushToast) => {
    return getRequest('payment/' + params,'', pushToast);
};

export const postUser = async (params, pushToast, url) => {
    return postRequest(`signIn/${url}`,params, pushToast);
};

export const PatchShedule = async (params, pushToast, url) => {
    return patchRequest(`user/${url}/schedule`,params, pushToast);
};

export const logInUser = async (params) => {
    return logIn(params);
};
export const getUsers = async (params, pushToast) => {
    return getRequest('user',params, pushToast);
};

export const getUser = async (params, pushToast) => {
    return getRequest('user/' + params,'', pushToast);
};

export const deleteUser = async (params, pushToast, url?) => {
    return deleteRequest(`user/${url}`,params, pushToast);
};

export const patchUser = async (params, pushToast,userId) => {
    return patchRequest(`user/${userId}`,params, pushToast);
};

export const patchUserAdmin = async (params, pushToast,userId) => {
    return patchRequest(`user/admin/${userId}`,params, pushToast);
};
export const getUserFiles = async (params, pushToast) => {
    return getRequest('user/' + params + '/file','', pushToast);
};

export const downloadFile = async (params, pushToast) => {
    try {
        return await axios.get(`${API_BASE_URL}/file/${params}`, {
            headers: {
                "Content-Type": ["application/pdf", "image/png", "image/jpeg", "image/jpg"]
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

export const deleteFile = async (id, idFile, pushToast) => {
    return deleteRequest(`user/${id}/file/${idFile}`, "", pushToast);
};

export const postFile = async (params, data, pushToast) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/user/${params}/file`, data, {headers: getHeaders()});

        if (res.status === 201) {
            pushToast({
                content: "L'élément a bien été envoyé",
                type: "success"
            });
            return res;
        } else {
            console.error('Unexpected response:', res);
            pushToast({
                content: "Une erreur est arrivée lors du téléchargement du fichier",
                type: "failure"
            });
            return null;
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        if(error.response.status === 409){
            pushToast({
                content: "Ce fichier existe déjà",
                type: "failure"
            });
        }
        else {
            pushToast({
                content: "Une erreur est arrivée lors du téléversement du fichier",
                type: "failure"
            });
        }
        return null;
    }
}

export const getVisitedPerson = async (params, pushToast) => {
    return getRequest('user/visit',params, pushToast);
};

export const getVisitedPersonAll = async (pushToast) => {
    return getRequest('user/visitall',null, pushToast);
};