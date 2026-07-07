import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useAuth = () => {
  const router = useRouter();
  
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async (auth: string) => {
    const navigate = auth === "login" ? "/admin/dashboard" : "/admin/login";
    const toastMessage =
      auth === "login" ? "Login Successfully" : "User Registered";
    try {
      await axios.post(`http://localhost:5000/api/auth/${auth}`, inputs, {
        withCredentials: true,
      });
      toast.success(toastMessage);
      router.replace(navigate);
      router.refresh()
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      toast.success("Logout User");
      router.replace("/admin/login");
      router.refresh()
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response);
    }
  };

  return {
    handleChange,
    submitForm,
    handleLogout,
  };
};

export default useAuth;
