import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/index';
import { authService } from '../services/authService';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  loadUser: () => Promise<void>;
  logout: () => void;
}

// Prevent multiple simultaneous loadUser calls
let loadUserPromise: Promise<void> | null = null;

/** 
 * Global authentication store with persistence
 * Automatically syncs user state with localStorage
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      loadUser: async () => {
        // Return existing promise if already loading
        if (loadUserPromise) return loadUserPromise;
        
        if (!authService.isAuthenticated()) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        loadUserPromise = (async () => {
          set({ isLoading: true });
          try {
            const user = await authService.getCurrentUser();
            set({ user, isAuthenticated: true, isLoading: false });
          } catch (error) {
            authService.logout();
            set({ user: null, isAuthenticated: false, isLoading: false });
          } finally {
            loadUserPromise = null;
          }
        })();
        
        return loadUserPromise;
      },

      logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
