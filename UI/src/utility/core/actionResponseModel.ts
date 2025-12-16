
//Add any other properties that might be in the response if needed (common for all api's)
export interface ICommonActionResponse {
    payload: object|null;
    status: string|null;
    errorBean:[object]|null;
  }
export interface IServiceProps {
    url: string;
    params?:object;
    additionalHeaders?:object;
    showLoader?: boolean;
    systemToken?: boolean;
    federatedToken?:boolean;
  }
  
 export type Headers = {
    Accept: string;
    'Content-Type': string;
    authtoken?: string;
  };

 export const defaultHeaders = (): Headers => {
    const headers: Headers = {
       Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return headers;
  };

  export const formDataDefaultHeaders = (): Headers => {
    const headers: Headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };
    return headers;
  };
  export interface CustomerDetails {
    date_of_birth?: string;
    arn?: string;
    customer_id?: string|number;
    token?:string;
    name_as_in_pan?:string;
    pan_number?:string;
    mobilenumber?:string|number;
    alternate_mobilenumber?:string;
    ownerid?:string|number;
    source_customers_id?:string;
    first_name?:string;
    last_name?:string;
  }
  export interface HomepageDetails {
    Arn?:string;
    ARN_name?:string;
    Investor_name?:string;
    Wishlist_count?:string;
    Cart_count?:number;
    Notifications?:number;
  }