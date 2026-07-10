import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialState = {
  img: "",
  name: "",
  email: "",
};

const useProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialState);
  const [userInput, setUserInput] = useState(initialState);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setUserInput({
        name: user.name || "",
        email: user.email || "",
        img: user.img || "",
      });
    }
  }, [user]);

  const getUser = async () => {
    try {
      const user = await axios.get("http://localhost:5000/api/auth/user", {
        withCredentials: true,
      });
      setUser(user.data);
      console.log(user.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/auth/user`, userInput, {
        withCredentials: true
      });
      toast.success("User Updated");
      setUserInput(initialState);
      getUser();
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data || "The server is down")
      console.log(error.response?.data);
    }
  };

  const handleCancel = () => {
    setUserInput({
      name: user?.name || "",
      email: user?.email || "",
      img: user?.img || "",
    });

    setIsEditing(false);
  };

  return {
    isEditing,
    handleSave,
    handleCancel,
    userInput,
    setUserInput,
    setIsEditing,
  };
};

export default useProfile;
