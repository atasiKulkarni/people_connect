import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { EventList } from '../model/EventModel';

const API_URL = 'http://localhost:3000/api/event';

export const fetchEvent = createAsyncThunk<EventList[]>(
  'event/fetchEvents',
  async () => {
    console.log("API_URL",API_URL)
    const response = await axios.get<EventList[]>(API_URL);
    console.log("response data-->",response.data);
    return response.data;
  }
);