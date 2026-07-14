import api from "@/libs/axios";
import { Profile } from "@/types/profileType";

export const getProfileApi = async () => {
  const res = await api.get("/auth/user");
  return res.data;
};

export const updateProfileApi = async (data: Profile) => {
  const res = await api.put("/auth/user", data);
  return res.data;
};