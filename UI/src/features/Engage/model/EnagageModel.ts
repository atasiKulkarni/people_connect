import type { Status } from "../slice/EngageSlice";

// types.ts (or at the top of your controller)
export interface EngagePost {
  id: number;
  event_type: string;
  title: string;
  description: string;
  employee_name: string;
  image_url: string | null;
  created_by: string;
  created_at: Date;
  is_liked: boolean; 
  is_saved: boolean; 
  time_ago_display?: string;
}


  export interface EngageState {
    items: EngagePost[];
    status: Status;
    error: string | null;
  }

  export interface LikedState {
    post_id: number;
    liked: boolean;
  }

  export interface SaveState {
    post_id: number;
    saved: boolean;
  }