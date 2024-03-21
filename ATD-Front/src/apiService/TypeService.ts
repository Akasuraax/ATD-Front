import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';

export const postType = async (params, pushToast) => {
    return postRequest(`type/`,params, pushToast);
};
export const getTypes = async (pushToast) => {
    return getRequest('type' , null, pushToast);
};

export const getTypesAll = async (pushToast) => {
    return getRequest('type/all' , null, pushToast);
};

export const getType = async (params, pushToast) => {
    return getRequest('type/' + params,'', pushToast);
};

export const deleteType = async (params, pushToast) => {
    return deleteRequest('type/' + params,"", pushToast);
};

export const patchType = async (params, pushToast) => {
    return patchRequest('type/' + params, pushToast);
};