import { create } from 'zustand';
import { supabase, type College, type Participation, type DatabaseEvent } from '@/lib/supabase';
import { toast } from 'sonner';

interface SupabaseCollegeState {
  colleges: College[];
  events: DatabaseEvent[];
  participations: Participation[];
  isLoading: boolean;
  isConnected: boolean;
  
  // College Management
  fetchColleges: () => Promise<void>;
  addCollege: (name: string) => Promise<boolean>;
  removeCollege: (id: string) => Promise<boolean>;
  
  // Event Management
  fetchEvents: () => Promise<void>;
  
  // Points Management
  awardPoints: (collegeId: string, eventId: string, eventName: string, position: 'participant' | '1st' | '2nd' | '3rd', points: number) => Promise<boolean>;
  deductPoints: (collegeId: string, eventId: string) => Promise<boolean>;
  
  // Real-time subscriptions
  subscribeToChanges: () => void;
  unsubscribeFromChanges: () => void;
  
  // Utilities
  getCollegeById: (id: string) => College | undefined;
  getLeaderboard: () => College[];
  
  // Debug function
  testConnection: () => Promise<void>;
}

export const useSupabaseCollegeStore = create<SupabaseCollegeState>((set, get) => ({
  colleges: [],
  events: [],
  participations: [],
  isLoading: false,
  isConnected: false,

  // Fetch all colleges from Supabase
  fetchColleges: async () => {
    set({ isLoading: true });
    try {
      const { data: colleges, error } = await supabase
        .from('colleges')
        .select('*')
        .order('total_points', { ascending: false });

      if (error) throw error;

      // Also fetch participations for history tracking
      const { data: participations, error: participationsError } = await supabase
        .from('participations')
        .select('*')
        .order('timestamp', { ascending: false });

      if (participationsError) {
        console.error('Error fetching participations:', participationsError);
      }

      set({ 
        colleges: colleges || [], 
        participations: participations || [],
        isLoading: false,
        isConnected: true 
      });
    } catch (error) {
      console.error('Error fetching colleges:', error);
      toast.error('Failed to load colleges');
      set({ isLoading: false, isConnected: false });
    }
  },

  // Add new college
  addCollege: async (name: string) => {
    if (!name.trim()) {
      toast.error('College name cannot be empty');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('colleges')
        .insert([{ name: name.trim() }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('College with this name already exists');
        } else {
          throw error;
        }
        return false;
      }

      // Add to local state immediately (optimistic update)
      set(state => ({
        colleges: [...state.colleges, data].sort((a, b) => b.total_points - a.total_points)
      }));

      toast.success(`${name} added successfully!`);
      return true;
    } catch (error) {
      console.error('Error adding college:', error);
      toast.error('Failed to add college');
      return false;
    }
  },

  // Fetch all events from Supabase
  fetchEvents: async () => {
    try {
      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('day', { ascending: true });

      if (error) throw error;

      set({ events: events || [] });
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    }
  },

  // Remove college (with all participations - CASCADE DELETE)
  removeCollege: async (id: string) => {
    const college = get().getCollegeById(id);
    if (!college) {
      toast.error('College not found');
      return false;
    }

    // Get participation count for confirmation message
    const { data: participations } = await supabase
      .from('participations')
      .select('*')
      .eq('college_id', id);

    const participationCount = participations?.length || 0;

    try {
      // Delete college (this will automatically delete all participations due to CASCADE)
      const { error } = await supabase
        .from('colleges')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove from local state immediately (optimistic update)
      set(state => ({
        colleges: state.colleges.filter(c => c.id !== id)
      }));

      if (participationCount > 0) {
        toast.success(`${college.name} removed successfully!`, {
          description: `Deleted college with ${participationCount} event participation(s). All points removed from leaderboard.`
        });
      } else {
        toast.success(`${college.name} removed successfully!`);
      }
      
      return true;
    } catch (error) {
      console.error('Error removing college:', error);
      toast.error('Failed to remove college');
      return false;
    }
  },

  // Award points to college
  awardPoints: async (collegeId: string, eventId: string, eventName: string, position: 'participant' | '1st' | '2nd' | '3rd', points: number) => {
    const college = get().getCollegeById(collegeId);
    if (!college) {
      toast.error('College not found');
      return false;
    }

    try {
      const { error } = await supabase
        .from('participations')
        .upsert({
          college_id: collegeId,
          event_id: eventId,
          event_name: eventName,
          position,
          points
        }, {
          onConflict: 'college_id,event_id'
        });

      if (error) throw error;

      toast.success(`${points} points awarded to ${college.name}!`, {
        description: `${eventName} - ${position === 'participant' ? 'Participation' : position + ' place'}`
      });
      return true;
    } catch (error) {
      console.error('Error awarding points:', error);
      toast.error('Failed to award points');
      return false;
    }
  },

  // Deduct points (remove participation record)
  deductPoints: async (collegeId: string, eventId: string) => {
    const college = get().getCollegeById(collegeId);
    if (!college) {
      toast.error('College not found');
      return false;
    }

    try {
      const { error } = await supabase
        .from('participations')
        .delete()
        .eq('college_id', collegeId)
        .eq('event_id', eventId);

      if (error) throw error;

      toast.success(`Points deducted from ${college.name}!`);
      return true;
    } catch (error) {
      console.error('Error deducting points:', error);
      toast.error('Failed to deduct points');
      return false;
    }
  },

  // Subscribe to real-time changes
  subscribeToChanges: () => {
    // Subscribe to colleges table changes
    supabase
      .channel('colleges-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'colleges' },
        (payload) => {
          console.log('College change detected:', payload);
          
          if (payload.eventType === 'INSERT') {
            set(state => ({
              colleges: [...state.colleges, payload.new as College]
                .sort((a, b) => b.total_points - a.total_points)
            }));
          } else if (payload.eventType === 'UPDATE') {
            set(state => ({
              colleges: state.colleges
                .map(c => c.id === payload.new.id ? payload.new as College : c)
                .sort((a, b) => b.total_points - a.total_points)
            }));
          } else if (payload.eventType === 'DELETE') {
            set(state => ({
              colleges: state.colleges.filter(c => c.id !== payload.old.id)
            }));
          }
        }
      )
      .subscribe((status) => {
        console.log('Colleges subscription status:', status);
        set({ isConnected: status === 'SUBSCRIBED' });
      });

    // Subscribe to participations table changes (for real-time point updates)
    supabase
      .channel('participations-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'participations' },
        (payload) => {
          console.log('Participation change detected:', payload);
          
          if (payload.eventType === 'INSERT') {
            // Add new participation to local state
            set(state => ({
              participations: [payload.new as Participation, ...state.participations]
            }));
          } else if (payload.eventType === 'UPDATE') {
            // Update existing participation
            set(state => ({
              participations: state.participations.map(p => 
                p.id === payload.new.id ? payload.new as Participation : p
              )
            }));
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted participation
            set(state => ({
              participations: state.participations.filter(p => p.id !== payload.old.id)
            }));
          }
          
          // The college total_points will be updated automatically by the database trigger
          // We just need to refresh the colleges data
          get().fetchColleges();
        }
      )
      .subscribe();
  },

  // Unsubscribe from real-time changes
  unsubscribeFromChanges: () => {
    supabase.removeAllChannels();
    set({ isConnected: false });
  },

  // Get college by ID
  getCollegeById: (id: string) => {
    return get().colleges.find(college => college.id === id);
  },

  // Get sorted leaderboard
  getLeaderboard: () => {
    return get().colleges
      .slice()
      .sort((a, b) => b.total_points - a.total_points);
  },

  // Test Supabase connection
  testConnection: async () => {
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase.from('colleges').select('count');
      if (error) {
        console.error('Supabase connection error:', error);
        toast.error('Database connection failed: ' + error.message);
      } else {
        console.log('Supabase connection successful:', data);
        toast.success('Database connected successfully!');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      toast.error('Failed to connect to database');
    }
  }
}));
