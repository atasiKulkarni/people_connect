import type { Status } from "../slice/LoginSlice";

export interface LoginList {
    id: number;
    name: string;
    email:string;
  }

  export interface LoginState {
    items: LoginList[];
    token: string |  null;
    status: Status;
    error: string | null;
  }