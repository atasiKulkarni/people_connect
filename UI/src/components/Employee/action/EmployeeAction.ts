
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { EmployeeList } from '../model/EmployeeModel';

const API_URL = 'http://localhost:3000/api/employees';

// Define and export the async thunk action
export const fetchEmployee = createAsyncThunk<EmployeeList[]>(
  'employee/fetchEmployee',
  async () => {
    console.log("API_URL",API_URL)
    const response = await axios.get<EmployeeList[]>(API_URL);
    console.log("response data-->",response.data);
    return response.data;
  }
);
