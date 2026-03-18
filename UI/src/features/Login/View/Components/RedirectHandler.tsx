import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SSOLogin } from "../../action/LoginAction";
import { apiRequest } from "../../../../authConfig";
import type { AppDispatch } from "../../../../redux/store";

export const RedirectHandler = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("RedirectHandler mounted");
    instance.handleRedirectPromise().then((response) => {
      if (response) {
        // User was redirected back after SSO login
        const account = response.account || accounts[0];
        
        if (account) {
          // Acquire token and login
          acquireTokenAndLogin(account);
        }
      }
    });
  }, [instance, accounts]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const acquireTokenAndLogin = async (account: any) => {
    try {
      const tokenRes = await instance.acquireTokenSilent({
        account,
        scopes: apiRequest.scopes,
      });

      const accessToken = tokenRes.accessToken;
      if (!accessToken) {
        console.error("No access token acquired");
        return;
      }

      dispatch(SSOLogin(accessToken))
        .unwrap()
        .then(() => {
          navigate("/home");
        })
        .catch((err) => console.log("Error:", err));
    } catch (err) {
      console.error("Token acquisition error:", err);
    }
  };

  return null;
};