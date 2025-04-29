// src/api/authApi.ts
import { axiosInstance } from "../utils/axiosInstance";

export const loginApi = async (userName: string, password: string) => {
    const response = await axiosInstance.post('/login', {
        userName,
        password,
    });
    return response.data;
};