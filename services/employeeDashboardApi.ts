import api from "@/libs/axios";
import { EmployeeDashboard, EmployeeResume } from "@/types/employeeDashboard";

export const getEmployeeProfileApi = async () => {
  const res = await api.get("/employee/profile");
  return res.data;
};

export const updateEmployeeProfileApi = async (data: EmployeeDashboard) => {
  const res = await api.put("/employee/profile", data);
  return res.data;
};

export const resumeUploadApi = async (data: EmployeeResume) => {
  const res = await api.put("/employee/upload", data);
  return res.data;
};