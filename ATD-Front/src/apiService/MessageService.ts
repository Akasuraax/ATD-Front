import {postRequest} from './apiService.js';

export const sendMessage = async (ticketId, params, pushToast) => {
    return postRequest(`ticket/${ticketId}`, params, pushToast);
};