import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getEmployeeProfileApi,
  resumeUploadApi,
  updateEmployeeProfileApi,
} from "@/services/employeeDashboardApi";
import { EmployeeDashboard, EmployeeResume } from "@/types/employeeDashboard";

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

export const resumeUpload = createAsyncThunk(
  "employeeDashboard/upload",
  async (data: EmployeeResume, { rejectWithValue }) => {
    try {
      return await resumeUploadApi(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Upload failed");
    }
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
      })

      .addCase(resumeUpload.fulfilled, (state, action) => {
        state.employee = action.payload;
        // if (state.employee) {
        //   state.employee.resume = action.payload.resume;
        //   state.employee.resumeId = action.payload.resumeId;
        // }
      });
  },
});

export default employeeDashboardSlice.reducer;
