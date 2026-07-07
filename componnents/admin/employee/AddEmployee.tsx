"use client"

import { FormEvent } from "react";
import useEmployee from "@/hooks/admin/useEmployee";
import useUpload from "@/hooks/useUpload";
import EmployeeForm from "../dashboard/EmployeeForm";

const AddEmployee = () => {
  const { inputs, setInputs, handleChange, submitForm } = useEmployee();
   const { handleUpload, imageUrl, loading } = useUpload((url) => {
    setInputs((prev) => ({ ...prev, img: url }));
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
  };
  
  return (
      <EmployeeForm
        type="add"
        inputs={inputs}
        handleUpload={handleUpload}
        imageUrl={imageUrl}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
  );
};

export default AddEmployee;