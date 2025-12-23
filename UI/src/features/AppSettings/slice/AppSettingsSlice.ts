import {createSlice} from '@reduxjs/toolkit';
import type { AppSettingsModel } from '../model/AppSettingsModel';
import type { RootState } from '../../../redux/store';

export class ErrorModel {
  status?: string | null
  status_msg?: string
  message?: string
  details?: string[]
  errCode?: string
  errorCode?: string
  errorMsg?: string
}
export interface IAppSettingsModel {
  //Model for Response
  data: AppSettingsModel;
  responseFailure: ErrorModel | null;
}

const initialState: IAppSettingsModel = {
  // inital state
  data: {
    isNetworkConnectivity: false,
    isLoading: false,
    isApiRefetchInvestmentReadiness: false,
    isComplateInvestmentReadines: false,
    isRefreshTokenFailed: false,
    isMFCImported: false,
    isSDKModuleOpen:false,
   },

  responseFailure: null,
};


export const appSettingSelector = (state: RootState) => state.appSettings;

export const appSettingsSlice = createSlice({
  name: 'AppSettings',
  initialState,
  reducers: {
    setNetworkConnectivity: (state, action) => {
      state.data.isNetworkConnectivity = action.payload.networkConnectivity;
    },
    setLoadingState(state, action) {
      state.data.isLoading = action.payload.isLoading;
    },
    setInvestmentReadinessApiRefectchState(state, action) {
      state.data.isApiRefetchInvestmentReadiness = action.payload.isApiRefetchInvestmentReadiness;
    },
    setComplateInvestmentReadines(state, action) {
      state.data.isComplateInvestmentReadines = action.payload.isComplateInvestmentReadines;
    },
    setRefreshTokenFailed(state, action) {
      state.data.isRefreshTokenFailed = action.payload.isRefreshTokenFailed;
    },
    setIsMFCImported(state, action) {
      state.data.isMFCImported = action.payload.isMFCImported;
    },
    setIsSDKModuleOpen(state, action) {
      state.data.isSDKModuleOpen = action.payload.isSDKModuleOpen;
    },
  },
  
});

export const {
  setNetworkConnectivity,
  setLoadingState,
  setInvestmentReadinessApiRefectchState,
  setComplateInvestmentReadines,
  setRefreshTokenFailed,
  setIsMFCImported,
  setIsSDKModuleOpen,
} = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
