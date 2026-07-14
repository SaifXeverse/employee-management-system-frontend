import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileApi, updateProfileApi } from "@/services/profileApi";
import { Profile } from "@/types/profileType";

interface ProfileState {
  user: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

export const getProfile = createAsyncThunk("profile/get", async () => {
  return await getProfileApi();
});

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (data: Profile) => {
    return await updateProfileApi(data);
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default profileSlice.reducer;
