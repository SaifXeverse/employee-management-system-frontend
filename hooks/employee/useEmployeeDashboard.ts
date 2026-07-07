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

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    try {
      const employee = await axios.get(
        "http://localhost:5000/api/employee/profile",
        {
          withCredentials: true,
        },
      );
      setEmployee(employee.data);
      console.log(employee.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setEmployee((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
    //   await axios.put(`http://localhost:5000/api/employee/profile`, userInput, {
    //     withCredentials: true
    //   });
    //   toast.success("User Updated");
    //   setUserInput(initialState);
      getEmployee();
      () => setOpen(false)
    } catch (error: any) {
      toast.error(error.response?.data)
      console.log(error.response?.data);
    }
  };

  return {
    employee,
    open,
    setOpen,
    handleChange,
    handleSave
  };
};

export default useEmployeeDashboard;
