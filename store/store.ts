import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/adminAuthSlice"
import employeeAuthReducer from "./slices/employeeAuthSlice"
import employeeReducer from "./slices/employeeSlice"
import profileReducer from "./slices/profileSlice"
import employeeDashboardReducer from "./slices/employeeDashboardSlice"

export const store = configureStore({
  reducer: {
    auth: adminAuthReducer,
    employeeAuth: employeeAuthReducer,
    employee: employeeReducer,
    profile: profileReducer,
    employeeDashboard: employeeDashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;