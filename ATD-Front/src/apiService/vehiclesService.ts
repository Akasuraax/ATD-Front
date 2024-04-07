import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';


export const postVehicle = async (params, pushToast) => {
    return postRequest(`vehicle`,params, pushToast);
};
export const getVehicles = async (params, pushToast) => {
    return getRequest('vehicle',params, pushToast);
};

export const getAllVehicles = async ( pushToast) => {
    return getRequest('vehicle/all',null, pushToast);
};

export const getVehicle = async (params, pushToast) => {
    return getRequest('vehicle/' + params,'', pushToast);
};

export const deleteVehicle = async (params, pushToast, url?) => {
    return deleteRequest(`vehicle/${url}`,params, pushToast);
};

export const patchVehicle = async (params, pushToast,userId) => {
    return patchRequest(`vehicle/${userId}`,params, pushToast);
};