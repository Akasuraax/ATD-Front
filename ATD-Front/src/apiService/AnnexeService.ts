import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';

export const postAnnexe = async (params, pushToast) => {
    return postRequest(`annexe/`,params, pushToast);
};
export const getAnnexes = async (params, pushToast) => {
    return getRequest('annexe',params, pushToast);
};

export const getAnnexe = async (params, pushToast) => {
    return getRequest('annexe/' + params,'', pushToast);
};

export const deleteAnnexe = async ( pushToast, url?) => {
    return deleteRequest(`annexe/${url}`,"", pushToast);
};

export const patchAnnexe = async (params, pushToast,annexeId) => {
    return patchRequest(`annexe/${annexeId}`,params, pushToast);
};