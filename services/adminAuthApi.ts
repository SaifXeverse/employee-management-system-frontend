import api from "@/libs/axios";
import { LoginData, RegisterData } from "@/types/authType";

export const loginAdminApi = async (data: LoginData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerAdminApi = async (data: RegisterData) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const logoutAdminApi = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};