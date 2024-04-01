import {postRequest} from './apiService.js';

export const postDemand = async (params, pushToast) => {
    return postRequest(`demand`,params, pushToast);
};