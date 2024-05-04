import {getRequest, deleteRequest, patchRequest, postRequest} from './apiService.js';
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from './apiService.js';

const getHeaders = () => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin" : "*",
    };
    axios.defaults.headers.common['Authorization'] = `${ Cookies.get("token")}`;
    return headers;
};




export const postActivity = async (params, pushToast) => {
    return postRequest(`activity/`,params, pushToast);
};

export const postJourney = async (params, pushToast) => {
    return postRequest(`journey/`,params, pushToast);
};

export const postActivitySubscribe = async (params, pushToast,activityId) => {
    return postRequest(`activity/participate/${activityId}`,params, pushToast);
};
export const getActivities = async (params, pushToast) => {
    return getRequest('activity',params, pushToast);
};

export const isUserRegisteredToActivity = async (params,activityId, pushToast) => {
    return getRequest(`activity/participate/${activityId}`,params, pushToast);
};

export const getActivitiesBetween = async (params, pushToast) => {
    return getRequest('activity/between',params, pushToast);
};
export const getActivity = async (params, pushToast) => {
    return getRequest('activity/' + params,'', pushToast);
};

export const getActivityForUser = async (id, pushToast, params) => {
    return getRequest(`activity/publicActivity/${id}`, params, pushToast);
};

export const deleteActivity = async ( pushToast, url?) => {
    return deleteRequest(`activity/${url}`,"", pushToast);
};

export const deleteActivityFile = async (activityId,fileId, pushToast,) => {
    return deleteRequest(`activity/${activityId}/file/${fileId}`,"", pushToast);
};

export const deleteActivityParticipate = async (url, user, pushToast) => {
    return deleteRequest(`activity/participate/${url}`,user, pushToast);
};

export const patchActivity = async (params, pushToast,userId) => {
    return patchRequest(`activity/${userId}`,params, pushToast);
};

export const patchActivityRoles = async (params, pushToast,id) => {
    return patchRequest(`activity/${id}/role`,params, pushToast);
};

export const patchActivityRecipes = async (params, pushToast,id) => {
    return patchRequest(`activity/${id}/recipe`,params, pushToast);
};

export const patchActivityProducts = async (params, pushToast,id) => {
    return patchRequest(`activity/${id}/product`,params, pushToast);
};

export const routePlanner = async (params, pushToast) => {
    return postRequest(`journey/best_path`,params, pushToast);
};

export const postFiles = async (params, idActivity, pushToast) => {
    try {
        return await axios.post(`${API_BASE_URL}/activity/${idActivity}/file/`,params,{headers: getHeaders()})
    } catch (error) {
        console.error('Error downloading file:', error);
        pushToast({
            content: "An error occurred while fetching the file",
            type: "failure"
        });
        return null;
    }
};
