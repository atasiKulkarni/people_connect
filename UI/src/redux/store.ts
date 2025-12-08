
import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from "../components/Banners/slice/BannerSlice"
import employeeReducer from "../components/Employee/slice/EmployeeSlice"

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    employee: employeeReducer
  },
});

// For TypeScript, you typically add type definitions here too:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
