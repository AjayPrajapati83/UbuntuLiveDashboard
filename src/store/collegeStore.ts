import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { College, EventParticipation } from '@/types';

interface CollegeState {
  colleges: College[];
  addCollege: (name: string) => void;
  removeCollege: (id: string) => void;
  awardPoints: (collegeId: string, eventId: string, eventName: string, position: 'participant' | '1st' | '2nd' | '3rd', points: number) => void;
  removePoints: (collegeId: string, eventId: string) => void;
  getCollegeById: (id: string) => College | undefined;
  getLeaderboard: () => College[];
}

// Mock initial colleges
const initialColleges: College[] = [
  {
    id: 'college1',
    name: 'Government Engineering College',
    totalPoints: 0,
    events: []
  },
  {
    id: 'college2', 
    name: 'Parul University',
    totalPoints: 0,
    events: []
  },
  {
    id: 'college3',
    name: 'Nirma University',
    totalPoints: 0,
    events: []
  },
  {
    id: 'college4',
    name: 'Gujarat Technological University',
    totalPoints: 0,
    events: []
  },
  {
    id: 'college5',
    name: 'Ahmedabad University',
    totalPoints: 0,
    events: []
  }
];

export const useCollegeStore = create<CollegeState>()(
  persist(
    (set, get) => ({
      colleges: initialColleges,
      
      addCollege: (name: string) => {
        const newCollege: College = {
          id: `college_${Date.now()}`,
          name,
          totalPoints: 0,
          events: []
        };
        set(state => ({
          colleges: [...state.colleges, newCollege]
        }));
      },
      
      removeCollege: (id: string) => {
        set(state => ({
          colleges: state.colleges.filter(college => college.id !== id)
        }));
      },
      
      awardPoints: (collegeId: string, eventId: string, eventName: string, position: 'participant' | '1st' | '2nd' | '3rd', points: number) => {
        set(state => ({
          colleges: state.colleges.map(college => {
            if (college.id === collegeId) {
              // Remove existing participation for this event if any
              const filteredEvents = college.events.filter(event => event.eventId !== eventId);
              
              const newParticipation: EventParticipation = {
                eventId,
                eventName,
                position,
                points,
                timestamp: new Date().toISOString()
              };
              
              const updatedEvents = [...filteredEvents, newParticipation];
              const newTotalPoints = updatedEvents.reduce((sum, event) => sum + event.points, 0);
              
              return {
                ...college,
                events: updatedEvents,
                totalPoints: newTotalPoints
              };
            }
            return college;
          })
        }));
      },
      
      removePoints: (collegeId: string, eventId: string) => {
        set(state => ({
          colleges: state.colleges.map(college => {
            if (college.id === collegeId) {
              const updatedEvents = college.events.filter(event => event.eventId !== eventId);
              const newTotalPoints = updatedEvents.reduce((sum, event) => sum + event.points, 0);
              
              return {
                ...college,
                events: updatedEvents,
                totalPoints: newTotalPoints
              };
            }
            return college;
          })
        }));
      },
      
      getCollegeById: (id: string) => {
        return get().colleges.find(college => college.id === id);
      },
      
      getLeaderboard: () => {
        return get().colleges
          .slice()
          .sort((a, b) => b.totalPoints - a.totalPoints);
      }
    }),
    {
      name: 'college-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
