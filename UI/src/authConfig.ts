
import type { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
     clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: import.meta.env.VITE_AUTHORITY,
    redirectUri: import.meta.env.VITE_REDIRECTION_URL,

    // clientId: "79891210-60e9-4946-9e62-3d1d27165e4a",
    // authority: "https://login.microsoftonline.com/7fad5638-a3eb-43d6-a916-61d702fc333e",
    // redirectUri: "http://localhost:5173/", 
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false, // set true only if you must support older IE/Edge
  },
};

// Scopes for sign-in experience (ID token related)
export const loginRequest: PopupRequest = {
  scopes: ["openid", "profile", "email", "offline_access"]
};

// Replace with your BACKEND API's App ID URI
export const apiRequest = {  
  scopes: ["api://ab38f303-d51a-4898-8214-aa7905459c37/sso_login_backend"]
  };