
import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from "../features/Banner/slice/BannerSlice"
import employeeReducer from "../features/Employee/slice/EmployeeSlice"
import eventReducer from "../features/Events/slice/EventSlice"
export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    employee: employeeReducer,
    event: eventReducer
  },
});

// For TypeScript, you typically add type definitions here too:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
