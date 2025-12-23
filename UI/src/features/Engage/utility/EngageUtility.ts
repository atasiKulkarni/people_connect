import { API_ENDPOINTS } from "../../../utility/core/apiEndpoint";

export enum EngageUrlType {
  engage,
  postLike,
  getMyActivity,
  toggleSave,
  getSavedPost
}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getEngageScreenRequestURL = (urlType: EngageUrlType) => {
  switch (urlType) {
    case EngageUrlType.engage:
      return `${baseUrl}${API_ENDPOINTS.ENGAGE}?user_name=Atasi`;

    case EngageUrlType.postLike:
        return `${baseUrl}${API_ENDPOINTS.POSTLIKE}`;

    case EngageUrlType.getMyActivity:
          return `${baseUrl}${API_ENDPOINTS.GETMYACTIVITY}`;
    
    case EngageUrlType.toggleSave:
            return `${baseUrl}${API_ENDPOINTS.SAVEPOST}`;
    
    case EngageUrlType.getSavedPost:
              return `${baseUrl}${API_ENDPOINTS.GETSAVEDPOST}`;
    default:
      return '';
  }
};
