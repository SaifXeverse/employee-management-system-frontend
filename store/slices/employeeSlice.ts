import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getEmployeesApi,
  getInactiveEmployeesApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
  updateEmployeeStatusApi,
  getEmployeeApi,
} from "@/services/employeeApi";
import { Employee } from "@/types/employeeType";

interface EmployeeState {
  employees: Employee[];
  employeesInactive: Employee[];
  employee: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  employeesInactive: [],
  employee: null,
  loading: false,
  error: null,
};

export const getEmployees = createAsyncThunk("employee/getAll", async () => {
  return await getEmployeesApi();
});

export const getInactiveEmployees = createAsyncThunk(
  "employee/getInactive",
  async () => {
    return await getInactiveEmployeesApi();
  },
);

export const getEmployee = createAsyncThunk(
  "employee/getOne",
  async (id: number) => {
    return await getEmployeeApi(id);
  },
);

export const createEmployee = createAsyncThunk(
  "employee/create",
  async (data: Employee) => {
    return await createEmployeeApi(data);
  },
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, data }: { id: number; data: Employee }) => {
    return await updateEmployeeApi(id, data);
  },
);

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id: number) => {
    return await deleteEmployeeApi(id);
  },
);

export const updateEmployeeStatus = createAsyncThunk(
  "employee/status",
  async (id: number) => {
    return await updateEmployeeStatusApi(id);
  },
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })

      .addCase(getInactiveEmployees.fulfilled, (state, action) => {
        state.employeesInactive = action.payload;
      })

      .addCase(getEmployee.fulfilled, (state, action) => {
        state.employee = action.payload.employee;
      })

      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp.id !== action.payload,
        );
      });
  },
});

export default employeeSlice.reducer;