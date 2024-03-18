import {getRequest, postRequest} from './apiService.js';

export const postTicket = async (params, pushToast) => {
    return postRequest(`ticket/`,params, pushToast);
};

export const getMyTickets = async (params, pushToast) => {
    return getRequest('user/' + params + '/tickets', '', pushToast);
};

export const getTicket = async (params, pushToast) => {
    return getRequest('ticket/' + params, '', pushToast);
}