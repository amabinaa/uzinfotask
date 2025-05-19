import axios from 'axios';

const BASE_URL = 'https://python-api-task.onrender.com';

export const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
};

export const getCounts = async () => {
    const response = await axios.get(`${BASE_URL}/counts`);
    return response.data;
};
