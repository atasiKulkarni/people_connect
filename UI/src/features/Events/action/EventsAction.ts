import { createAsyncThunk } from "@reduxjs/toolkit";
import type { EventList } from "../model/EventModel";
import {
  EventUrlType,
  getEventScreenRequestURL,
} from "../utility/EventUtility";
import { JsonFetch } from "../../../utility/core/JsonFetch";

export const fetchEvent = createAsyncThunk<EventList[]>(
  "event/fetchEvents",
  async () => {
    try {
      const response = await JsonFetch(
        getEventScreenRequestURL(EventUrlType.event)
      );
      return response;
    } catch (error) {
      console.log("error", error);
    }
  }
);
