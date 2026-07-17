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
  const res = await api.put("/employee/resume/upload", data);
  return res.data;
};

export const resumeDeleteApi = async () => {
  await api.delete("/employee/resume/delete");
  return;
};