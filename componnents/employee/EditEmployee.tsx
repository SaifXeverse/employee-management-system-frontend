"use client";

import { FormEvent, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useEmployee from "@/hooks/useEmployee";
import EmployeeForm from "@/componnents/dashboard/EmployeeForm";

const EditEmployee = () => {
  const router = useRouter();
  const params = useParams();

  const { inputs, handleChange, getEmployee, handleEdit } = useEmployee();

  useEffect(() => {
    if (params.id) {
      getEmployee(Number(params.id));
    }
  }, []);

  console.log(inputs);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleEdit(Number(params.id));
    router.replace("/employees");
  };

  return (
    <EmployeeForm
      type="edit"
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditEmployee;
