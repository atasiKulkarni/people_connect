import { API_ENDPOINTS } from "../../../utility/core/apiEndpoint";

export enum EventUrlType {
  event,
}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getEventScreenRequestURL = (urlType: EventUrlType) => {
  switch (urlType) {
    case EventUrlType.event:
      return `${baseUrl}${API_ENDPOINTS.EVENT}`;

      default :
    return '';
  }
};