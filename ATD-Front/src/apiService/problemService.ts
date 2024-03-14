import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';

export const postProblem = async (params, pushToast) => {
    return postRequest(`problem/`,params, pushToast);
};
export const getProblems = async (pushToast) => {
    return getRequest('problem' , null, pushToast);
};

export const getProblemsAdmin = async (pushToast) => {
    return getRequest('problem/admin','', pushToast);
};

export const deleteProblem = async (params, pushToast) => {
    return deleteRequest('problem/' + params,"", pushToast);
};

export const patchProblem = async (params, pushToast) => {
    return patchRequest('problem/' + params, pushToast);
};