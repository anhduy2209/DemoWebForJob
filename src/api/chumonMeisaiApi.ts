import { axiosInstance } from "../utils/axiosInstance";

export const getAllChumonMeisai = async (token: string) => {
  const res = await axiosInstance.get("/ChumonMeisai", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getChumonMeisaiById = async (id: number, token: string) => {
  const res = await axiosInstance.get(`/ChumonMeisai/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createChumonMeisai = async (data: any, token: string) => {
  const res = await axiosInstance.post("/ChumonMeisai", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateChumonMeisai = async (
  id: number,
  data: any,
  token: string
) => {
  const res = await axiosInstance.put(`/ChumonMeisai/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteChumonMeisai = async (id: number, token: string) => {
  const res = await axiosInstance.delete(`/ChumonMeisai/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
