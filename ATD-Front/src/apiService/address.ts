import {postRequestNoToast} from './apiService.js';


export const postAddress = async (params) => {
    return postRequestNoToast(`address`, params);
};