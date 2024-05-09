import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';

export const postProduct = async (params, pushToast) => {
    return postRequest(`product/`,params, pushToast);
};
export const getProducts = async (params, pushToast) => {
    return getRequest('product',params, pushToast);
};

export const getMaxProduct = async (params,json, pushToast) => {
    return getRequest(`product/max/${params}`,json, pushToast);
};
export const getProductsFilter = async (params, pushToast) => {
    return getRequest('product/filter',params, pushToast);
};

export const getProduct = async (params, pushToast) => {
    return getRequest('product/' + params,'', pushToast);
};

export const deleteProduct = async ( url,pushToast) => {
    return deleteRequest(`product/${url}`,"", pushToast);
};

export const patchProduct = async (params, pushToast,id) => {
    return patchRequest(`product/${id}`,params, pushToast);
};

