import { postRequest, getRequest, deleteRequest, patchRequest } from './apiService.js';

export const postRole = async (userData,pushToast) => {
    return postRequest('role', userData,pushToast);
};

export const getRoles = async (params, pushToast) => {
    return getRequest('role',params, pushToast);
};

export const getAllRoles = async (params, pushToast) => {
    return getRequest('role/all',params, pushToast);
};

export const getRole = async (params, pushToast) => {
    return getRequest('role/' + params,'', pushToast);
};

export const patchRole = async (params, pushToast,id) => {
    return patchRequest(`role/${id}`,params, pushToast);
};

export const deleteRole = async (id, pushToast) => {
    return deleteRequest(`role/${id}`, "", pushToast);
};
