
import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from "../features/Banner/slice/BannerSlice"
import employeeReducer from "../features/Employee/slice/EmployeeSlice"
import loginReducer from "../features/Login/slice/LoginSlice"
import eventReducer from "../features/Events/slice/EventSlice"
import appSettingsReducer from '../features/AppSettings/slice/AppSettingsSlice';
import engageReducer from "../features/Engage/slice/EngageSlice"
export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    banners: bannerReducer,
    employee: employeeReducer,
    event: eventReducer,
    engage: engageReducer,
    login: loginReducer,
  },
});

// For TypeScript, you typically add type definitions here too:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
