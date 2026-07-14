import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData, RegisterData, User } from "@/types/authType"
import { loginAdminApi, logoutAdminApi, registerAdminApi } from "@/services/adminAuthApi";

interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      return await loginAdminApi(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const registerAdmin = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      return await registerAdminApi(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await logoutAdminApi();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder

      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(loginAdmin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(registerAdmin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutAdmin.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default adminAuthSlice.reducer;
