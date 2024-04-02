import {deleteRequest, getRequest, postRequest} from './apiService.js';

export const postDemand = async (params, pushToast) => {
    return postRequest(`demand`,params, pushToast);
};

export const getDemands = async (params, pushToast) => {
    return getRequest('demand',params, pushToast);
};

export const getDemand = async (params, pushToast) => {
    return getRequest('demand/' + params,'', pushToast);
};

export const deleteDemand = async ( pushToast, url?) => {
    return deleteRequest(`demand/${url}`,"", pushToast);
};