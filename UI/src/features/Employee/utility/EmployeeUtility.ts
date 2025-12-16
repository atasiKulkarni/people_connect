import { API_ENDPOINTS } from "../../../utility/core/apiEndpoint";

export enum EmployeeUrlType {
  employee,
}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getEmployeeScreenRequestURL = (urlType: EmployeeUrlType) => {
  switch (urlType) {
    case EmployeeUrlType.employee:
      return `${baseUrl}${API_ENDPOINTS.EMPLOYEE}`;

    default:
      return '';
  }
};
