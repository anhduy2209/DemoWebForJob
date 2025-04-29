import { axiosInstance } from "../utils/axiosInstance";

export const getAllContracts = async (token: string) => {
  const res = await axiosInstance.get("/Contract/GetPage", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getContractById = async (id: number, token: string) => {
  const res = await axiosInstance.get(`/Contract/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createContract = async (data: any, token: string) => {
  const res = await axiosInstance.post("/Contract", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateContract = async (id: number, data: any, token: string) => {
  const res = await axiosInstance.put(`/Contract/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteContract = async (id: number, token: string) => {
  const res = await axiosInstance.delete(`/Contract/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
