// ticketsApi.js
import { postRequest, getRequest, deleteRequest } from './apiService.js';

export const postUser = async (userData,pushToast) => {
    return postRequest('ticket', userData,pushToast);
};

export const getUsers = async (params, pushToast) => {
    return getRequest('user',params, pushToast);
};

export const deleteUsers = async (params, pushToast) => {
    return deleteRequest('user',params, pushToast);
};
