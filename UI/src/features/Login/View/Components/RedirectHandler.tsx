import { useEffect } from "react";
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
    console.log("RedirectHandler mounted - checking for redirect response");
    
    instance.handleRedirectPromise().then((response) => {
      console.log("handleRedirectPromise response:", response);
      
      if (response) {
        // User was redirected back after SSO login
        const account = response.account || accounts[0];
        console.log("Account found:", account);
        
        if (account) {
          // Acquire token and login
          acquireTokenAndLogin(account);
        }
      } else {
        console.log("No redirect response - user not coming from Azure AD");
      }
    }).catch((err) => {
      console.error("handleRedirectPromise error:", err);
    });
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
        console.log("Token acquired silently:", tokenRes.accessToken);
      } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
          console.log("Silent acquisition failed, using popup...");
          tokenRes = await instance.acquireTokenPopup({
            account,
            scopes: apiRequest.scopes,
          });
          console.log("Token acquired via popup:", tokenRes.accessToken);
        } else {
          throw err;
        }
      }

      const accessToken = tokenRes.accessToken;
      if (!accessToken) {
        console.error("No access token acquired");
        return;
      }

      console.log("Dispatching SSOLogin with token...");
      dispatch(SSOLogin(accessToken))
        .unwrap()
        .then((response) => {
          console.log("LOGIN_RESPONSE:", response);
          navigate("/home");
        })
        .catch((err) => {
          console.error("SSOLogin dispatch error:", err);
        });
    } catch (err) {
      console.error("Token acquisition error:", err);
    }
  };

  return null;
};