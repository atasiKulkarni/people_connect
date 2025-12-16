import { createAsyncThunk } from '@reduxjs/toolkit';
import type { BannerDetail } from '../model/BannerModel';
import { BannerUrlType, getBannerScreenRequestURL } from '../utility/BannerUtility';
import { JsonFetch } from '../../../utility/core/JsonFetch';

export const fetchBanners = createAsyncThunk<BannerDetail[]>(
  'banners/fetchBanners',
  async () => {
    try {
      const response = await JsonFetch(getBannerScreenRequestURL(BannerUrlType.banner));
      console.log("banner_response-->",response)
      return response;
    } catch (error) {
      console.error("Error fetching banners:", error);
      console.log("error", error);
    }
  }
);
