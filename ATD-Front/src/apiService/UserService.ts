// ticketsApi.js
import {getRequest, deleteRequest, patchRequest, postRequest } from './apiService.js';


export const postUser = async (params, pushToast, url) => {
    return postRequest(`signIn/${url}`,params, pushToast);
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

export const patchUser = async (params, pushToast, url?) => {
    return patchRequest(`user/${url}`,params, pushToast);
};
