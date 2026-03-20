import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SSOLogin } from "../../action/LoginAction";
import { apiRequest } from "../../../../authConfig";
import type { AppDispatch } from "../../../../redux/store";
import {
  InteractionRequiredAuthError,
  type AuthenticationResult,
} from "@azure/msal-browser";

export const RedirectHandler = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const processRedirect = async () => {
      try {
        console.log("RedirectHandler: Checking for redirect...");
        
        const response = await instance.handleRedirectPromise();
        console.log("handleRedirectPromise response:", response);
        
        if (response) {
          // User was redirected back after SSO login
          const account = response.account || accounts[0];
          console.log("Account found:", account);
          
          if (account) {
            // Acquire token and login
            await acquireTokenAndLogin(account);
            return; // Exit - redirect handling complete
          }
        }
        
        // No redirect response - check if user is already logged in
        if (accounts.length > 0) {
          console.log("User already logged in, redirecting to home");
          navigate("/home", { replace: true });
        } else {
          console.log("No user logged in - redirecting to login page");
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("handleRedirectPromise error:", err);
        navigate("/login", { replace: true });
      }
    };

    processRedirect();
  }, [instance, accounts, dispatch, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const acquireTokenAndLogin = async (account: any) => {
    try {
      console.log("Attempting to acquire token...");
      
      let tokenRes: AuthenticationResult;
      
      try {
        tokenRes = await instance.acquireTokenSilent({
          account,
          scopes: apiRequest.scopes,
        });
        console.log("Token acquired silently");
      } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
          console.log("Silent acquisition failed, using popup...");
          tokenRes = await instance.acquireTokenPopup({
            account,
            scopes: apiRequest.scopes,
          });
          console.log("Token acquired via popup");
        } else {
          throw err;
        }
      }

      const accessToken = tokenRes.accessToken;
      if (!accessToken) {
        console.error("No access token acquired");
        navigate("/login", { replace: true });
        return;
      }

      console.log("Dispatching SSOLogin...");
      dispatch(SSOLogin(accessToken))
        .unwrap()
        .then((response) => {
          console.log("LOGIN_RESPONSE:", response);
          navigate("/home", { replace: true });
        })
        .catch((err) => {
          console.error("SSOLogin dispatch error:", err);
          navigate("/login", { replace: true });
        });
    } catch (err) {
      console.error("Token acquisition error:", err);
      navigate("/login", { replace: true });
    }
  };

  // Show nothing while checking for redirect
  return <div style={{ display: "none" }} />;
};