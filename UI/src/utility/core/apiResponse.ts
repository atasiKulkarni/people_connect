import type { ICommonActionResponse } from "./actionResponseModel";

export enum STATUS {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  TOKEN_FAILURE = "TOKEN_FAILURE",
}
export enum HTTPServerStatusCode {
  TwoHundred = 200,
  FiveHundredThree = 503,
  FourHundredFour = 404,
  FourHundredOne = 401,
}
//here, handle api response
export function apiResponse(response: ICommonActionResponse) {
  const { payload, status, errorBean } = response;

  switch (status?.toUpperCase()) {
    case STATUS.SUCCESS:
      return { payload: payload, status: status };

    case STATUS.FAILURE:
      return { errorBean: errorBean };

    default:
      return response;
  }
}

//here, handle api response status code
export function apiResponseStatusCode(statusCode: number) {
  switch (statusCode) {
    case HTTPServerStatusCode.TwoHundred:
      return STATUS.SUCCESS;

    case HTTPServerStatusCode.FiveHundredThree:
      return {
        payload: null,
        status: STATUS.FAILURE,
        errorBean: [{ errorMessage: "Service Temporarily Unavailable" }],
      };

    case HTTPServerStatusCode.FourHundredFour:
      return {
        payload: null,
        status: STATUS.FAILURE,
        errorBean: [{ errorMessage: "User not found" }],
      };

    case HTTPServerStatusCode.FourHundredOne:
      return {
        payload: null,
        status: STATUS.TOKEN_FAILURE,
        errorBean: [
          { errorMessage: "You are unauthenticated to access this service" },
        ],
      };

    default:
      return null;
  }
}

//handle user token enum based on api response.
export enum TOKEN_TYPE {
  AUTH_TOKEN = "authtoken",
  PERPETUAL_TOKEN = "perpetualtoken",
  REFRESH_TOKEN = "refreshtoken",
}
