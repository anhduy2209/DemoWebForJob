import axios from "axios";
import { API_URL } from "./constants";

export const axiosInstance = axios.create({
  baseURL: API_URL, // Base URL đã được khai báo
  headers: {
    "Content-Type": "application/json",
  },
});

// Cũng có thể thêm các interceptor để xử lý token nếu cần
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Hoặc từ context
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
