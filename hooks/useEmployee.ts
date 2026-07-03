"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export type Employee = {
  id?: number;
  img: string;
  name: string;
  email: string;
  department: string;
  salary: number | string;
};

const initialState: Employee = {
  img: "",
  name: "",
  email: "",
  department: "",
  salary: "",
};

const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [inputs, setInputs] = useState<Employee>(initialState);
  const router = useRouter();

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employee");
      setEmployees(response.data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async () => {
    try {
      await axios.post("http://localhost:5000/api/employee", inputs);
      toast.success("Employee Added Successfully");
      setInputs(initialState);
      router.push("/employees");
      getEmployees();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`);
      toast.success(`${name} deleted successfully`);
      getEmployees();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      await axios.put(`http://localhost:5000/api/employee/${id}`, inputs);
      toast.success("Employee Updated");
      setInputs(initialState);
      router.push("/employees");
      getEmployees();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const getEmployee = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employee/${id}`,
      );
      console.log(response.data);
      setInputs({
        img:  response.data.employee.img,
        name: response.data.employee.name,
        email: response.data.employee.email,
        department: response.data.employee.department,
        salary: response.data.employee.salary,
      });
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  return {
    employees,
    inputs,
    setInputs,
    getEmployees,
    getEmployee,
    handleChange,
    submitForm,
    handleDelete,
    handleEdit,
  };
};

export default useEmployee;
