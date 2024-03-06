import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';


export const postAnnexe = async (params, pushToast) => {
    return postRequest(`annexe`,params, pushToast);
};
export const getAnnexes = async (params, pushToast) => {
    return getRequest('annexe',params, pushToast);
};

export const getAnnexe = async (params, pushToast) => {
    return getRequest('annexe/' + params,'', pushToast);
};

export const getAnnexesAll = async (pushToast) => {
    return getRequest('annexe/all','', pushToast);
};

export const deleteAnnexe = async (params, pushToast, url?) => {
    return deleteRequest(`annexe/${url}`,params, pushToast);
};

export const patchAnnexe = async (params, pushToast,Id) => {
    return patchRequest(`annexe/${Id}`,params, pushToast);
};