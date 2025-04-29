import { axiosInstance } from "../utils/axiosInstance";

export const getAllUsers = async (token: string) => {
  const res = await axiosInstance.get("/User", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserById = async (id: number, token: string) => {
  const res = await axiosInstance.get(`/User/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createUser = async (data: any, token: string) => {
  const res = await axiosInstance.post("/User", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUser = async (id: number, data: any, token: string) => {
  const res = await axiosInstance.put(`/User/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteUser = async (id: number, token: string) => {
  const res = await axiosInstance.delete(`/User/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
