import React,{ useEffect, useState } from "react";
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
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processRedirect = async () => {
      try {
        console.log("RedirectHandler: Processing redirect...");
        
        const response = await instance.handleRedirectPromise();
        console.log("handleRedirectPromise response:", response);
        
        if (response) {
          // User was redirected back after SSO login
          const account = response.account || accounts[0];
          console.log("Account found:", account);
          
          if (account) {
            // Acquire token and login
            await acquireTokenAndLogin(account);
            return; // Exit early - we handled the redirect
          }
        }
        
        // No redirect response - check if user is already logged in
        if (accounts.length > 0) {
          console.log("User already logged in, redirecting to home");
          navigate("/home");
        } else {
          console.log("No user logged in - showing login page");
          setIsProcessing(false);
        }
      } catch (err) {
        console.error("handleRedirectPromise error:", err);
        setIsProcessing(false);
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
        setIsProcessing(false);
        return;
      }

      console.log("Dispatching SSOLogin...");
      dispatch(SSOLogin(accessToken))
        .unwrap()
        .then((response) => {
          console.log("LOGIN_RESPONSE:", response);
          navigate("/home");
        })
        .catch((err) => {
          console.error("SSOLogin dispatch error:", err);
          setIsProcessing(false);
        });
    } catch (err) {
      console.error("Token acquisition error:", err);
      setIsProcessing(false);
    }
  };

  // Show loading or nothing while processing redirect
  if (isProcessing) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return null;
};