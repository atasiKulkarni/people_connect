import { API_ENDPOINTS } from "../../../utility/core/apiEndpoint";

export enum BannerUrlType {
  banner,
}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getBannerScreenRequestURL = (urlType: BannerUrlType) => {
 
  switch (urlType) {
    case BannerUrlType.banner:
      console.log("BASE_URL-->", baseUrl);
      return `${baseUrl}${API_ENDPOINTS.BANNER}`;

    default:
      return '';
  }
};
