import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginUrlType,
  getLoginScreenRequestURL,
} from "../utility/LoginUtility";
import axios from "axios";

export const SSOLogin = createAsyncThunk(
  "login/SSOLogin",
  async (Token: string) => {
  
    const response = await axios.post(
      getLoginScreenRequestURL(LoginUrlType.login),
      { Token: Token },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    console.log("SSO Login Response:", response);
    // return response.data.user;
    return {
      items: [response.data.user],   // or response.data.user if not array
      token: Token
    };
  }
);
