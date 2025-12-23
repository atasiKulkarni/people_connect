import {defaultHeaders, formDataDefaultHeaders, type ICommonActionResponse, type IServiceProps } from "./actionResponseModel";
// import { TokenService } from "./tokenService";
import { API_ENDPOINTS } from "./apiEndpoint";
import { apiResponse, apiResponseStatusCode, STATUS } from "./apiResponse";
// import { MMKV_STORAGE_KEY, StorageService } from "../localstorage/StorageService";

// import { MMKV_STORAGE_KEY, StorageService } from "../localstorage/StorageService";


// Function to validate the JSON response against the interface
const isValidResponse = (json:ICommonActionResponse) => {
return ( typeof json === 'object' && json !== null &&'payload' in json &&'status' in json &&'errorBean' in json);
};

//this is a common function that will get a response from the server.//retry: boolean = true
const fetchResponse = async (method: string, serviceProps: IServiceProps, formData?:boolean, retry: boolean = true) => {
  // const storage = StorageService.getInstance();// loading state is active, and the loader animation will show above the UI components.
  // const panNumber:string = storage.get(MMKV_STORAGE_KEY.pan) ?? ''; 
  // storage.setLoadingState(serviceProps.showLoader ?? true);
  // Add only the Authorization key if it exists(federatedToken)
  const additionalHeaders = serviceProps.federatedToken ? {...serviceProps.additionalHeaders, Authorization:`token ${storage.get(MMKV_STORAGE_KEY.mfsdkFederatedToken)??''}`} : serviceProps.additionalHeaders;
  const headers = {
    ...(formData ? formDataDefaultHeaders() : defaultHeaders()),
    ...additionalHeaders,
  };

  //handle token based on endpoint
   if(!serviceProps.url.includes(API_ENDPOINTS.SYSTEM_TOKEN)){
    // const isAuthEndpoint = serviceProps.systemToken ?? false;
    // const token = `${isAuthEndpoint ? await TokenService.getSystemToken() : await TokenService.getAuthToken()}`;
    // headers.authtoken = `${token}`;
   }
  
  try {
    console.log("API-URL========>",serviceProps.url)
     // Ensure body is correctly typed based on whether it’s FormData or JSON
    const paramsBody: string | FormData | undefined = method === METHOD.POST || method === METHOD.PUT ? formData ? (serviceProps.params as FormData) : JSON.stringify(serviceProps.params): undefined;
    const response = await fetch(serviceProps.url, {
      method: method,
      headers: headers,
      body: paramsBody,
    });
    console.log("API-BODY-PARAMS======>",paramsBody)
    if (!response.ok) {
      const apiFailedResponse = await response?.json();// Try to read error details from the response body
      console.log("API-FAILED:ERROR========>", apiFailedResponse); // Log error details
    }
    storage.setLoadingState(false)
    const statusCodeResponse = apiResponseStatusCode(response.status);
    if(statusCodeResponse === STATUS.SUCCESS){
      const json = await response.json();
      console.log("FinalJson======>",json)
      if (isValidResponse(json)) {
         return apiResponse(json);
       } else {
         return json;
     }
    }else if(statusCodeResponse?.status === STATUS.TOKEN_FAILURE){
     //Handles retrieval and refreshing of both userAuth tokens and mfsdkFederatedToken tokens.
     //Token failure - attempt token refresh and retry
     if (retry && panNumber) {
      await TokenService.refreshAuthToken(); //Refresh the token,Token expired, attempting to refresh token...
      return await fetchResponse(method, serviceProps, formData, false); //Retry the API call
     } else {
       storage.setRefreshTokenFailedState(true);//Token refresh failed or retry not allowed.
      return { payload: null, status: STATUS.TOKEN_FAILURE, errorBean: [{ errorMessage: "Token refresh failed and retry not allowed" }] };
     }
    }else{
      return statusCodeResponse;//based on status code api response
    }
  } catch (error) {
    console.log("error======>",error)
    // storage.setLoadingState(false)
    const errorMessage = (error as Error).message;//network failed
    if (errorMessage === 'Network request failed') {
      return {payload:null,status:STATUS.FAILURE,errorBean:[{errorMessage: "DEFAULT_ERROR"}]};
    }else{
      return null;
    }
  }
};

//here we can call based on method
const API = {
  get: (serviceProps: IServiceProps) => fetchResponse(METHOD.GET, serviceProps),
  post: (serviceProps: IServiceProps) => fetchResponse(METHOD.POST, serviceProps),
  put: (serviceProps: IServiceProps) => fetchResponse(METHOD.PUT, serviceProps),
  postFormData: (serviceProps: IServiceProps) => fetchResponse(METHOD.POST, serviceProps,true),
  putFormData: (serviceProps: IServiceProps) => fetchResponse(METHOD.PUT, serviceProps,true),
  delete: (serviceProps: IServiceProps) => fetchResponse(METHOD.DELETE, serviceProps),
};

//here all method for request
export enum METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export default API;
