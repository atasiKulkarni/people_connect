import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginList, LoginState } from "../model/LoginModel";
import type { RootState } from "../../../redux/store";
import { SSOLogin } from "../action/LoginAction";

export type Status = "idle" | "loading" | "succeeded" | "failed";

const initialState: LoginState = {
  items: [],
  token: null,
  status: "idle",
  error: null,
};

export const fetchedLoginJson = (state: RootState) => state.login.items;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SSOLogin.pending, (state) => {
        console.log("Login pending...");
        state.status = "loading";
      })
      .addCase(
        SSOLogin.fulfilled,
        (state, action: PayloadAction<{ items: LoginList[]; token: string }>) => {
          console.log("Login fulfilled...");
          state.status = "succeeded";
          console.log("Login payload:", action.payload);
          console.log("Login payload:", action.payload.items);
          state.items = action.payload.items;
          state.token = action.payload.token; // Store the access token in the state
        }
      )
      .addCase(SSOLogin.rejected, (state, action) => {
        console.log("fLogin rejected...");
        state.status = "failed";
        state.error = action.error.message || "Something went wrong"; // Ensure error is a string
      });
  },
});

export const selectLogin = (state: RootState) => state.login.items;
export const selectLoginStatus = (state: RootState) => state.login.status;
export const selectLoginError = (state: RootState) => state.login.error;

export default loginSlice.reducer;
