import {getRequest, deleteRequest, postRequest} from './apiService.js';

export const postDonation = async (params, pushToast) => {
    return postRequest(`payment`,params, pushToast);
};
export const getDonation = async (params, pushToast) => {
    return getRequest('payment/' + params,'', pushToast);
};

export const deleteDonation = async (params, pushToast, url?) => {
    return deleteRequest(`payment/${url}`,params, pushToast);
};
