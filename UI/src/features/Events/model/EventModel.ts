// In your model file (e.g., EventModel.ts or types.ts)

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

// Define the shape of a single event item 
export interface EventItem {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string | null;
  dob?: string; 
  doj?: string;
  designation: string;
  department: string;
  event_type: 'birthday' | 'anniversary' | 'leave';
}

// Define the shape of the full API response object
export interface EventList { // Renamed to clarify it's the full single response object
  today: string;
  birthdays: EventItem[];
  anniversaries: EventItem[];
  leaves: EventItem[];
  totalEvents: number;
}

// Update the state interface: it holds *one* response object (or null initially)
export interface EventState {
  items: EventList[] | null; // Changed to a single object or null
  status: Status;
  error: string | null;
}
