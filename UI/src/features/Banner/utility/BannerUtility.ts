import { API_ENDPOINTS } from "../../../utility/core/apiEndpoint";

export enum BannerUrlType {
  banner,
}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getBannerScreenRequestURL = (urlType: BannerUrlType) => {
  console.log("BASE_URL-->", baseUrl);
  switch (urlType) {
    case BannerUrlType.banner:
      return `${baseUrl}${API_ENDPOINTS.BANNER}`;

    default:
      return '';
  }
};
