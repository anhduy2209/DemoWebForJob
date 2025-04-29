// src/api/authApi.ts
import axios from '../utils/axiosInstance';

export const loginApi = async (userName: string, password: string) => {
    const response = await axios.post('/login', {
        userName,
        password,
    });
    return response.data;
};