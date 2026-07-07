"use client";

import { FormEvent, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useEmployee from "@/hooks/admin/useEmployee";
import useUpload from "@/hooks/useUpload";
import EmployeeForm from "../dashboard/EmployeeForm";

const EditEmployee = () => {
  const router = useRouter();
  const params = useParams();

  const { inputs, handleChange, setInputs, getEmployee, handleEdit } =
    useEmployee();
    
  const { handleUpload, imageUrl, loading } = useUpload((url) => {
    setInputs((prev) => ({ ...prev, img: url }));
  });

  useEffect(() => {
    if (params.id) {
      getEmployee(Number(params.id));
    }
  }, []);

  console.log(inputs);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleEdit(Number(params.id));
  };

  return (
    <EmployeeForm
      type="edit"
      inputs={inputs}
      handleUpload={handleUpload}
      imageUrl={imageUrl}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditEmployee;
