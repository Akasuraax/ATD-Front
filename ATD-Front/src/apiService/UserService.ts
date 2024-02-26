// ticketsApi.js
import { getRequest, deleteRequest } from './apiService.js';

export const getUsers = async (params, pushToast) => {
    return getRequest('user',params, pushToast);
};

export const getUser = async (params, pushToast) => {
    return getRequest('user/' + params,'', pushToast);
};

export const deleteUsers = async (params, pushToast) => {
    return deleteRequest('user',params, pushToast);
};
