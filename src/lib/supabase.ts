import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10, // Optimize for real-time performance
    },
  },
});

// Database types
export interface College {
  id: string;
  name: string;
  total_points: number;
  created_at: string;
  updated_at: string;
}

export interface Participation {
  id: string;
  college_id: string;
  event_id: string;
  event_name: string;
  position: 'participant' | '1st' | '2nd' | '3rd';
  points: number;
  timestamp: string;
}

export interface DatabaseEvent {
  id: string;
  themed_event_name: string;
  event: string;
  event_type: 'Flagship' | 'Large' | 'Small';
  category: string;
  day: number;
  participation_points: number;
  winner_points: {
    '1st': number;
    '2nd': number;
    '3rd': number;
  };
  created_at: string;
}
