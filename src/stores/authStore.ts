import { create } from 'zustand';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => {
    set({ user, loading: false, initialized: true });
  });

  return {
    user: null,
    loading: true,
    error: null,
    initialized: false,

    signIn: async (email, password) => {
      set({ loading: true, error: null });
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        const message =
          err instanceof Error ? err.message.replace('Firebase: ', '') : 'Login failed';
        set({ error: message, loading: false });
        throw err;
      }
    },

    signOut: async () => {
      await firebaseSignOut(auth);
      set({ user: null });
    },

    clearError: () => set({ error: null }),
  };
});
