// ticketsApi.js
import { postRequest, getRequest } from './apiService.js';

export const postTicket = async (ticketData,pushToast) => {
    return postRequest('ticket', ticketData,pushToast);
};

export const getTickets = async (pushToast) => {
    return getRequest('ticket',pushToast);
};
