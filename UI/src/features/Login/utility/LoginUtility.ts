import { API_ENDPOINTS } from "../../../utility/core/apiEndpoint";

export enum LoginUrlType {
  login,

}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getLoginScreenRequestURL = (urlType: LoginUrlType) => {
  switch (urlType) {
    case LoginUrlType.login:
      return `${baseUrl}${API_ENDPOINTS.LOGIN}`;

    default:
      return '';
  }
};
