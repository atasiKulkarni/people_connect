
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { EngagePost } from '../model/EnagageModel';
import { JsonFetch } from '../../../utility/core/JsonFetch';
import { EngageUrlType, getEngageScreenRequestURL } from '../utility/EngageUtility';
import axios from 'axios';

export const getPost = createAsyncThunk<EngagePost[]>(
  'engage/getPost',
  async () => {
    try {
      const response = await JsonFetch(getEngageScreenRequestURL(EngageUrlType.engage));
      console.log("post_request_response-->",response)
      return response;
    } catch (error) {
      console.error("Error fetching engage list:", error);
      console.log("error", error);
    }
  }
);


export const createPost = createAsyncThunk(
  "engage/createPost",
  async (formData: FormData) => {
    const response = await axios.post(getEngageScreenRequestURL(EngageUrlType.engage), formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  }
);

export const toggleLike = createAsyncThunk(
  "engage/toggleLike",
  async (postId: number, {rejectWithValue}) => {
    try {
      const response = await axios.post(getEngageScreenRequestURL(EngageUrlType.postLike), {
        post_id: postId,
        user_name: "Atasi" // Or get this from your auth state
      });
      console.log("toggle_response-->",response)
      return response.data; // Should return the updated post or the like status
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to toggle like");
      }

      console.error("Error fetching engage list:", error);
      console.log("error", error);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const getMyActivity = createAsyncThunk<EngagePost[]>(
  'engage/getMyActivity',
  async () => {
    try {
      console.log("getMyActivity_url-->",getEngageScreenRequestURL(EngageUrlType.getMyActivity))
      const response = await JsonFetch(getEngageScreenRequestURL(EngageUrlType.getMyActivity));
      console.log("myactivity_request_response-->",response)
      return response;
    } catch (error) {
      console.error("Error fetching engage list:", error);
      console.log("error", error);
    }
  }
);


export const toggleSave = createAsyncThunk(
  "engage/toggleSave",
  async (postId: number, {rejectWithValue}) => {
    try {
    
      const response = await axios.post(getEngageScreenRequestURL(EngageUrlType.toggleSave), {
        post_id: postId,
        user_name: "Atasi" 
      });
      console.log("toggle_save_response-->",response)
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to toggle save");
      }

      console.error("Error fetching engage list:", error);
      console.log("error", error);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const getSavedPost = createAsyncThunk<EngagePost[]>(
  'engage/getSavedPost',
  async () => {
    try {

      const response = await JsonFetch(getEngageScreenRequestURL(EngageUrlType.getSavedPost));
      console.log("mySavedPost_request_response-->",response)
      return response;
    } catch (error) {
      console.error("Error fetching engage list:", error);
      console.log("error", error);
    }
  }
);

