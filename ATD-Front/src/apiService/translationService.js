import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

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
            responseType: 'blob', // Set the response type to blob
        });

        // Read the blob data using FileReader
        const reader = new FileReader();
        reader.readAsDataURL(response.data);

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                // Resolve with the base64 data URL
                resolve(reader.result);
            };
            reader.onerror = reject; // Reject on error
        });
    } catch (error) {
        console.error('Error fetching language icon:', error);
        return null;
    }
};



