
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { EmployeeList } from '../model/EmployeeModel';
import { JsonFetch } from '../../../utility/core/JsonFetch';
import { EmployeeUrlType, getEmployeeScreenRequestURL } from '../utility/EmployeeUtility';

export const fetchEmployee = createAsyncThunk<EmployeeList[]>(
  'employee/fetchEmployee',
  async () => {
    try {
      const response = await JsonFetch(getEmployeeScreenRequestURL(EmployeeUrlType.employee));
      console.log("employee_response-->",response)
      return response;
    } catch (error) {
      console.error("Error fetching employee list:", error);
      console.log("error", error);
    }
  }
);