import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile, UserSummary } from '../api/types';

const ACCESS_KEY = 'kairos_access_token';
const REFRESH_KEY = 'kairos_refresh_token';
const USER_KEY = 'kairos_user';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserSummary | null;
  isHydrated: boolean;
  setSession: (access: string, refresh: string, user: UserSummary) => Promise<void>;
  setUser: (user: UserSummary | UserProfile) => void;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isHydrated: false,

  setSession: async (access, refresh, user) => {
    await AsyncStorage.multiSet([
      [ACCESS_KEY, access],
      [REFRESH_KEY, refresh],
      [USER_KEY, JSON.stringify(user)],
    ]);
    set({ accessToken: access, refreshToken: refresh, user });
  },

  setUser: user => {
    set({ user });
    AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  hydrate: async () => {
    const [[, access], [, refresh], [, userJson]] = await AsyncStorage.multiGet([
      ACCESS_KEY,
      REFRESH_KEY,
      USER_KEY,
    ]);
    set({
      accessToken: access,
      refreshToken: refresh,
      user: userJson ? JSON.parse(userJson) : null,
      isHydrated: true,
    });
  },

  logout: async () => {
    await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY, USER_KEY]);
    set({ accessToken: null, refreshToken: null, user: null });
  },
}));

export const getAccessToken = () => useAuthStore.getState().accessToken;
