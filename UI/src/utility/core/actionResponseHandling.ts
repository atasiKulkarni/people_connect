
import { STATUS } from "./apiResponse";

type errorBeanProps = {
    errorCode?:string,
    errorMessage?:string
}

//here, all action responce handling logic. which will be either success or failure.
export function actionResponseHandling(response: {
    errorBean: errorBeanProps | [errorBeanProps] ; status: { toUpperCase: () => STATUS }
}){
   if(response?.status?.toUpperCase() ===  STATUS.SUCCESS){
     return STATUS.SUCCESS
   }else{
    // If input is an object but not an array, return an empty array or handle it as needed
    if (Array.isArray(response?.errorBean)) {
        //here this filter find inside array errormessage object and based on this 0 index set also set default message
        const errorMessage = response?.errorBean?.filter(item => item.errorMessage);
        switch (response?.errorBean[0]?.errorCode) {
            case "AUTH-483":
              return errorMessage[0]?.errorMessage ?? "YOUR_ACCOUNT_HAS_BEEN_LOCKED_PLEASE_TRY_AGAIN_AFTER_24_HOURS";   
  
            default :
              return errorMessage[0]?.errorMessage ?? "DEFAULT_ERROR";
         }

      }else if(response?.errorBean?.errorMessage){

        return response?.errorBean?.errorMessage;
        
      } else{
         return "DEFAULT_ERROR";
      }
   }
}

//here, pythone action responce handling logic. which will be either success or failure.
type actionResponse = {
  code?:string,
  msg?:string,
  results?:object[],
}
export enum pythoneResponseCode {
  Hundred = '100',
  OneHundredOne = '101'
}
export function actionResponseHandlingPythone(response:actionResponse){
 switch (response?.code) {
  case pythoneResponseCode.Hundred:
  return STATUS.SUCCESS;

  case pythoneResponseCode.OneHundredOne:
  return {status:STATUS.FAILURE, msg:response?.msg ?? "DEFAULT_ERROR"}
  
  default:
  return {status:STATUS.FAILURE, msg:response?.msg ?? "DEFAULT_ERROR"};
 }
}
