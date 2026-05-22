import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile, UserSummary } from '../api/types';

const ACCESS_KEY = 'kairos_access_token';
const REFRESH_KEY = 'kairos_refresh_token';
const USER_KEY = 'kairos_user';
const ACCESS_EXPIRES_KEY = 'kairos_access_expires_at';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserSummary | null;
  /** Access Token 过期时间戳（毫秒） */
  accessExpiresAt: number | null;
  isHydrated: boolean;
  setSession: (
    access: string,
    refresh: string,
    user: UserSummary,
    expiresInSeconds?: number,
  ) => Promise<void>;
  updateTokens: (
    access: string,
    refresh: string,
    expiresInSeconds: number,
  ) => Promise<void>;
  setUser: (user: UserSummary | UserProfile) => void;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
}

function computeExpiresAt(expiresInSeconds?: number): number | null {
  if (!expiresInSeconds || expiresInSeconds <= 0) {
    return null;
  }
  return Date.now() + expiresInSeconds * 1000;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  accessExpiresAt: null,
  isHydrated: false,

  setSession: async (access, refresh, user, expiresInSeconds) => {
    const accessExpiresAt = computeExpiresAt(expiresInSeconds);
    await AsyncStorage.multiSet([
      [ACCESS_KEY, access],
      [REFRESH_KEY, refresh],
      [USER_KEY, JSON.stringify(user)],
      [
        ACCESS_EXPIRES_KEY,
        accessExpiresAt != null ? String(accessExpiresAt) : '',
      ],
    ]);
    set({ accessToken: access, refreshToken: refresh, user, accessExpiresAt });
  },

  updateTokens: async (access, refresh, expiresInSeconds) => {
    const accessExpiresAt = computeExpiresAt(expiresInSeconds);
    await AsyncStorage.multiSet([
      [ACCESS_KEY, access],
      [REFRESH_KEY, refresh],
      [
        ACCESS_EXPIRES_KEY,
        accessExpiresAt != null ? String(accessExpiresAt) : '',
      ],
    ]);
    set({ accessToken: access, refreshToken: refresh, accessExpiresAt });
  },

  setUser: user => {
    set({ user });
    AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  hydrate: async () => {
    const [[, access], [, refresh], [, userJson], [, expiresRaw]] =
      await AsyncStorage.multiGet([
        ACCESS_KEY,
        REFRESH_KEY,
        USER_KEY,
        ACCESS_EXPIRES_KEY,
      ]);
    const accessExpiresAt =
      expiresRaw && expiresRaw.length > 0 ? Number(expiresRaw) : null;
    set({
      accessToken: access,
      refreshToken: refresh,
      user: userJson ? JSON.parse(userJson) : null,
      accessExpiresAt: Number.isFinite(accessExpiresAt) ? accessExpiresAt : null,
      isHydrated: true,
    });
  },

  logout: async () => {
    await AsyncStorage.multiRemove([
      ACCESS_KEY,
      REFRESH_KEY,
      USER_KEY,
      ACCESS_EXPIRES_KEY,
    ]);
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      accessExpiresAt: null,
    });
  },
}));

export const getAccessToken = () => useAuthStore.getState().accessToken;
