import type { Status } from "../slice/EmployeeSlice";

export interface EmployeeList {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture?: string; 
    gender: string;
    employee_id: string;
    designation: string;
    department: string;
    email: string;
    mobile:string;
    office_location: string;
    dob: string;
    doj: string;
    martial_status: string;
    reporting_manager: string;
    delivery_head: string;
    emergency_contact_name: string;
    emergency_contact: string;
    emergency_contact_relation: string;
    blood_group: string;
    total_experence: string;
    current_company_experence: string;
    aadhar: string;
    pan: string;  
    passport: string;
    current_address: string;
    permanent_address: string;
    resume: string;

  }

  export interface EmployeeState {
    items: EmployeeList[];
    status: Status;
    error: string | null;
  }