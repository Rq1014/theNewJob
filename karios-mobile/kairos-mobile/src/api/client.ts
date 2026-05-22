import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config';
import { ensureFreshAccessToken } from './sessionRefresh';
import { getAccessToken, useAuthStore } from '../store/authStore';
import type { ApiResponse } from './types';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async config => {
  if (!config.url?.includes('/auth/refresh')) {
    try {
      await ensureFreshAccessToken();
    } catch {
      /* 续期失败留待响应拦截器处理 */
    }
  }
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => {
    const body = response.data as ApiResponse<unknown>;
    if (body && typeof body.code === 'number' && body.code !== 0) {
      return Promise.reject(new Error(body.message || '请求失败'));
    }
    return response;
  },
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const { refreshToken } = useAuthStore.getState();

    if (
      status === 401
      && refreshToken
      && original
      && !original._retry
      && !original.url?.includes('/auth/refresh')
      && !original.url?.includes('/auth/otp')
    ) {
      original._retry = true;
      try {
        await ensureFreshAccessToken(true);
        original.headers.Authorization = `Bearer ${getAccessToken()}`;
        return apiClient.request(original);
      } catch {
        await useAuthStore.getState().logout();
      }
    } else if (status === 401) {
      await useAuthStore.getState().logout();
    }

    const message =
      error.response?.data?.message || error.message || '网络错误';
    return Promise.reject(new Error(message));
  },
);

export function unwrap<T>(response: { data: ApiResponse<T> }): T {
  return response.data.data;
}
