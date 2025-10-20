export interface Event {
  id: string;
  eventType: 'Flagship' | 'Large' | 'Small';
  day: 1 | 2;
  category: string;
  event: string;
  themedEventName: string;
  solo: number | 'NA';
  group: number | 'NA';
  participationPoints: number;
  winnerPoints: {
    first: number;
    second: number;
    third: number;
  };
}

export interface College {
  id: string;
  name: string;
  totalPoints: number;
  events: EventParticipation[];
}

export interface EventParticipation {
  eventId: string;
  eventName: string;
  position: 'participant' | '1st' | '2nd' | '3rd';
  points: number;
  timestamp: string;
}

export interface User {
  email: string;
  role: 'user' | 'admin';
  collegeId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}
