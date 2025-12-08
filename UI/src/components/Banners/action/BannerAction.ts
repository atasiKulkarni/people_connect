// src/features/banners/bannerActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Banner } from '../model/BannerModel';

const API_URL = 'http://localhost:3000/api/banner';

// Define and export the async thunk action
export const fetchBanners = createAsyncThunk<Banner[]>(
  'banners/fetchBanners',
  async () => {
    const response = await axios.get<Banner[]>(API_URL);
    return response.data;
  }
);
