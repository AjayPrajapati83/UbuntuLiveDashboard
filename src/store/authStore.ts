import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, User } from '@/types';

// Mock user credentials
const mockUsers = [
  { email: 'CollegeCl@ubuntu.com', password: 'Ubuntuparti@123', role: 'user' as const, collegeId: 'college1' },
  { email: 'ajayadmin90@ubuntu.com', password: 'Ajay.padmin@123', role: 'admin' as const }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: (email: string, password: string) => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ 
            user: userWithoutPassword as User, 
            isAuthenticated: true 
          });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
