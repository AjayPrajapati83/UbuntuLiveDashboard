import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Validate environment variables in production
if (process.env.NODE_ENV === 'production') {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required in production. Please set it in your Vercel environment variables.');
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'placeholder-key') {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required in production. Please set it in your Vercel environment variables.');
  }
}

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
