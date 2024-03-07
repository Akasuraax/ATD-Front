import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';

export const postWarehouse = async (params, pushToast, url) => {
    return postRequest(`warehouse/${url}`,params, pushToast);
};
export const getWarehouses = async (params, pushToast) => {
    return getRequest('warehouse',params, pushToast);
};

export const getWarehouse = async (params, pushToast) => {
    return getRequest('warehouse/' + params,'', pushToast);
};

export const deleteWarehouse = async ( pushToast, url?) => {
    return deleteRequest(`warehouse/${url}`,"", pushToast);
};

export const patchWarehouse = async (params, pushToast,userId) => {
    return patchRequest(`warehouse/${userId}`,params, pushToast);
};