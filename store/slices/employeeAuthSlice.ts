import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData, RegisterData, User } from "@/types/authType";
import {
  loginEmployeeApi,
  logoutEmployeeApi,
  registerEmployeeApi,
} from "@/services/employeeAuthApi";

interface EmployeeAuthState {
  employee: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeAuthState = {
  employee: null,
  loading: false,
  error: null,
};

export const registerEmployee = createAsyncThunk(
  "employee/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      return await registerEmployeeApi(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  },
);

export const loginEmployee = createAsyncThunk(
  "employee/login",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      return await loginEmployeeApi(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

export const logoutEmployee = createAsyncThunk(
  "employee/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await logoutEmployeeApi();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  },
);

const employeeAuthSlice = createSlice({
  name: "employeeAuth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(loginEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutEmployee.fulfilled, (state) => {
        state.employee = null;
      });
  },
});

export default employeeAuthSlice.reducer;
