import {getRequest, postRequest} from './apiService.js';

export const postTicket = async (params, pushToast) => {
    return postRequest(`ticket/`,params, pushToast);
};

export const getTickets = async (params, pushToast) => {
    return getRequest('user/' + params + '/tickets', '', pushToast);
};