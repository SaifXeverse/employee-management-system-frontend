"use client";

import { FormEvent, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { createEmployee } from "@/store/slices/employeeSlice";
import { Employee } from "@/types/employeeType";
import useUpload from "@/hooks/useImageUpload";
import EmployeeForm from "../dashboard/EmployeeForm";
import { useRouter } from "next/navigation";
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

const AddEmployee = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [inputs, setInputs] = useState<Employee>(initialState);
  const { handleUpload, imageUrl, loading, handleDelete } = useUpload((url, publicId) => {
    setInputs((prev) => ({ ...prev, img: url, imgId: publicId }));
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createEmployee(inputs));
    setInputs(initialState);
    console.log(inputs);
    toast.success("Employee Created")
    router.replace("/admin/employees")
  };

  return (
    <EmployeeForm
      type="add"
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

export default AddEmployee;
