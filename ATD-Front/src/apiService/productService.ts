import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';

export const postProduct = async (params, pushToast) => {
    return postRequest(`product/`,params, pushToast);
};
export const getProducts = async (params, pushToast) => {
    return getRequest('product',params, pushToast);
};

export const getProductsFilter = async (params, pushToast) => {
    return getRequest('product/filter',params, pushToast);
};

export const getProduct = async (params, pushToast) => {
    return getRequest('product/' + params,'', pushToast);
};

export const deleteProduct = async ( pushToast, url?) => {
    return deleteRequest(`product/${url}`,"", pushToast);
};

export const patchProduct = async (params, pushToast,id) => {
    return patchRequest(`product/${id}`,params, pushToast);
};