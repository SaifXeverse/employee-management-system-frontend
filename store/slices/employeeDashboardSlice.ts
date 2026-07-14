import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getEmployeeProfileApi,
  updateEmployeeProfileApi,
} from "@/services/employeeDashboardApi";
import { EmployeeDashboard } from "@/types/employeeDashboard";

interface EmployeeDashboardState {
  employee: EmployeeDashboard | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeDashboardState = {
  employee: null,
  loading: false,
  error: null,
};

export const getEmployeeProfile = createAsyncThunk(
  "employeeDashboard/get",
  async () => {
    return await getEmployeeProfileApi();
  },
);

export const updateEmployeeProfile = createAsyncThunk(
  "employeeDashboard/update",
  async (data: EmployeeDashboard) => {
    return await updateEmployeeProfileApi(data);
  },
);

const employeeDashboardSlice = createSlice({
  name: "employeeDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeProfile.fulfilled, (state, action) => {
        state.employee = action.payload;
      })

      .addCase(updateEmployeeProfile.fulfilled, (state, action) => {
        state.employee = action.payload;
      });
  },
});

export default employeeDashboardSlice.reducer;
