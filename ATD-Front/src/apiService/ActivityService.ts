import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';

export const postActivity = async (params, pushToast) => {
    return postRequest(`activity/`,params, pushToast);
};
export const getActivities = async (params, pushToast) => {
    return getRequest('activity',params, pushToast);
};

export const getActivitiesBetween = async (params, pushToast) => {
    return getRequest('activity/between',params, pushToast);
};


export const getActivity = async (params, pushToast) => {
    return getRequest('warehouse/' + params,'', pushToast);
};

export const deleteActivity = async ( pushToast, url?) => {
    return deleteRequest(`warehouse/${url}`,"", pushToast);
};

export const patchActivity = async (params, pushToast,userId) => {
    return patchRequest(`warehouse/${userId}`,params, pushToast);
};

export const routePlanner = async (params, pushToast) => {
    return postRequest(`journey/best_path`,params, pushToast);
};