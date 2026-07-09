import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialState = {
  img: "",
  name: "",
  email: "",
  department: "",
  status: "",
  salary: "",
};

const useEmployeeDashboard = () => {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState(initialState);
  const [employeeInput, setEmployeeInput] = useState(initialState);

  useEffect(() => {
    getEmployee();
  }, []);

  useEffect(() => {
    if (employee) {
      setEmployeeInput({
        img: employee.img || "",
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        status: employee.status || "",
        salary: employee.salary || "",
      });
    }
  }, [employee]);

  const getEmployee = async () => {
    try {
      const employee = await axios.get(
        "http://localhost:5000/api/employee/profile",
        {
          withCredentials: true,
        },
      );
      setEmployee(employee.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setEmployeeInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/employee/profile`, employeeInput, {
        withCredentials: true
      });
      toast.success("Employee profile updated");
      setEmployeeInput(initialState);
      getEmployee();
      setOpen(false)
    } catch (error: any) {
      toast.error(error.response?.data)
      console.log(error.response?.data);
    }
  };

  return {
    employee,
    employeeInput,
    setEmployeeInput,
    open,
    setOpen,
    handleChange,
    handleSave
  };
};

export default useEmployeeDashboard;
