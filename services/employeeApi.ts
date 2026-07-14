import api from "@/libs/axios";
import { Employee } from "@/types/employeeType";

export const getEmployeesApi = async () => {
  const response = await api.get("/employee");
  return response.data;
};

export const getInactiveEmployeesApi = async () => {
  const response = await api.get("/employee/status");
  return response.data;
};

export const getEmployeeApi = async (id: number) => {
  const response = await api.get(`/employee/${id}`);
  return response.data;
};

export const createEmployeeApi = async (data: Employee) => {
  const response = await api.post("/employee", data);
  return response.data;
};

export const updateEmployeeApi = async (id: number, data: Employee) => {
  const response = await api.put(`/employee/${id}`, data);
  return response.data;
};

export const deleteEmployeeApi = async (id: number) => {
  await api.delete(`/employee/${id}`);
  return id;
};

export const updateEmployeeStatusApi = async (id: number) => {
  const response = await api.put(`/employee/status/${id}`, {
    status: "active",
  });
  return response.data;
};
