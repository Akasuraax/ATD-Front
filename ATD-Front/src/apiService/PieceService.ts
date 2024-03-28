import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';

export const postPiece = async (params, pushToast) => {
    return postRequest(`piece/`,params, pushToast);
};
export const getPieces = async (params, pushToast) => {
    return getRequest('piece',params, pushToast);
};

export const getPiece = async (params, pushToast) => {
    return getRequest('piece/' + params,'', pushToast);
};

export const deletePiece = async ( pushToast, url?) => {
    return deleteRequest(`piece/${url}`,"", pushToast);
};

export const patchPiece = async (params, pushToast,userId) => {
    return patchRequest(`piece/${userId}`,params, pushToast);
};