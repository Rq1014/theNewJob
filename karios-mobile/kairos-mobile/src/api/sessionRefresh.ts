import { AppState, type AppStateStatus } from 'react-native';
import { apiClient, unwrap } from './client';
import { getAccessToken, useAuthStore } from '../store/authStore';

/** Access 过期前提前刷新（毫秒） */
const REFRESH_BUFFER_MS = 5 * 60 * 1000;

let refreshPromise: Promise<void> | null = null;

interface RefreshResult {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresInDays: number;
}

/** 在 Access 将过期或缺失时，用 Refresh Token 静默续期（含滑动续期）。 */
export async function ensureFreshAccessToken(force = false): Promise<void> {
  const { refreshToken, accessExpiresAt } = useAuthStore.getState();
  if (!refreshToken) {
    return;
  }
  const accessToken = getAccessToken();
  if (
    !force
    && accessToken
    && accessExpiresAt
    && Date.now() < accessExpiresAt - REFRESH_BUFFER_MS
  ) {
    return;
  }
  if (refreshPromise) {
    return refreshPromise;
  }
  refreshPromise = (async () => {
    try {
      const res = await apiClient.post('/auth/refresh', { refreshToken });
      const data = unwrap<RefreshResult>(res);
      await useAuthStore.getState().updateTokens(
        data.accessToken,
        data.refreshToken,
        data.expiresIn,
      );
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

/** App 回到前台时续期；冷启动由 RootNavigator 在 hydrate 后调用。 */
export function bindSessionRefreshOnAppActive(): () => void {
  const handler = (state: AppStateStatus) => {
    if (state === 'active') {
      ensureFreshAccessToken().catch(() => {
        /* 401 等由 apiClient 统一处理 */
      });
    }
  };
  const sub = AppState.addEventListener('change', handler);
  return () => sub.remove();
}
