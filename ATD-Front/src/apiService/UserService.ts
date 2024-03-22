import {deleteRequest, getRequest, logIn, patchRequest, postRequest} from './apiService.js';
import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000/api';


export const postUser = async (params, pushToast, url) => {
    return postRequest(`signIn/${url}`,params, pushToast);
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

