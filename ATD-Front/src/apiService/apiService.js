// ticketsApi.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const postTicket = async (ticketData) => {
    const response = await axios.post(`${API_BASE_URL}/ticket`, ticketData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response)
    return response;
};

export const postType = async (typeData) => {
    try {
        return await axios.post(`${API_BASE_URL}/type`, typeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error;
    }
}