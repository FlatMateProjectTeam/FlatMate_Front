import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  job?: string;
  bio?: string;
  avatar?: string;
  city?: string;
  phone?: string;
}

interface AppState {
  language: 'en' | 'fr' | 'ar';
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  setLanguage: (language: 'en' | 'fr' | 'ar') => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const API_ENDPOINTS = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
  },
  users: {
    profile: '/api/users/profile',
    updateProfile: '/api/users/profile',
    updatePreferencesFlatmate: '/api/users/preferences/flatmate',
    updatePreferencesHousing: '/api/users/preferences/housing',
  },
  matches: {
    discover: '/api/matches/discover',
    like: '/api/matches/like',
    pass: '/api/matches/pass',
    getMatches: '/api/matches',
  },
  messages: {
    conversations: '/api/messages/conversations',
    send: '/api/messages/send',
    getMessages: '/api/messages',
  },
  ai: {
    match: '/api/ai/match',
    assistant: '/api/ai/assistant',
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      user: null,
      token: null,
      isAuthenticated: false,

      setLanguage: (language) => set({ language }),
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setToken: (token) => set({ token }),
      
      login: (user, token) => 
        set({ user, token, isAuthenticated: true }),
      
      logout: () => 
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'flatmate-storage',
    }
  )
);
