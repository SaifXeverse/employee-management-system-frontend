"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getEmployee, updateEmployee } from "@/store/slices/employeeSlice";
import { Employee } from "@/types/employeeType";
import { useParams, useRouter } from "next/navigation";
import useUpload from "@/hooks/useUpload";
import EmployeeForm from "../dashboard/EmployeeForm";
import toast from "react-hot-toast";

const initialState: Employee = {
  img: "",
  imgId: "",
  name: "",
  email: "",
  password: "",
  department: "",
  status: "",
  salary: "",
};

const EditEmployee = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const { employee } = useAppSelector((state) => state.employee);
  const [inputs, setInputs] = useState<Employee>(initialState);

  useEffect(() => {
    if (params.id) {
      dispatch(getEmployee(Number(params.id)));
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (employee) {
      setInputs({
        img: employee.img || "",
        imgId: employee.imgId || "",
        name: employee.name || "",
        email: employee.email || "",
        password: "",
        department: employee.department || "",
        status: employee.status || "",
        salary: employee.salary || "",
      });
    }
  }, [employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { handleUpload, imageUrl, loading, handleDelete } = useUpload((url, publicId) => {
    setInputs((prev) => ({ ...prev, img: url, imgId: publicId }));
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.img !== employee?.img) {
      handleDelete(employee?.imgId)
    }
    await dispatch(
      updateEmployee({
        id: Number(params.id),
        data: inputs,
      }),
    );
    toast.success("Employee Updated")
    router.replace("/admin/employees");
  };

  return (
    <EmployeeForm
      type="edit"
      inputs={inputs}
      handleUpload={handleUpload}
      handleDelete={handleDelete}
      imageUrl={imageUrl}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditEmployee;
