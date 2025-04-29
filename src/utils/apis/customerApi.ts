import { axiosInstance } from "../axios";

export const getAllCustomers = async (token: string) => {
  const res = await axiosInstance.get("/Customer", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getCustomerById = async (id: number, token: string) => {
  const res = await axiosInstance.get(`/Customer/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createCustomer = async (data: any, token: string) => {
  const res = await axiosInstance.post("/Customer", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateCustomer = async (id: number, data: any, token: string) => {
  const res = await axiosInstance.put(`/Customer/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteCustomer = async (id: number, token: string) => {
  const res = await axiosInstance.delete(`/Customer/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
