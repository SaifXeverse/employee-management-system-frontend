import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const useAuthEmployee = () => {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/employee`, inputs, {
        withCredentials: true,
      });
      toast.success("Employee Registered. Please wait for an admin to activate the account.");
      router.replace("/login");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data || "The server is down");
      console.log(error.response?.data);
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/employee/login`, inputs, {
        withCredentials: true,
      });
      toast.success("Login Successfully");
      router.refresh();
      router.replace("/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data || "The server is down");
      console.log(error.response?.data);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/employee/logout",{}, {
        withCredentials: true,
      });
      toast.success("Logout Employee");
      router.refresh();
      router.replace("/login");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data || "The server is down");
      console.log(error.response);
    }
  };

  return {
    handleChange,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};

export default useAuthEmployee;
