"use client"

import { FormEvent } from "react";
import EmployeeForm from "@/componnents/dashboard/EmployeeForm";
import useEmployee from "@/hooks/useEmployee";

const AddEmployee = () => {
  const { inputs, handleChange, submitForm } = useEmployee();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
  };

  return (
      <EmployeeForm
        type="add"
        inputs={inputs}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
  );
};

export default AddEmployee;