import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export type Employee = {
  id?: number;
  img: string;
  name: string;
  email: string;
  password: string;
  department: string;
  status: string;
  salary: number | string;
};

const initialState: Employee = {
  img: "",
  name: "",
  email: "",
  password: "",
  department: "",
  status: "",
  salary: "",
};

const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesInactive, setEmployeesInactive] = useState<Employee[]>([]);
  const [inputs, setInputs] = useState<Employee>(initialState);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getEmployees();
    getEmployeesInactive();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employee");
      setEmployees(response.data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const getEmployeesInactive = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employee/status",
      );
      setEmployeesInactive(response.data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const filteredEmployees = useMemo(() => {
    return [...employees]
      .filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) =>
        sortAsc
          ? Number(a.salary) - Number(b.salary)
          : Number(b.salary) - Number(a.salary),
      );
  }, [employees, search, sortAsc]);


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async () => {
    try {
      await axios.post("http://localhost:5000/api/employee", inputs);
      toast.success("Employee Added Successfully");
      setInputs(initialState);
      router.replace("/admin/employees");
      getEmployees();
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response.data);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`);
      toast.success(`${name} deleted successfully`);
      getEmployees();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      await axios.put(`http://localhost:5000/api/employee/${id}`, inputs);
      toast.success("Employee Updated");
      setInputs(initialState);
      router.replace("/admin/employees");
      getEmployees();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };
  
  const handleUpdateInactiveEmployee = async (id: number) => {
    try {
      await axios.put(`http://localhost:5000/api/employee/status/${id}`, { status : "active"});
      toast.success("Employee status updated");
      getEmployeesInactive();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const getEmployee = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employee/${id}`,
      );
      console.log(response.data);
      setInputs({
        img: response.data.employee.img,
        name: response.data.employee.name,
        email: response.data.employee.email,
        password: "",
        department: response.data.employee.department,
        status: response.data.employee.status,
        salary: response.data.employee.salary,
      });
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  return {
    employees,
    inputs,
    setInputs,
    getEmployees,
    employeesInactive,
    getEmployee,
    filteredEmployees,
    handleUpdateInactiveEmployee,
    setSearch,
    search,
    setSortAsc,
    sortAsc,
    handleChange,
    submitForm,
    handleDelete,
    handleEdit,
  };
};

export default useEmployee;
