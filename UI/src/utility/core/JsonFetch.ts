import { apiResponseStatusCode } from "./apiResponse";
//this is common function for fetching JSON.
export const JsonFetch = async (url: string) => {
    try {
        const response = await fetch(
          url,
        );
        const statusCodeResponse = apiResponseStatusCode(response.status);
        if(statusCodeResponse === 'SUCCESS'){
          const json = await response.json();
          if(json){
            return json;
          }else{
            return null;
          }
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
  
}