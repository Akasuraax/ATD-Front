import axios from 'axios';
import {API_BASE_URL} from "./apiService.js";

export const fetchTranslation = async (abbreviation) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/language/${abbreviation}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching translation:', error);
        return {};
    }
};

export const fetchLanguageIcon = async (abbreviation) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/language/icon/${abbreviation}`, {
            responseType: 'blob',
        });

        const reader = new FileReader();
        reader.readAsDataURL(response.data);

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
        });
    } catch (error) {
        console.error('Error fetching language icon:', error);
        return null;
    }
};

export const fetchLanguages = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/language`)
        return response.data
    }catch(error){
        console.error('Error fetching languages:', error);
        return {};
    }
}