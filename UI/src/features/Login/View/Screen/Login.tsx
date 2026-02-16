import { useNavigate } from "react-router-dom";
import { Image } from "../../../../utility/Image";
import { useMsal } from "@azure/msal-react";
import { loginRequest, apiRequest } from "../../../../authConfig";
import {
  InteractionRequiredAuthError,
  type AuthenticationResult,
} from "@azure/msal-browser";
import { SSOLogin } from "../../action/LoginAction";
import type { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
export const Login = () => {
  const { instance, accounts } = useMsal();
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const GoToDashboard = async () => {
    try {
      // 1) Sign in
      const loginRes: AuthenticationResult = await instance.loginPopup(
        loginRequest
      );
      console.log("loginRes->", loginRes);
      // The account MSAL should use for token acquisition
      const account = loginRes.account || accounts[0];
      if (!account) {
        console.error("No account after login");
        return;
      }
      // 2) Acquire ACCESS TOKEN for your API
      let tokenRes: AuthenticationResult;
      try {
        console.log("apiRequest-->", apiRequest);
        tokenRes = await instance.acquireTokenSilent({
          account,
          scopes: apiRequest.scopes,
        });
        console.log("tokenRes->", tokenRes);
      } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
          tokenRes = await instance.acquireTokenPopup({
            account,
            scopes: apiRequest.scopes,
          });
        } else {
          throw err;
        }
      }
      const accessToken = tokenRes.accessToken;
      if (!accessToken) {
        console.error("No access token acquired");
        return;
      }
      console.log("accessToken-->", accessToken);

      dispatch(SSOLogin(accessToken))
        .unwrap()
        .then((response) => {
          console.log("LOGIN_RESPONSE-->:", response);
          navigation("/home");
        })
        .catch((err) => console.log("Error:", err));
    } catch (e) {
      console.error("Login Error:", e);
      alert("Login failed. See console for details.");
    }
  };
  return (
    <div className="grid grid-cols-8 gap-4 w-full h-screen bg-white">
      <div className="col-span-5 w-full h-full flex flex-col justify-center items-center pt-5">
        <p className="text-[#FEBE10] text-[Rubik] text-base font-semibold absolute top-6 left-100">
          PEOPLE
        </p>
        <img src={Image.connect} className="w-40 object-contain" />
        <img src={Image.working} className="w-full h-150 object-contain" />
      </div>

      <div className="col-span-3 text-black text-xl w-full h-full px-20 flex flex-col justify-center items-center">
        <img src={Image.peopleConnect} className="w-50  object-contain" />
        <p className="text-black font-[Rubik] text-2xl font-normal mt-5">
          Single sign on
        </p>
        <p className="text-black font-[Rubik] text-sm font-normal mt-2">
          Sign in with your identity provider
        </p>

        <div
          className="text-black font-[Rubik] text-sm font-normal border border-gray-100 w-full p-3 rounded mt-5 shadow-sm cursor-pointer"
          onClick={GoToDashboard}
        >
          SSO Login with Microsoft
        </div>
      </div>
    </div>
  );
};
