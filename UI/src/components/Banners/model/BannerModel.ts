import type { Status } from "../slice/BannerSlice";

export interface Banner {
    id: number;
    title: string;
    description: string;
    imageUrl?: string; // Optional property
    // Add other fields present in your PostgreSQL table
  }

  export interface BannersState {
    items: Banner[];
    status: Status;
    error: string | null;
  }