import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';

export const postRecipe = async (params, pushToast) => {
    return postRequest(`recipe/`,params, pushToast);
};
export const getRecipes = async (params, pushToast) => {
    return getRequest('recipe',params, pushToast);
};

export const getRecipesFilter = async (pushToast) => {
    return getRequest('recipe/filter', null,pushToast);
};

export const getRecipe = async (params, pushToast) => {
    return getRequest('recipe/' + params,'', pushToast);
};

export const deleteRecipe = async ( pushToast, url?) => {
    return deleteRequest(`recipe/${url}`,"", pushToast);
};

export const patchRecipe = async (params, pushToast,id) => {
    return patchRequest(`recipe/${id}`,params, pushToast);
};