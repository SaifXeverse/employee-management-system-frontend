import api from "@/libs/axios";

export const loginEmployeeApi = async (data: { email: string; password: string }) => {
  const res = await api.post("/employee/login", data);
  return res.data;
};

export const registerEmployeeApi = async (data: { name: string; email: string; password: string }) => {
  const res = await api.post("/employee", data);
  return res.data;
};

export const logoutEmployeeApi = async () => {
  const res = await api.post("/employee/logout");
  return res.data;
};