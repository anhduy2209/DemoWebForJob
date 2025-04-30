import { axiosInstance } from "../utils/axiosInstance";

export const getAllChumons = async (token: string) => {
  const res = await axiosInstance.get("/Chumon/GetPage", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getChumonById = async (id: number, token: string) => {
  const res = await axiosInstance.get(`/Chumon/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createChumon = async (chumonData: any, token: string) => {
  const res = await axiosInstance.post("/Chumon", chumonData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateChumon = async (
  id: number,
  chumonData: any,
  token: string
) => {
  const res = await axiosInstance.put(`/Chumon/${id}`, chumonData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteChumon = async (id: number, token: string) => {
  const res = await axiosInstance.delete(`/Chumon/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
