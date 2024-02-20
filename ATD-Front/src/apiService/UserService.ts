// ticketsApi.js
import { postRequest, getRequest } from './apiService.js';

export const postUser = async (userData,pushToast) => {
    return postRequest('ticket', userData,pushToast);
};

export const getUsers = async (params, pushToast) => {
    return getRequest('user',params, pushToast);
};
