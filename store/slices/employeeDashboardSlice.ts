import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getEmployeeProfileApi,
  resumeDeleteApi,
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

export const deleteEmployeeResume = createAsyncThunk(
  "employee/resume/delete",
  async () => {
    return await resumeDeleteApi();
  },
);

const employeeDashboardSlice = createSlice({
  name: "employeeDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(getEmployeeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch profile";
      })

      .addCase(updateEmployeeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(updateEmployeeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update profile";
      })

      .addCase(resumeUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resumeUpload.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
        // if (state.employee) {
        //   state.employee.resume = action.payload.resume;
        //   state.employee.resumeId = action.payload.resumeId;
        // }
      })
      .addCase(resumeUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to upload resume";
      })

      .addCase(deleteEmployeeResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeResume.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEmployeeResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete resume";
      });
  },
});

export default employeeDashboardSlice.reducer;
